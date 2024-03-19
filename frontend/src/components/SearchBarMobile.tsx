import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import IconCheck from './IconCheck';
import IconLocation from './IconLocation';

interface SearchBarMobileProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFullTime: boolean,
  location: string,
  submitHandler:(e:React.ChangeEvent<HTMLFormElement>)=>void,
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>,
  disabled:boolean
}

const SearchBarMobile:React.FC<SearchBarMobileProps> = ({submitHandler, onChangeHandler, isFullTime, location, setIsModalOpen, disabled, setDisabled}) => {
  const { isDarkTheme } = useContext(GlobalContext);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // The click event originated from the container itself, not its children
      setIsModalOpen(false); // Close the modal
    }
  };

  return (
    <div className={`searchbar-wrapper-mobile-overlay`} onClick={handleContainerClick}>
      <form className={`searchbar-wrapper-mobile ${isDarkTheme ? 'dark-theme' : ''}`} onSubmit={submitHandler}>
        <label htmlFor='location' className="input-wrapper location-input">
          <IconLocation />
          <input type="text" name="location" id="location" placeholder='Filter by location...'
            value={location}
            onChange={onChangeHandler}
          />
        </label>
        <div className="input-wrapper fulltime-input">
          <input type="checkbox" name="isFullTime" id="isFullTime" checked={isFullTime} onChange={onChangeHandler} />
          <label htmlFor="isFullTime" className={`full-time-label-mobile ${isDarkTheme ? 'dark-theme' : ''}`}>
            <IconCheck />
            Full Time Only
          </label>

          <button type="submit" className={`btn mobile-btn ${isDarkTheme ? 'dark-theme' : ''}`} disabled={disabled}>Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarMobile;