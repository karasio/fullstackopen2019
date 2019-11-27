import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';

// TODO TÄMÄ REDUCERIIN?
const sort = (thingsToBeSorted) => {
  thingsToBeSorted.sort((a, b) => (b.votes - a.votes))
  console.log()
};
//preSortBlogs.sort((a, b) => (b.likes - a.likes)

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