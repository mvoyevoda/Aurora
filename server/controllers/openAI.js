const { Configuration, OpenAIApi } = require("openai");

function generate(req, res) {

  const { prompt, questions, minutes, difficulty } = req.body;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: 
      `I will be taking your response and formatting it inside user-friendly quiz taking environment on my website. 
      Please respond in JSON format. 
      For each question, specify whether the questions is 0, 1, or 2 ---> multiple choice, true/false, short response. 
      Each question should be an object with keys: type, question, choices, answer. 
      For the multiple choice, do not include the corresponding letter, only include the choice. 
      Limit of 4 choices for multiple choice questions. 
      If the question is of short response type, put NULL as the answer. 
      Give me a good mix of all question types. Do not include any other info except the quiz itself. 
      Below is some info about the quiz I want you to generate right now:
      Please generate a quiz on this topic: "${prompt}", ${questions} questions, difficulty: ${difficulty}` 
    }],
  })
    .then(response => {
      const completion = response.data.choices[0].message.content;
      console.log(completion);
      // res.send(completion); //SEND ID OF QUIZ IN DATABASE
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to generate completion.' });
    });

    try {
      const quiz = await Quiz.create({ prompt, questions, minutes, difficulty });
        // Send the ID of the new row back to the client
        res.json({ success: true, id: quiz.id });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate quiz.' });
    }
}

module.exports = { generate };
