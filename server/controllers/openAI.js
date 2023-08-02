const { Configuration, OpenAIApi } = require("openai");

function generate(req, res) {

  const prompt = req.body.prompt;
  const questions = req.body.questions;
  const minutes = req.body.minutes;
  const difficulty = req.body.difficulty;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `Please generate a quiz on this topic: "${prompt}", ${questions} questions, difficulty: ${difficulty}` }],
  })
    .then(response => {
      const completion = response.data.choices[0].message.content;
      console.log(completion);
      res.send(completion);
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to generate completion.' });
    });
}

module.exports = { generate };
