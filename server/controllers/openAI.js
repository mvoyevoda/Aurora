exports.generate = (req, res) => {

  const prompt = req.body.prompt;
  const questions = req.body.questions;
  const minutes = req.body.minutes;
  const difficulty = req.body.difficulty;
  
  console.log(prompt)
  res.json({ success: true });

}