import  React, { createContext, useReducer } from 'react';
import { AppReducer } from './AppReducer';
import { GlobalState } from '../models/GlobalState';
import { Job } from '../models/models';


//Initial State
const initialState:GlobalState = {
  isDarkTheme: false,
  setIsDarkTheme: () => {},
  searchResults: [],
  setSearchResults: () => []
};

//Create context
export const GlobalContext = createContext<GlobalState>(initialState);

interface GlobalProviderProps {
  children: React.ReactNode;
}

//Provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  //Actions
  const setIsDarkTheme = () => {
    dispatch({
      type: 'TOGGLE_THEME',
    })
  };

  const setSearchResults = (results: Job[]) => {
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: results
    })
  }

  return (
    <GlobalContext.Provider value={{
      isDarkTheme: state.isDarkTheme,
      setIsDarkTheme,
      searchResults: state.searchResults,
      setSearchResults
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
