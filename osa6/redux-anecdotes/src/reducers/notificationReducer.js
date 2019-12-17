const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      //console.log('notificationReducerissa',action.notification);
      return action.notification;
    default:
      return state;
  }
};

export const notificationChange = notification => {
  console.log('notif change',notification);
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
};

export default notificationReducer;
