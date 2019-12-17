import React from 'react';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { notificationChange } from '../reducers/notificationReducer';
import { connect } from 'react-redux';

const AnecdoteList = (props) => {

  const handleVote = (id) => {
    props.voteAnecdote(id);
    const votedAnecdote = props.visibleAnecdotes.find(anecdote => anecdote.id === id);
    props.notificationChange(`voted "${votedAnecdote.content}"`);
    setTimeout(() => {
      props.notificationChange(null);
    }, 5000)
  };

  const style = {
    marginLeft: 5
  };

  return (
      <div>
        {props.visibleAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
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
  notificationChange,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList);
