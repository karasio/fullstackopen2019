import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ store }) => {
  return (
      <div>
        {store.getState().map(anecdote =>
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