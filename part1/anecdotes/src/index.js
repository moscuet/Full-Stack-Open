import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const MostVote = ({vote}) => {
  let maxValue = Math.max(...vote)
  let index = vote.indexOf(maxValue)
  if(maxValue===0) return <p>No one vote yet</p>
  return(
    <div>
      <p>{anecdotes[index]}</p>
      <p>has {vote[index]} votes</p>
    </div>
  )
}

const App = (props) => {
  const arr = new Array(anecdotes.length).fill(0)
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(arr)
  const clickhandle = () => {
      let randomIndex = Math.floor(Math.random()*anecdotes.length)
      setSelected(randomIndex)
   }
  const voteHandle = () => {
    let updateVote = [...vote] 
    updateVote[selected]+=1
    setVote(updateVote)
  }
  return (
    <div>
      <h2> Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick = {voteHandle}>Vote</button>
      <button onClick= {clickhandle}>next anecdotes</button>
      <h2> Anecdote with most vote</h2>
      <MostVote vote ={vote} />
    </div>

  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)