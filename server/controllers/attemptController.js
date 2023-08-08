const { Attempt } = require('../models');

async function getAllAttempts(req, res) {
  try {
    // Fetch all attempts and order them by createdAt attribute in descending order
    const attempts = await Attempt.findAll({
      order: [['createdAt', 'DESC']]
    });

    if (attempts.length === 0) {
      res.status(404).json({ message: "No attempts found" });
    } else {
      res.status(200).json(attempts);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching all attempts", error: error.message });
  }
}

async function getProgress(req, res) {
  const attemptId = parseInt(req.params.attemptId);

  try {
    const attempt = await Attempt.findOne({ where: { id: attemptId }});

    if (!attempt) {
      res.status(404).json({ message: "Attempt not found" });
    } else {
      res.status(200).json({ message: "Attempt found", id: attempt.id, progress: attempt.progress });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching attempt", error: error.message });
  }
}

async function createAttempt(req, res) {
  const userId = parseInt(req.params.userId);
  const quizId = parseInt(req.params.quizId);

  try {
      let attempt = await Attempt.create({
          userId: userId,
          quizId: quizId,
          progress: 0  
      });
      res.status(201).json({ message: "New attempt created", id: attempt.id, userId: userId, quizId: quizId ,progress: attempt.progress });
  } catch (error) {
      res.status(500).json({ message: "Error creating attempt", error: error.message });
  }
};

async function updateProgress(req, res) {
  const attemptId = parseInt(req.params.attemptId);
  const progress = parseInt(req.body.progress);

  try {
    const attempt = await Attempt.findOne({ where: { id: attemptId }});

    if (!attempt) {
      res.status(404).json({ message: "Attempt not found" });
    } else {
      attempt.progress = progress;
      await attempt.save();
      res.status(200).json({ message: "Attempt updated", id: attempt.id, progress: attempt.progress });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating attempt", error: error.message });
  }
}

async function updateScore(req, res) {

  const attemptId = parseInt(req.params.attemptId);
  const score = parseInt(req.body.score);

  try {
    const attempt = await Attempt.findOne({ where: { id: attemptId }});

    if (!attempt) {
      res.status(404).json({ message: "Attempt not found" });
    } else {
      attempt.score = score;
      await attempt.save();
      res.status(200).json({ message: "Score updated", id: attempt.id, score: attempt.score });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating score", error: error.message });
  }

}

async function calculateScore(req, res) {

  const attemptId = parseInt(req.params.attemptId);

}

module.exports = { getProgress, createAttempt, updateProgress, getAllAttempts, updateScore };

