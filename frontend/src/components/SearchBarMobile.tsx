import React from 'react';
import IconCheck from './IconCheck';
import IconLocation from './IconLocation';

interface SearchBarMobileProps {
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isFullTime: boolean,
  location: string,
  responsiveText: {
    placeholder: string,
    labelText:string
  }
}

const SearchBarMobile:React.FC<SearchBarMobileProps> = ({onChangeHandler, isFullTime, location, responsiveText}) => {
  return (
    <div className='searchbar-wrapper-mobile'>
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
          {responsiveText.labelText}
        </label>
               
        <button type="submit" className='btn btn-1'>Search</button>
        </div>


    </div>
  )
}

export default SearchBarMobile