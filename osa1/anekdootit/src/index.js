import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0);

  const nextRand = () => (
      setSelected( Math.floor(Math.random()*anecdotes.length))
  );

  const vote = () => {
/*    const copy = {...votes};
    copy[selected] += 1;
    console.log(copy)*/
  votes[selected] += 1;
  console.log(votes);
  }

  return (
      <div>
        <div>
          <h1>Anecdote of the day</h1>
          <p>{anecdotes[selected]}</p>
        </div>
        <div>
          <button onClick={vote}>vote</button>
          <button onClick={() => setSelected(nextRand)}>next anecdote</button>
        </div>
        <div>
          <h1>Anecdote with most votes</h1>
          <Results anecdotes={anecdotes} votes={votes}/>
        </div>
      </div>

  )
};

const Results = ({anecdotes, votes}) => {
  function hasChanged(value) {
    return value === 0;
  }
  if(votes.every(hasChanged)){
    return (
        <p>
          no votes yet
        </p>
    )
  }

  let biggest = -Infinity;
  let biggestIndex = -Infinity;

  for(let i = 0; i < votes.length; i++){
    if (votes[i] > biggest) {
      biggest = votes[i];
      biggestIndex = i;
    }
    console.log('isoin index ' + biggestIndex + 'arvolla ' + biggest);
  }

  return (
      <p>
        <i>"{anecdotes[biggestIndex]}"</i> has <b>{biggest}</b> votes
      </p>
  )
};

const votes = new Array(6).fill(0);

const anecdotes = [
  '0 If it hurts, do it more often',
  '1 Adding manpower to a late software project makes it later!',
  '2 The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  '3 Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  '4 Premature optimization is the root of all evil.',
  '5 Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];
ReactDOM.render(
    <App anecdotes={anecdotes} votes={votes}/>,
    document.getElementById('root')
);

/*  const addVote = () => {
    setVotes([...votes, {
      id: votes[selected],
      value: votes[selected]+1
    }])
  };*/