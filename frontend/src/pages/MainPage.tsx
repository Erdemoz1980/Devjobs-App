import React, { useContext, useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_JOBS } from '../queries/jobQueries';
import { Search } from '../models/models';
import SearchBar from '../components/SearchBar';
import JobCardsPage from './JobCardsPage';
import { GlobalContext } from '../context/GlobalState';
import { Job } from '../models/models';

const MainPage: React.FC = () => {
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [formData, setFormData] = useState<Search>({
    keyword: '',
    location: '',
    isFullTime: false,
  });
  const [isSeachSubmitted, setIsSearchSubmitted] = useState<boolean>(false);
  const { keyword, location, isFullTime } = formData;
  const { isDarkTheme } = useContext(GlobalContext);
  const { loading, error, data, refetch } = useQuery(SEARCH_JOBS);

  useEffect(() => {
    if (data) {
      setJobsData(data.jobs.slice(0,3));
    }
  },[data])

 
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
      await refetch({
        searchTerm: keyword,
        location,
        contract: isFullTime ? 'full time' : '',
      });  
      
    } catch (error) {

    } finally {
      setIsSearchSubmitted(true);
      setTimeout(() => {
        setFormData({ keyword: '', location: '', isFullTime: false });
      }, 500);
    }
  };

  const clearSearchHandler = async () => {
    await refetch({ searchTerm: '', location:'', isFullTime:false })
    setIsSearchSubmitted(false)
  }

  const loadMoreHandler = () => {
    try {
      const nextJobs = data.jobs.slice(jobsData.length, jobsData.length + 3);
      setJobsData(prevState => [...prevState, ...nextJobs]);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <main className={`main-page-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>
    
      <SearchBar formData={formData} setFormData={setFormData} submitHandler={submitHandler} onChangeHandler={onChangeHandler} />
      <JobCardsPage loading={loading} error={error} jobsData={jobsData}  clearSearchHandler={clearSearchHandler} isSearchSubmitted={isSeachSubmitted} loadMoreHandler={loadMoreHandler}  />
    </main>
  )
}


export default MainPage