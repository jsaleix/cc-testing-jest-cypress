import React, {useEffect, useState, useReducer } from 'react';
import './styles/App.scss';
import AppRouter from './AppRouter';
import { AppContextProvider, appInitData } from './contexts/AppContext';
import 'whatwg-fetch';

const appReducer = (state, { action, params }) => {
  switch(action){
    case 'LOG_USER':
      return { ...state, isLoggedIn: true};
    case 'LOGOUT_USER':
      return { ...state, isLoggedIn: false};
    default:
        return { ...state, ...params };
  }
}

function App() {
  const [ data, dispatch ] = useReducer(appReducer, appInitData);
  
  return (
    <AppContextProvider value={{data, dispatch }}>
    <div className="App">
      <AppRouter/>
    </div>
    </AppContextProvider>
  );
}

export default App;
