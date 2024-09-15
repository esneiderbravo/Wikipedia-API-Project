/**
 * Set states
 */

const setNotification = (notification) => ({
  type: 'setNotification',
  payload: {
    notification,
  },
});

export { setNotification };
