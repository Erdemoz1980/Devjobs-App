import React from 'react';
import IconCheck from './IconCheck';
import IconLocation from './IconLocation';

interface SearchBarMobileProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFullTime: boolean,
  location: string,
  submitHandler:(e:React.ChangeEvent<HTMLFormElement>)=>void
}

const SearchBarMobile:React.FC<SearchBarMobileProps> = ({submitHandler, onChangeHandler, isFullTime, location}) => {
  return (
    <div className={`searchbar-wrapper-mobile-overlay`}>
    <form className='searchbar-wrapper-mobile' onSubmit={submitHandler}>
        <label htmlFor='location' className="input-wrapper location-input">
        <IconLocation />
        <input type="text" name="location" id="location" placeholder='Filter by location...'
          value={location}
          onChange={onChangeHandler}
        />
      </label>
      <div className="input-wrapper fulltime-input">
        <input type="checkbox" name="isFullTime" id="isFullTime" checked={isFullTime} onChange={onChangeHandler} />
        <label htmlFor="isFullTime">
          <IconCheck />
          Full Time Only
        </label>
               
        <button type="submit" className='btn btn-1'>Search</button>
        </div>


      </form>
      </div>
  )
}

export default SearchBarMobile