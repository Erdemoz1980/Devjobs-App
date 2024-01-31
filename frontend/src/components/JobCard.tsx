import React, {useContext, useReducer} from 'react';
import { Link } from 'react-router-dom';
import { Job } from '../models/models';
import { GlobalContext} from '../context/GlobalState';


interface JobCardProps extends Job {};

const JobCard: React.FC<JobCardProps> = ({...job }) => {
  const {id, company, logoBackground, logo, postedAt, contract, position, location } = job;
   
  const { isDarkTheme } = useContext(GlobalContext);
 
  return (
    <Link to={`/jobdetails/${id}`}>
    <section className={`job-card-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>

      <header className="logo-wrapper" style={{ background: `${logoBackground}` }}>
        <img src={logo} alt="Company Logo" />
      </header>

      <div className="job-card-body">
        <section className='job-meta'>
          <p>{postedAt}</p><p className='job-meta-separator'></p><p>{contract}</p>
        </section>

        <section className='job-position-wrapper'>
          <h3>{position}</h3>
        </section>

        <section className='company-wrapper'>
          <p>{company}</p>
        </section>

        <section className="location-wrapper">
          <h4>{location}</h4>
        </section>
      </div>

      </section>
      </Link>
  )
};

export default JobCard