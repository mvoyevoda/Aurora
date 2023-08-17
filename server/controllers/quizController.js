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

async function getAllQuizzes(req, res) {
  try {
    const quizzes = await Quiz.findAll({
      attributes: ['id', 'category'],
      order: [['createdAt', 'DESC']], // Sorting by createdBy in descending order
    });

    if (quizzes.length > 0) {
      res.json(quizzes);
    } else {
      res.status(404).json({ error: 'Quizzes not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
}


async function getUserQuizzes(req, res) {
  try {
    console.log('ok');
    const quizzes = await Quiz.findAll({ where: { userId: req.params.userId},
      attributes: ['id', 'category'],
      
      order: [['createdAt', 'DESC']], // Sorting by createdBy in descending order

    });

    if (quizzes.length > 0) {
      res.json(quizzes);
    } else {
      res.status(404).json({ error: 'Quizzes not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
}


module.exports = { getQuiz, getQuizQuestions, getAllQuizzes, getUserQuizzes };