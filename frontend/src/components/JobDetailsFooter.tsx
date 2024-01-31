import React from 'react';
import { Job } from '../models/models';

interface JobDetailsFooterProps extends Pick<Job, 'position' | 'company'>{}

const JobDetailsFooter:React.FC<JobDetailsFooterProps> = ({position, company}) => {
  return (
    <footer className='job-details-footer-wrapper'>
      <section className="job-details-footer-body container-md">
      <div>
        <h3>{position}</h3>
        <p>{company}</p>
      </div>
        <button className="btn btn-large btn-dark-violet">Apply Now</button>
        </section>
    </footer>
  )
}

export default JobDetailsFooter