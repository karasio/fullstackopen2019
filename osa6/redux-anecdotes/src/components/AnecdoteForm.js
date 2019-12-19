import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { setNotificationOn } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {

  // const getId = () => (100000 * Math.random()).toFixed(0);

  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    props.createAnecdote(content);
    props.setNotificationOn(`you added "${content}"`, 5);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name='anecdote'/>
        <button type='submit'>add</button>
      </form>
    </div>
  )
};

const mapDispatchToProps = {
  createAnecdote,
  setNotificationOn,
};

export default connect(
    null,
    mapDispatchToProps,
)(AnecdoteForm);
