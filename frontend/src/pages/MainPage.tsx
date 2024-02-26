import React, { useContext, useState} from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_JOBS } from '../queries/jobQueries';
import { Search } from '../models/models';
import SearchBar from '../components/SearchBar';
import JobCardsPage from './JobCardsPage';
import { GlobalContext } from '../context/GlobalState';

const MainPage: React.FC = () => {
  const [formData, setFormData] = useState<Search>({
    keyword: '',
    location: '',
    isFullTime: false,
  });
  const [isSeachSubmitted, setIsSearchSubmitted] = useState<boolean>(false);
  const { keyword } = formData;
  const { isDarkTheme } = useContext(GlobalContext);
  const { loading, error, data, refetch } = useQuery(SEARCH_JOBS);

  
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
  };


  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await refetch({ searchTerm:keyword });
      
    } catch (error) {
     console.log(error)
    } finally {
      setIsSearchSubmitted(true);
      setTimeout(() => {
        setFormData({ keyword: '', location: '', isFullTime: false });
      }, 500);
    }
  };

  const clearSearchHandler = async () => {
    await refetch({ searchTerm: keyword })
    setIsSearchSubmitted(false)
  }

  
  return (
    <main className={`main-page-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>
    
      <SearchBar formData={formData} setFormData={setFormData} submitHandler={submitHandler} onChangeHandler={onChangeHandler} />
      <JobCardsPage loading={loading} error={error} data={data}  clearSearchHandler={clearSearchHandler} isSearchSubmitted={isSeachSubmitted} />
    </main>
  )
}

export default MainPage