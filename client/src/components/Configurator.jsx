import axios from 'axios';
import "../styles/configurator.css"

export default function Configurator() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = e.target.prompt.value;
    const questions = e.target.questions.value;
    const minutes = e.target.mins.value;
    const difficulty = e.target.difficulty.value;

    try {
      const response = await axios.post("http://localhost:4000/api/openAI/generate", {
        prompt,
        questions,
        minutes,
        difficulty,
      });

      // If successful, redirect to the new URL with the ID from the response
      if (response.data.success) {
        const id = response.data.id;
        window.location.href = `http://localhost:5173/portal/${id}`;
      } else {
        console.error("Failed to generate quiz");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="configurator">
      <form onSubmit={handleSubmit} className="">
        <input type="text" name="prompt" className="prompt" placeholder="summarize the quiz topic in a few words... " />
        <input type="text" name="questions" className="questions" placeholder="# of questions" />
        <input type="text" name="mins" className="mins" placeholder="# of minutes" />
        <input type="text" name="difficulty" className="difficulty" placeholder="difficulty" />
        <input type="submit" value="Generate" />
      </form>
    </div>
  );
}
