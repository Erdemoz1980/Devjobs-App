import React, { useContext, useEffect, useState} from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
  const { keyword } = formData;
  const { isDarkTheme } = useContext(GlobalContext);
  const { loading, error, data, refetch } = useQuery(SEARCH_JOBS);

  const location = useLocation();
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    if (location.state?.resetSearch) {
      refetch({ searchTerm:'' });
    };
    if (searchTerm) {
      refetch({ searchTerm });
    }
  }, [location.state?.resetSearch, refetch, searchTerm]);

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
    navigate(`/jobs/search/${keyword}`);

    try {
      await refetch({ searchTerm });
      
    } catch (error) {
     console.log(error)
    } finally {
      setTimeout(() => {
        setFormData({ keyword: '', location: '', isFullTime: false });
      }, 500);
    }
  };

  
  return (
    <main className={`main-page-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>
      <SearchBar formData={formData} setFormData={setFormData} submitHandler={submitHandler} onChangeHandler={onChangeHandler}   />
      <JobCardsPage loading={loading} error={error} data={data}   />
    </main>
  )
}

export default MainPage