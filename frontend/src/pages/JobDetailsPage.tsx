import React from 'react';
import { useParams } from 'react-router-dom';
import JobDetailsHeader from '../components/JobDetailsHeader';
import JobDetails from '../components/JobDetails';
import JobDetailsFooter from '../components/JobDetailsFooter';
import jobsData from '../data.json';

interface JobDetailsPageProps {
  isDarkTheme:boolean
}


const JobDetailsPage: React.FC<JobDetailsPageProps> = ({isDarkTheme}) => {
  const params = useParams();

  const job = jobsData.find(job => job.id === Number(params.id));

  if (!job) {
    return <div className='job-details-page-wrapper container-md'>No job details were found!</div>
  }

  const { company, logo, logoBackground, position, postedAt, contract, location, website, description, requirements, role } = job; 


  return (
    <>
    <div className='job-details-page-wrapper container-md'>
      <JobDetailsHeader company={company} logo={logo} logoBackground={logoBackground} website={website} isDarkTheme={isDarkTheme} />
      <JobDetails
        postedAt={postedAt} contract={contract}
        position={position} location={location}
          description={description} requirements={requirements} role={role} />
         </div>
      <JobDetailsFooter position={position} company={company} />
      </>
  )
}

export default JobDetailsPage