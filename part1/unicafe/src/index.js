import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
 
  return (
    <div>
      <h2>Give feedback</h2>
     <div>
       <Button onClick={()=>setGood(good+1)} text = 'Good'/>
       <Button onClick={()=>setNeutral(neutral+1)} text = 'Neutral'/>
       <Button onClick={()=>setBad(bad+1)} text = 'Bad'/>
     </div>
     <div>
       <h3>Statistic</h3>
       <p>Good  {good}</p>
       <p>Neutral  {neutral} </p>
       <p>Bad  {bad}</p>
     </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)