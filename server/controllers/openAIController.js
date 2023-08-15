const { Configuration, OpenAIApi } = require("openai");
const { Quiz } = require('../models');
const { Question } = require('../models');

async function generate(req, res) {

  // Form Data
  const { prompt, questions, minutes, difficulty } = req.body;
  const userId = req.user.id; 

  // OpenAI Configuration
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Generate quiz
  openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: 
      `
      I will be taking your response and formatting it inside user-friendly quiz taking environment on my website. 
      Please respond in JSON format. 
      For each question, specify whether the question is 0 or 1 ---> multiple choice or true/false.
      There could only be 2 question types, 0 or 1. NOTHING ELSE!!!!!
      Questions can only be multiple choice or true/false, do not include any other types!
      Do not ask open ended questions or fill-in-the-blank!
      If a question is multiple choice, it is always of type 0.
      If a question is True/False, it is always of type 1.
      There can only be 1 answer.
      Each question should be an object with keys: type, question, choices, answer. 
      For the multiple choice, do not include the corresponding letter, only include the choice. 
      List 4 choices for multiple choice questions. 
      Each question should have a limit of 120 characters.
      Questions must only appear once, they cannot be repeated.
      Give me a good mix of all question types. Strictly adhere to this example format in your response:

      {
        "topic": "veggies",
        "difficulty": "easy",
        "questions": [
          {
            "type": 1,
            "question": "Carrots are a type of vegetable.",
            "correctAnswer": "1"
          },
          {
            "type": 0,
            "question": "Which of the following is a leafy green vegetable?",
            "choices": ["Broccoli", "Spinach", "Cucumber", "Radish"],
            "correctAnswer": "1"
          }
        ]
      }

      Below is some info about the quiz I want you to generate right now:
      
      Please generate a quiz on this topic: ${prompt}, ${questions} questions, difficulty: ${difficulty}/5
      ` 
    }],
  })
  .then(response => {
    const completion = response.data.choices[0].message.content;
    console.log(completion);

    // Parse the JSON response to access questions
    const quizQuestions = JSON.parse(completion).questions;

    if (!Array.isArray(quizQuestions)) {
      console.error('Questions are not in expected format:', quizQuestions);
      res.status(500).json({ error: 'Received unexpected format for questions.' });
      return;
    }

    Quiz.create({
      userId: userId,
      category: prompt,
      quizLength: questions, 
      difficulty: difficulty
    }).then(quiz => {
      console.log("Created quiz with ID: " + quiz.id);

      // Iterate through questions and create rows in the Questions table
      const questionPromises = quizQuestions.map((question) => {
        return Question.create({
          quizId: quiz.id,
          questionText: question.question,
          correctAnswer: question.correctAnswer,
          answerChoices: question.choices,
          questionType: question.type,
        });
      });

      // Wait for all the promises to resolve
      Promise.all(questionPromises)
        .then(() => {
          res.json({ success: true, id: quiz.id });
        })
        .catch(error => {
          console.error('Failed to create questions:', error);
          res.status(500).json({ error: 'Failed to add questions to the database.' });
        });
    })
    .catch(error => {
      console.error('Failed to create quiz:', error);
      res.status(500).json({ error: 'Failed to add quiz to the database.' });
    });
  })
  .catch(error => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate completion.' });
  });
}

async function regenerateQuestion(req, res) {
  const { questionId } = req.params;

  const question = await Question.findByPk(questionId);
  const quiz = await Quiz.findByPk(question.quizId);

  // OpenAI Configuration
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const regenerationPrompt = question.questionType === 0
    ? `Generate a new multiple choice question about ${quiz.category}`
    : `Generate a new true/false question about ${quiz.category}`;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: regenerationPrompt
        }
      ]
    });
    const newText = response.data.choices[0].message.content;

    question.questionText = newText;
    await question.save();

    res.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to regenerate question.' });
  }
}


module.exports = { generate, regenerateQuestion };
