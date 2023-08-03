const { Quiz } = require('../models');

async function getQuiz (req, res) {
  try {
    const quiz = await Quiz.findByPk(req.params.id);
    if (quiz) {
      res.json(quiz);
    } else {
      res.status(404).json({ error: 'Quiz not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

module.exports = { getQuiz };