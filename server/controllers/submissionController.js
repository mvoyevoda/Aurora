const { Submission } = require('../models');

async function createSubmission(req, res) {

  const attemptId = parseInt(req.params.attemptId);
  const questionId = parseInt(req.params.questionId);
  const questionType = req.body.questionType;
  const answerChoice = req.body.answerChoice; 

  try {
    let submission = await Submission.findOne({
        where: {
            attemptId: attemptId,
            questionId: questionId
        }
    });

    if (!submission) {  // If no submission found, create a new one
        submission = await Submission.create({
          attemptId: attemptId,
          questionId: questionId,
          // Depending on the questionType, set submissionChoice or submissionText
          submissionChoice: questionType !== 2 ? answerChoice : null,
          submissionText: questionType === 2 ? answerChoice : null
        });
        res.status(201).json({ message: "New submission created", id: submission.id });
    } else {
        // MODIFY FOUND SUBMISSION WITH NEW ANSWER CHOICE / TEXT
        if (questionType !== 2) {
          submission.submissionChoice = answerChoice;
        } else {
          submission.submissionText = answerChoice;
        }
        await submission.save();  // Save changes to the database
        res.status(200).json({ message: "Submission updated", id: submission.id});
    }

  } catch (error) {
    res.status(500).json({ message: "Error creating submission", error: error.message });
  }

}

module.exports = { createSubmission };