const {
    User
  } = require('../models');
  const {
    NotFoundError
  } = require('../middleware/errors');
  
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
  
  
  module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
  };