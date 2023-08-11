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

async function getAttempt(req, res) {
  try {
    const userId = parseInt(req.params.userId);  // Extract userId from URL parameters
    const quizId = parseInt(req.params.quizId);  // Extract quizId from URL parameters
    
    // Fetch the most recent attempt for the specific userId and quizId
    const attempt = await Attempt.findOne({
      where: { 
        userId: userId, 
        quizId: quizId  // Add a condition for both userId and quizId
      },
      order: [['createdAt', 'DESC']]
    });

    if (!attempt) {
      res.status(404).json({ message: "No attempts found for the user for the given quiz" });
    } else {
      res.status(200).json(attempt);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching the attempt", error: error.message });
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

async function getAttempt(req, res) {
  const userId = parseInt(req.params.userId);
  const quizId = parseInt(req.params.quizId);

  try {
    // Find an existing attempt for the given user and quiz
    const attempt = await Attempt.findOne({ where: { userId, quizId }});

    if (attempt) {
      res.status(200).json(attempt); // Existing attempt found, return it
    } else {
      res.status(404).json({ message: "Attempt not found" }); // No existing attempt found
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

async function updateAttemptProgress(req, res) {
  const attemptId = parseInt(req.params.attemptId);
  const { progress } = req.body;

  try {
    const attempt = await Attempt.findByPk(attemptId);
    if (!attempt) {
      return res.status(404).json({ message: 'Attempt not found' });
    }

    // Update the progress for the found attempt
    attempt.progress = progress;
    await attempt.save();

    res.status(200).json({ message: 'Progress updated successfully', progress: attempt.progress });
  } catch (error) {
    res.status(500).json({ message: 'Error updating progress', error: error.message });
  }
};

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

module.exports = { getProgress, getAttempt, createAttempt, updateProgress, updateAttemptProgress, getAllAttempts, updateScore };

