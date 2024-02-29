import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_JOB_DETAILS } from '../queries/jobQueries';
import JobDetailsHeader from '../components/JobDetailsHeader';
import JobDetails from '../components/JobDetails';
import JobDetailsFooter from '../components/JobDetailsFooter';
import { GlobalContext } from '../context/GlobalState';
import Loader from '../components/Loader';


const JobDetailsPage: React.FC = () => {
  const params = useParams();
  const { isDarkTheme } = useContext(GlobalContext);

  const { loading, error, data } = useQuery(GET_JOB_DETAILS, {
   variables:{id:params.id}
  });
  
  if (loading) return <Loader />
  if (error) return <div className='main-page-wrapper container-md'>
    <p>No job details found!</p>
  </div>

  const { company, logo, logoBackground, position, postedAt, contract, location, website, description, requirements, role } = data.job; 

  return (
    <section className={`job-details-page-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>
    <div className='job-details-body-wrapper container-md'>
      <JobDetailsHeader company={company} logo={logo} logoBackground={logoBackground} website={website} />
      <JobDetails
        postedAt={postedAt} contract={contract}
        position={position} location={location}
        description={description} requirements={requirements} role={role} />
      </div>
      <JobDetailsFooter position={position} company={company} />
      </section>
  )
}

export default JobDetailsPage