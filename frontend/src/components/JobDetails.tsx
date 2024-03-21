import React, {useContext} from 'react';
import { Job } from '../models/models';
import { GlobalContext } from '../context/GlobalState';


interface JobDetailsProps extends Pick<Job, 'postedAt'|'contract'|'position'|'location'|'description'|'requirements'|'role' | 'website'> { };

const JobDetails: React.FC<JobDetailsProps> = ({ postedAt, contract, position, location, website, description, requirements, role }) => {
  
  const { isDarkTheme } = useContext(GlobalContext);
  
  return (
    <section className={`job-details-wrapper ${isDarkTheme ? 'dark-theme' : ''}`}>

      <header className="job-details-body-header mb-4">
        <div>
          <div className='job-meta'>
            <p>{postedAt}</p><p className='job-meta-separator'></p><p>{contract}</p>
          </div>
          <div className='job-position-wrapper'>
            <h1 className='size-h1'>{position}</h1>
          </div>
          <div className='location-wrapper'>
            <h4 className='size-h4'>{location}</h4>
          </div>
        </div>
        <a href={website} target='_blank' rel='noreferrer' className="btn btn-large btn-dark-violet apply-now-btn">Apply Now</a>
      </header>

      <section className="job-desc-wrapper mb-4">
        <p>{description}</p>
      </section>

      <section className="job-requirements-wrapper mb-48">
        <h3 className='mb-28 size-h3'>Requirements</h3>
        <p className='mb-24'>{requirements.content}</p>
        <ul className='job-requirements-list'>
          {requirements.items.map((item, index) => (
            <li key={index}><span></span><p>{item}</p></li>
         ))}
        </ul>
      </section>

      <section className="job-tasks">
        <h3 className='mb-28 size-h3'>What You Will Do</h3>
        <p className='mb-24'>{role.content}</p>
        <ol className="job-tasks-list-ordered">
          {role.items.map((item, index) =>(
            <li key={index}>{item}</li>
          ))}
        </ol>
      </section>
  
    </section>
  )
};

export default JobDetails