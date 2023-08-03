const { Quiz, Question } = require('../models');

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

async function getQuizQuestions(req, res) {
  try {
    const questions = await Question.findAll({ where: { quizId: req.params.id } });

    if (questions && questions.length > 0) {
      res.json(questions);
    } else {
      res.status(404).json({ error: 'Questions not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
};

module.exports = { getQuiz, getQuizQuestions };