import React from 'react';
import JobCard from '../components/JobCard';
import Loader from '../components/Loader';
import { Job, ApolloQuery } from '../models/models';

interface JobsCardPageProps<T> extends ApolloQuery<T>{}

const JobCardsPage: React.FC<JobsCardPageProps<{jobs:Job[]}>> = ({ loading, error, data }) => {
  
  if (loading) return <div className="job-cards-page-wrapper container-lg">
    <Loader />
  </div>;

  return (
    <section className='job-cards-page-wrapper container-lg'>
      {data.jobs.length === 0 ? (
      <p>No results found!</p>
      ) : data.jobs.map((job: Job) => (
        <JobCard key={job.id} {...job} />
      ))}
      <button className="btn btn-large btn-dark-violet load-more">Load More</button>
    </section>
  );
};

export default JobCardsPage;