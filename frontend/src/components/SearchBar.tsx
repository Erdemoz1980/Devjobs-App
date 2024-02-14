import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useQuery } from '@apollo/client';
import { SEARCH_JOBS } from '../queries/jobQueries';
import { Search } from '../models/models';
import IconSearch from './IconSearch';
import IconLocation from './IconLocation';
import IconCheck from './IconCheck';


const SearchBar: React.FC = () => {
  const [formData, setFormData] = useState<Search>({
    keyword: '',
    location: '',
    isFullTime: false,
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { keyword } = formData;

  const { isDarkTheme, setSearchResults } = useContext(GlobalContext);

  const { loading, error, data, refetch } = useQuery(SEARCH_JOBS, {
    variables: { searchTerm: keyword },
    skip:!isSubmitted,
  });

  useEffect(() => {
    if (data) {
      console.log(data.searchJobs)
    }
  }, [data, isSubmitted]);


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
  
    try {
      await refetch({ searchTerm: keyword });
  
      // Additional logic if needed...
  
      setIsSubmitted(true);
    } catch (error) {
      // Handle errors if needed
    } finally {
      // Reset isSubmitted after the asynchronous operation is complete
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ keyword: '', location: '', isFullTime: false });
      }, 500);
    }
  };
  
  
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