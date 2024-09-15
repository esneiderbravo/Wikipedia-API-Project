import React, { useReducer } from 'react';
import { initialState, reducer } from '../reducers/app';
import AppContext from '../context/app';
import App from '../components/App';

/**
 * App Container Component
 * Provides the application context using useReducer.
 * @return React.JSX.Element
 */
const AppContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <App />
    </AppContext.Provider>
  );
};

export default AppContainer;
