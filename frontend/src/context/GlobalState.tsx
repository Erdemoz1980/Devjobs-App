import  React, { createContext, useReducer } from 'react';
import { AppReducer } from './AppReducer';
import { GlobalState } from '../models/GlobalState';


//Initial State
const initialState:GlobalState = {
  isDarkTheme:false,
  setIsDarkTheme:()=>{}
}

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

  return (
    <GlobalContext.Provider value={{
      isDarkTheme: state.isDarkTheme,
      setIsDarkTheme
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
