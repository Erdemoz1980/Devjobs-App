import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Search } from '../models/models';
import IconSearch from './IconSearch';
import IconLocation from './IconLocation';
import IconCheck from './IconCheck';

interface SearchProps {
  formData: Search,
  setFormData: React.Dispatch<React.SetStateAction<Search>>,
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
  submitHandler:(e: React.ChangeEvent<HTMLFormElement>)=>void
};

const SearchBar: React.FC<SearchProps> = ({formData, setFormData, onChangeHandler, submitHandler}) => {
  const { keyword, location, isFullTime } = formData;
  const { isDarkTheme } = useContext(GlobalContext);
  const [responsiveText, setResponsiveText] = useState({
    placeholder: 'Filter by title, companies, expertise...',
    labelText:'Full Time Only'
  });

  useEffect(() => {
    //Update text input placeholder text based on screen size
    const updatePlaceholder = () => {
      const isSmallScreen = window.innerWidth <= 1110;
      setResponsiveText(prevState => ({
        ...prevState,
        placeholder: isSmallScreen ? 'Filter by title...' : 'Filter by title, companies, expertise...',
        labelText:isSmallScreen ? 'Full Time' : 'Full Time Only'
      }))
     
    };

    updatePlaceholder();

    window.addEventListener('resize', updatePlaceholder);

    return () => {
      window.removeEventListener('resize', updatePlaceholder)
    }
    
  }, []);



  return (
    <form className={`searchbar-wrapper container-lg ${isDarkTheme ? 'dark-theme' : ''}`
    } onSubmit={submitHandler}>
      <label htmlFor='keyword' className="input-wrapper keyword-input">
        <IconSearch />
        <input type="text" name="keyword" id="keyword" placeholder={responsiveText.placeholder}
          value={keyword}
          onChange={onChangeHandler}
        />
      </label>
      <label htmlFor='location' className="input-wrapper location-input">
        <IconLocation />
        <input type="text" name="location" id="location" placeholder='Filter by location...'
          value={location}
          onChange={onChangeHandler}
        />
      </label>
      <div className="input-wrapper fulltime-input">
        <input type="checkbox" name="isFullTime" id="isFullTime" checked={isFullTime} onChange={onChangeHandler} />
        <label htmlFor="isFullTime">
          <IconCheck />
          {responsiveText.labelText}
        </label>
               
        <button type="submit" className='btn btn-1'>Search</button>
      </div>
       
    </form>
  )
};

export default SearchBar