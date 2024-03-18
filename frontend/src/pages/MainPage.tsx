import React, { useContext, useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_JOBS } from '../queries/jobQueries';
import { Search } from '../models/models';
import SearchBar from '../components/SearchBar';
import JobCardsPage from './JobCardsPage';
import { GlobalContext } from '../context/GlobalState';
import { Job } from '../models/models';
import SearchBarMobile from '../components/SearchBarMobile';

const MainPage: React.FC = () => {
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [formData, setFormData] = useState<Search>({
    keyword: '',
    location: '',
    isFullTime: false,
  });
  const [isSeachSubmitted, setIsSearchSubmitted] = useState<boolean>(false);
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const { keyword, location, isFullTime } = formData;
  const { isDarkTheme } = useContext(GlobalContext);
  const { loading, error, data, refetch, fetchMore } = useQuery(SEARCH_JOBS);
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      setJobsData(data.jobs.jobs);
    }
  }, [data])


 
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

  

  const submitHandler = async (e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsOpenModal(false)
    try {
      await refetch({
        searchTerm: keyword,
        location,
        contract: isFullTime ? 'full time' : '',
      });  
    } catch (error) {

    } finally {
      setIsSearchSubmitted(true);
    }
  };

  const clearSearchHandler = async () => {
    await refetch({ searchTerm: '', location:'', isFullTime:false })
    setFormData({ keyword: '', location: '', isFullTime: false })
    setIsSearchSubmitted(false)
  }

  const loadMoreHandler = async () => {
    try {
      const nextCursor = jobsData[jobsData.length - 1]?._id;
      await fetchMore({
        variables: { searchTerm: keyword, location, contract: isFullTime ? 'full time' : '', lastItemId: nextCursor },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return {
            jobs: {
              jobs: [...prev.jobs.jobs, ...fetchMoreResult.jobs.jobs],
              totalCount: fetchMoreResult.jobs.totalCount,
            },
          };
        },
      }
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  
  return (
    <main className={`main-page-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>
      <SearchBar formData={formData} setFormData={setFormData} submitHandler={submitHandler}
        onChangeHandler={onChangeHandler} setIsModalOpen={setIsOpenModal}
        disabled={disabled} setDisabled={setDisabled} />
      <JobCardsPage loading={loading} error={error} jobsData={jobsData} totalCount={data?.jobs.totalCount}
        clearSearchHandler={clearSearchHandler} isSearchSubmitted={isSeachSubmitted}
        loadMoreHandler={loadMoreHandler} />
      {isModalOpen && (
        <SearchBarMobile
          setIsModalOpen={setIsOpenModal}
          onChangeHandler={onChangeHandler} submitHandler={submitHandler}
          isFullTime={isFullTime} location={location} setDisabled={setDisabled} disabled={disabled} />
      )

      }
    </main>
  )
}


export default MainPage