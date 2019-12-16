import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const sort = (thingsToBeSorted) => {
  return thingsToBeSorted.sort((a, b) => (b.votes - a.votes));

};

const AnecdoteList = ({ store }) => {
  const sorted = sort(store.getState());
  return (
      <div>
        {sorted.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes} votes
                <button onClick={() => store.dispatch(voteAnecdote(anecdote.id))}>vote</button>
              </div>
            </div>
        )}
      </div>
  )
};

export default AnecdoteList