import { Job } from "./models";

export interface GlobalState {
  isDarkTheme: boolean,
  setIsDarkTheme: () => void,
  searchResults: Job[],
  setSearchResults: (results: Job[]) => void;
}