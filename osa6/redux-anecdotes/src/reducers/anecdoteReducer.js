import anecdoteService from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find(a => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      };
      return state.map(a =>
          a.id !== id ? a : changedAnecdote);
    case 'NEW':
      // console.log(...state, newNote);
      return [...state, action.data];
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW',
      data: newAnecdote,
    })
  }
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
};

export const voteAnecdote = (id, votedAnecdote) => {
  return async dispatch => {
    await anecdoteService.update(id, votedAnecdote);
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
};

export default reducer