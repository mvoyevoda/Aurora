const { Attempt } = require('../models');

async function verifyAttempt(req, res) {
    const userId = parseInt(req.params.userId);
    const quizId = parseInt(req.params.quizId);

    try {
        let attempt = await Attempt.findOne({
            where: {
                userId: userId,
                quizId: quizId
            }
        });

        if (!attempt) {  // If no attempt found, create a new one
            attempt = await Attempt.create({
                userId: userId,
                quizId: quizId,
                progress: 0  // Start from the beginning
                // You can add default values for other columns if necessary
            });
            res.status(201).json({ message: "New attempt created", id: attempt.id, progress: attempt.progress });
        } else {
            res.status(200).json({ message: "Attempt found", id: attempt.id, progress: attempt.progress });
        }
    } catch (error) {
        res.status(500).json({ message: "Error verifying attempt", error: error.message });
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

module.exports = { verifyAttempt, updateProgress };
