import { GlobalState } from "../models/GlobalState";

type Action  = { type: 'TOGGLE_THEME' };

export const AppReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDarkTheme: !state.isDarkTheme,
      };
    default:
      return state;
  }
};
