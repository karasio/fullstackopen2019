import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';

const sort = (thingsToBeSorted) => {
  return thingsToBeSorted.sort((a, b) => (b.votes - a.votes));

};



const AnecdoteList = ({ store }) => {

  const handleVote = (id) => {
    store.dispatch(voteAnecdote(id));
    const votedAnecdote = store.getState().anecdotes.find(anecdote => anecdote.id === id);
    // console.log('xxxx',votedAnecdote);
    store.dispatch(notificationChange(`voted "${votedAnecdote.content}"`))
    setTimeout(() => {
      store.dispatch(notificationChange(null));
    }, 5000)
  };

  const sorted = sort(store.getState().anecdotes);
  const filterValue = store.getState().filter;
  // console.log('FILTERVALUE', filterValue);
  //   const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filterValueToLowerCase));
  const filtered = sorted.filter(anecdote => anecdote.content.includes(filterValue));
  // console.log('FILTERED ', filtered);

  return (
      <div>
        {filtered.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes} votes
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
              </div>
            </div>
        )}
      </div>
  )
};

export default AnecdoteList