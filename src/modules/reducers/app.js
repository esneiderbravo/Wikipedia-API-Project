const notification = {
  hidden: true,
  message: '',
  type: '',
};

const initialState = { notification };

/**
 * Reducer
 * @param {Object} state Reducer state. Ie, {notification: {...}, ...}
 * @param {Object} action Reducer action. Ie, {type: "showNotification", payload: {...}}
 */
const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'setNotification':
      return { ...state, ...payload };

    default:
      throw new Error('No valid action');
  }
};

export { initialState, reducer };
