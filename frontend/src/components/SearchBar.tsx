import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useQuery } from '@apollo/client';
import { SEARCH_JOBS } from '../queries/jobQueries';
import IconSearch from './IconSearch';
import IconLocation from './IconLocation';
import { Search } from '../models/models';
import IconCheck from './IconCheck';


const SearchBar: React.FC = () => {
  const [formData, setFormData] = useState<Search>({
    keyword: '',
    location: '',
    isFullTime: false,
  });
  const { keyword, location, isFullTime } = formData;

  const { isDarkTheme, setSearchResults } = useContext(GlobalContext);

  const { loading, error, data } = useQuery(SEARCH_JOBS, {
    variables: { searchTerm: keyword }
  });


  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevState => {
      if (e.target.name === 'isFullTime') {
        return { ...prevState, isFullTime: !prevState.isFullTime }
      } else {
        return {
          ...prevState,
          [e.target.name]: e.target.value
        }
      }
    })
  }
  
  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setFormData({ keyword: '', location: '', isFullTime: false })
  }

  return (
    <form className={`searchbar-wrapper container-lg ${isDarkTheme ? 'dark-theme' : ''}`
    } onSubmit={submitHandler}>
      <label htmlFor='keyword' className="input-wrapper keyword-input">
        <IconSearch />
        <input type="text" name="keyword" id="keyword" placeholder='Filter by title, companies, expertise...'
          value={formData.keyword}
          onChange={onChangeHandler}
        />
      </label>
      <label htmlFor='location' className="input-wrapper location-input">
        <IconLocation />
        <input type="text" name="location" id="location" placeholder='Filter by location...'
          value={formData.location}
          onChange={onChangeHandler}
        />
      </label>
      <div className="input-wrapper fulltime-input">
        <input type="checkbox" name="isFullTime" id="isFullTime" checked={formData.isFullTime} onChange={onChangeHandler} />
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