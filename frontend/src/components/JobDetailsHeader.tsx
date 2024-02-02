import React, {useContext} from 'react';
import { Job } from '../models/models';
import { GlobalContext } from '../context/GlobalState';

interface JobDetailsHeaderProps extends Pick<Job, 'company' | 'logo' | 'logoBackground' | 'website'> {};

const JobDetailsHeader: React.FC<JobDetailsHeaderProps> = ({ company, logo, logoBackground, website }) => {
 
  const { isDarkTheme } = useContext(GlobalContext);


  return (
    <header className={`job-details-header ${isDarkTheme ? 'dark-theme' :''}`}>
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
        <a href={website} target='_blank' rel="noreferrer" className={`btn btn-large ${isDarkTheme ? 'btn-dark' : 'btn-light-violet'}`}>Company Site</a>
      </div>
    </header>
  )
};

export default JobDetailsHeader