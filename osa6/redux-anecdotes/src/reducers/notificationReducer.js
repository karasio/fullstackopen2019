const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification;
    case 'SET_NOTIFICATION_OFF':
      return null;
    default:
      return state;
  }
};

export const setNotificationOn = (notification, timeInSeconds) => {
  const secondsToMs = timeInSeconds * 1000;
  return async dispatch => {
    dispatch({
          type: 'SET_NOTIFICATION',
          notification,
    });
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION_OFF',
      })
    }, secondsToMs);
  }
};

export default notificationReducer;
