import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import JobDetailsHeader from '../components/JobDetailsHeader';
import JobDetails from '../components/JobDetails';
import JobDetailsFooter from '../components/JobDetailsFooter';
import jobsData from '../data.json';
import { GlobalContext } from '../context/GlobalState';


const JobDetailsPage: React.FC = () => {
  const params = useParams();

  const job = jobsData.find(job => job.id === Number(params.id));

  const { isDarkTheme } = useContext(GlobalContext);

  if (!job) {
    return <div className='main-page-wrapper container-md'>No job details were found!</div>
  }

  const { company, logo, logoBackground, position, postedAt, contract, location, website, description, requirements, role } = job; 


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