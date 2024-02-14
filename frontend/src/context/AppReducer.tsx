import { GlobalState } from "../models/GlobalState";
import { Job } from "../models/models";

type Action =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_SEARCH_RESULTS'; payload: Job[] };

export const AppReducer = (state: GlobalState, action: Action):GlobalState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload
      };
    default:
      return state;
  }
};
