import axios from 'axios';
import "../styles/configurator.css"

export default function Configurator(){
  return (
      <div className="configurator" >
        <form action="http://localhost:4000/api/openAI/generate" method="POST" className="">
          <input type="text" name="prompt" className="prompt" placeholder="summarize the quiz topic in a few words... "/>
          <input type="text" name="questions" className="questions" placeholder="# of questions"/>
          <input type="text" name="mins" className="mins" placeholder="# of minutes"/>
          <input type="text" name="difficulty" className="difficulty" placeholder="difficulty"/>
          <input type="submit" value="Generate" />
        </form>
      </div>
  )
}