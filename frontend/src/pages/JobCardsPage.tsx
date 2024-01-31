import React from 'react';
import JobCard from '../components/JobCard';
import jobsData from '../data.json';

interface JobCardsPageProps {
  isDarkTheme:boolean
}

const JobCardsPage: React.FC<JobCardsPageProps> = ({ isDarkTheme }) => {
  return (
    <section className='job-cards-page-wrapper'>
      {
        jobsData.map(job => (
          <JobCard key={job.id} {...job} isDarkTheme={isDarkTheme} />
        ))
      }
    </section>
  )
};

export default JobCardsPage