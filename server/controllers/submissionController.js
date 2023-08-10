const { Submission } = require('../models');

async function getSubmission(req, res) {

  const attemptId = parseInt(req.params.attemptId);
  const questionId = parseInt(req.params.questionId);
  // const questionType = req.body.questionType;
  try {
    const submission = await Submission.findOne({
      where: {
          attemptId: attemptId,
          questionId: questionId
      }
    })
    res.status(200).json({ message: "Submission found", id: submission.id, submissionChoice: submission.submissionChoice })
  } catch (error) {
    res.status(404).json({  message: "Submission NOT found", error: error.message })
  }

}

async function createSubmission(req, res) {

  const attemptId = parseInt(req.params.attemptId);
  const questionId = parseInt(req.params.questionId);
  const submissionChoice = req.body.submissionChoice; 
  // const questionType = req.body.questionType;

  try {

    const submission = await Submission.create({
      attemptId: attemptId,
      questionId: questionId,
      submissionChoice: submissionChoice,
      // submissionChoice: questionType !== 1 ? answerChoice : submissionChoice,
      // submissionText: questionType === 2 ? answerChoice : submissionText
    });
    res.status(201).json({ message: "New submission created", id: submission.id });

  } catch (error) {
    res.status(500).json({ message: "Error creating submission", error: error.message });
  }

}

async function updateSubmission(req, res) {
  const attemptId = parseInt(req.params.attemptId);
  const questionId = parseInt(req.params.questionId);
  const submissionChoice = req.body.submissionChoice;

  console.log("Attempt id:", attemptId);
  console.log("Question id:", questionId);
  console.log("Submission choice", submissionChoice);

  try {
    // Find the existing submission
    const submission = await Submission.findOne({
      where: {
        attemptId: attemptId,
        questionId: questionId
      }
    });

    if (!submission) {
      // If the submission does not exist, return an error
      return res.status(404).json({ message: "Submission not found" });
    }

    // Update the submissionChoice
    submission.submissionChoice = submissionChoice
    
    // Save the changes
    await submission.save();
    
    // Return the updated submission
    res.status(200).json({ message: "Submission updated", id: submission.id });
  } catch (error) {
    res.status(500).json({ message: "Error updating submission", error: error.message });
  }
}

async function getSubmissionsForAttempt(req, res) {
  try {
    const attemptId = req.params.attemptId;
    const submissions = await Submission.findAll({ where: { attemptId } });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getSubmission, createSubmission, updateSubmission, getSubmissionsForAttempt };