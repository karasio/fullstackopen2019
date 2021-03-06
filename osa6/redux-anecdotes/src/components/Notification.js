import React from 'react';
import { connect } from 'react-redux';

const Notification = (props) => {
  // console.log('notit',store.getState());

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    color: 'grey'
  };

  return (
      props.notification !== null
      ?  <div style={style}>
              {props.notification}
         </div>
      : <></>

  )
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
};

export default connect(
    mapStateToProps,
    null
)(Notification);
