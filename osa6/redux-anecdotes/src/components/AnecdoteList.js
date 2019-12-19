import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { setNotificationOn } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {

  const handleVote = async (id) => {
    const votedAnecdote = props.visibleAnecdotes.find(anecdote => anecdote.id === id);
    props.voteAnecdote(id, votedAnecdote);
    props.setNotificationOn(`you voted "${votedAnecdote.content}"`, 5);
  };

  const style = {
    marginLeft: 5
  };

  const boxed = {
    border: "3px solid rgb(100, 212, 212)"
  };

  return (
      <div>
        {props.visibleAnecdotes.map(anecdote =>
            <div key={anecdote.id} style={boxed}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes} votes
                <button style={style} onClick={() => handleVote(anecdote.id)}>vote</button>
              </div>
            </div>
        )}
      </div>
  )
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  // console.log('anecdotes', anecdotes, 'filterValue', filter, typeof filter);
  return anecdotes
  .sort((a, b) => (b.votes - a.votes))
  .filter(anecdote => anecdote.content.includes(filter));

};

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state),
  }
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotificationOn,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList);
