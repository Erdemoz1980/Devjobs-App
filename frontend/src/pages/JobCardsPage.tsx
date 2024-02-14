import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_JOBS } from '../queries/jobQueries';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import { Job } from '../models/models';

const JobCardsPage: React.FC = () => {
  const { loading, error, data  } = useQuery<{ jobs: Job[] }>(GET_JOBS);

  if (loading) return <div className="job-cards-page-wrapper container-lg">
    <Loader />
  </div>;
  if (error || !data) return (
    <div className="job-cards-page-wrapper container-lg">
      <p>There are currently no jobs available.</p>
    </div>
    );

  return (
    <section className='job-cards-page-wrapper container-lg'>
      {data.jobs.map((job: Job) => (
        <JobCard key={job.id} {...job} />
      ))}
      <button className="btn btn-large btn-dark-violet load-more">Load More</button>
    </section>
  );
};

export default JobCardsPage;