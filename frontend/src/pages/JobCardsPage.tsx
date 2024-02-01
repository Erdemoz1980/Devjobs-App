import React from 'react';
import JobCard from '../components/JobCard';
import jobsData from '../data.json';

const JobCardsPage: React.FC = () => {
  return (
    <section className='job-cards-page-wrapper container-lg'>
      {
        jobsData.map(job => (
          <JobCard key={job.id} {...job} />
        ))
      }
    </section>
  )
};

export default JobCardsPage