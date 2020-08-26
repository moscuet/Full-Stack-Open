import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)
const Statistics = ({good,bad,neutral}) =>{
  if(good+bad+neutral<=0)return <p>no  feedback given</p>
  return(
    <div>
      <h3>Statistic</h3>
      <p>Good  {good}</p>
      <p>Neutral  {neutral} </p>
      <p>Bad  {bad}</p>
      <p>All  {good+bad+neutral}</p>
      <p>Average  {(good-bad)/(good+bad+neutral)}</p>
      <p>Positive  {good*100/(good+bad+neutral)}</p>
   </div>
  )
}

const App = () => {
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
        <Statistics good={good} bad={bad} neutral ={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)