import React from 'react';
import { Job } from '../models/models';

interface JobDetailsHeaderProps extends Pick<Job, 'company' | 'logo' | 'logoBackground' | 'website'> {};

const JobDetailsHeader: React.FC<JobDetailsHeaderProps> = ({ company, logo, logoBackground, website }) => {
  return (
    <header className='job-details-header'>
      <div className='info-container'>
        <section className='logo-container' style={{ background: `${logoBackground}` }}>
          <img src={logo} alt='logo' />

        </section>
        <div className="company-name">
          <h2>{company}</h2>
          <p className="company-website">{website}</p>
        </div>
      </div>
     
   
      <div className="company-website-link">
        <a href={website} target='_blank' rel="noreferrer" className='btn btn-large btn-light-violet'>Company Site</a>
      </div>
    </header>
  )
};

export default JobDetailsHeader