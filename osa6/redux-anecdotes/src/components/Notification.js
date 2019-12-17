import React from 'react';

const Notification = ({ store }) => {
  // console.log('notit',store.getState());

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  };

  return (
      store.getState().notification !== null
      ?  <div style={style}>
              {store.getState().notification}
         </div>
      : <></>

  )
};

export default Notification;
