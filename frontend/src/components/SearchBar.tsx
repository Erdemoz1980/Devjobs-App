import React, { useContext } from 'react';
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



  return (
    <form className={`searchbar-wrapper container-lg ${isDarkTheme ? 'dark-theme' : ''}`
    } onSubmit={submitHandler}>
      <label htmlFor='keyword' className="input-wrapper keyword-input">
        <IconSearch />
        <input type="text" name="keyword" id="keyword" placeholder='Filter by title, companies, expertise...'
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
          Full Time Only
        </label>
               
        <button type="submit" className='btn btn-1'>Search</button>
      </div>
       
    </form>
  )
};

export default SearchBar