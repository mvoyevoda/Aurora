const {
  User
} = require('../models');
const {
  Quiz
} = require('../models');
const {
  NotFoundError
} = require('../middleware/errors');
const {
  Attempt
} = require('../models');

async function getAllUsers(req, res, next) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

async function getUserById(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

async function deleteUser(req, res, next) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    await user.destroy();
    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

async function getAttemptsByUser(req, res, next) {
  try {
    const userId = req.params.id;
    const quizId = req.params.quizId;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    const whereClause = {
      userId: userId
    };

    // If quizId is provided, add it to the where clause.
    if (quizId) {
      whereClause.quizId = quizId;
    }

    const attempt = await Attempt.findOne({
      where: whereClause,
      order: [
        ['updatedAt', 'DESC']
      ],
      include: [{
        model: User,
        as: 'User',
        attributes: ['id', 'userName', 'email']
      }, {
        model: Quiz,
        as: 'Quiz',
        attributes: ['id', 'category', 'language', 'title', 'difficulty']
      }]
    });

    if (!attempt) {
      return res.status(404).json({
        message: "No attempts found for this user and quiz."
      });
    }

    res.status(200).json(attempt);
  } catch (err) {
    console.log(err);
    next(err);
  }
};


module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
  getAttemptsByUser,
};