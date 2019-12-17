import React from 'react';
import { filterChange } from '../reducers/filterReducer';

const Filter = props => {

  const handleChange = event => {
    event.preventDefault();
    // console.log(event.target.value);
    const filter = event.target.value;
    props.store.dispatch(filterChange(filter));
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

export default Filter;
