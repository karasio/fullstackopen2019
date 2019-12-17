import React from 'react';
import { connect } from 'react-redux'
import { filterChange } from '../reducers/filterReducer';

const Filter = (props) => {

  const handleChange = event => {
    event.preventDefault();
    props.filterChange(event.target.value);
  };

  const style = {
    marginBottom: 10
  };

  return (
      <div style={style}>
        <input
            type='text'
            name='filter'
            placeholder='filter anecdotes'
            onChange={handleChange}
        />
      </div>
  )
};

export default connect(
    null,
    { filterChange }
)(Filter);
