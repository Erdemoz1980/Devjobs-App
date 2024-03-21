import React, { useContext } from 'react';
import { Job } from '../models/models';
import { GlobalContext } from '../context/GlobalState';

interface JobDetailsFooterProps extends Pick<Job, 'position' | 'company' | 'website'>{}

const JobDetailsFooter: React.FC<JobDetailsFooterProps> = ({ position, company, website }) => {
  
  const { isDarkTheme } = useContext(GlobalContext);
  return (
    <footer className={`job-details-footer-wrapper ${isDarkTheme ? 'dark-theme':''}`}>
      <section className="job-details-footer-body container-md">
      <div>
        <h3 className={`footer-position ${isDarkTheme ? 'dark-theme' : ''}`}>{position}</h3>
        <p className='footer-company'>{company}</p>
      </div>
      <a href={website} target='_blank' rel='noreferrer' className="btn btn-large btn-dark-violet apply-now-btn-footer">Apply Now</a>
        </section>
    </footer>
  )
}

export default JobDetailsFooter