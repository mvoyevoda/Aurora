import "../styles/configurator.css"

export default function Configurator(){
  return (
      <div className="configurator" >
        <form action="../services/generate.jsx" method="POST" className=""></form>
        <input type="text" className="prompt" placeholder="summarize the quiz topic in a few words... "/>
        <input type="text" className="questions" placeholder="# of questions"/>
        <input type="text" className="mins" placeholder="# of minutes"/>
        <input type="text" className="difficulty" placeholder="difficulty"/>

      </div>
  )
}