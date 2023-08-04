const { Configuration, OpenAIApi } = require("openai");
const { Quiz } = require('../models');
const { Question } = require('../models');

async function generate(req, res) {

  // Form Data
  const { prompt, questions, minutes, difficulty } = req.body; 

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
      For each question, specify whether the questions is 0, 1, or 2 ---> multiple choice, true/false, short response. 
      Each question should be an object with keys: type, question, choices, answer. 
      For the multiple choice, do not include the corresponding letter, only include the choice. 
      List 4 choices for multiple choice questions. 
      If the question is of short response type, put NULL as the answer. 
      Give me a good mix of all question types. Strictly adhere to this example format in your response:

      {
        "topic": "veggies",
        "difficulty": "easy",
        "questions": [
          {
            "type": 1,
            "question": "Carrots are a type of vegetable. (True/False)",
            "correctAnswer": "1"
          },
          {
            "type": 0,
            "question": "Which of the following is a leafy green vegetable?",
            "choices": ["Broccoli", "Spinach", "Cucumber", "Radish"],
            "correctAnswer": "1"
          },
          {
            "type": 2,
            "question": "Name a root vegetable.",
            "correctAnswer: null
          }
        ]
      }

      Below is some info about the quiz I want you to generate right now:
      
      Please generate a quiz on this topic: ${prompt}, ${questions} questions, difficulty: ${difficulty}
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

module.exports = { generate };
