import React, { useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Search } from '../models/models';
import IconFilter from './IconFilter';
import IconSearch from './IconSearch';
import IconLocation from './IconLocation';
import IconCheck from './IconCheck';

interface SearchBarProps {
  formData: Search,
  setFormData: React.Dispatch<React.SetStateAction<Search>>,
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void,
  submitHandler: (e: React.ChangeEvent<HTMLFormElement>) => void,
  setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>
};

const SearchBar: React.FC<SearchBarProps> = ({ formData, setFormData, onChangeHandler, submitHandler, setIsModalOpen }) => {
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(false);
  const { keyword, location, isFullTime } = formData;
  const { isDarkTheme } = useContext(GlobalContext);
  const [responsiveText, setResponsiveText] = useState({
    placeholder: 'Filter by title, companies, expertise...',
    labelText: 'Full Time Only'
  });


  useEffect(() => {
    //Determine if Mobile Device
    const updateMobileScreen = () => {
      setIsMobileScreen(window.innerWidth <= 740);
      // Check if window width is larger than 740 and modal is open, then close the modal
      if (window.innerWidth > 740) {
        setIsModalOpen(false);
      }
    };
  
    // Initial check
    updateMobileScreen();

  
    // Event listener for window resize
    window.addEventListener('resize', updateMobileScreen);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', updateMobileScreen);
    };
  }, [setIsModalOpen]);

  useEffect(() => {
    //Update text input placeholder text based on screen size
    const updatePlaceholder = () => {
      const isTablet = window.innerWidth <= 1110;
     
      setResponsiveText(prevState => ({
        ...prevState,
        placeholder: isTablet ? 'Filter by title...' : 'Filter by title, companies, expertise...',
        labelText: isTablet ? 'Full Time' : 'Full Time Only'
      }))
     
    };

    updatePlaceholder();

    window.addEventListener('resize', updatePlaceholder);
    
    //Cleanup function to unsubscribe from event listeners
    return () => {
      window.removeEventListener('resize', updatePlaceholder)
    }
  }, []);


  //Separate submit handler function for mobile devices
  const handleSubmit = (e:any) => {
    submitHandler(e);
  }



  return (
    <form className={`searchbar-wrapper container-lg ${isDarkTheme ? 'dark-theme' : ''}`
    } onSubmit={submitHandler}>
      <label htmlFor='keyword' className="input-wrapper keyword-input">
        <div className='keyword-icon-container'>
          {isMobileScreen ? <>
            <div className='filter-icon-wrapper' onClick={() => setIsModalOpen(true)}><IconFilter /> </div><div className='search-icon-container' onClick={(e)=>handleSubmit(e)}>
              <IconSearch isMobileScreen={isMobileScreen} /></div>
          </> : <IconSearch isMobileScreen={isMobileScreen} />}
        </div>
        
        <input type="text" name="keyword" id="keyword" placeholder={responsiveText.placeholder}
          value={keyword}
          onChange={onChangeHandler}
        />
      </label>
    
      <label htmlFor='location' className={`input-wrapper location-input ${isMobileScreen ? 'invisible' : ''}`}>
        <IconLocation />
        <input type="text" name="location" id="location" placeholder='Filter by location...'
          value={location}
          onChange={onChangeHandler}
        />
      </label>
      <div className={`input-wrapper fulltime-input ${isMobileScreen ? 'invisible' : ''}`}>
        <input type="checkbox" name="isFullTime" id="isFullTime" checked={isFullTime} onChange={onChangeHandler} />
        <label htmlFor="isFullTime">
          <IconCheck />
          {responsiveText.labelText}
        </label>
                 
        <button type="submit" className='btn btn-1'>Search</button>
      </div>
        
    </form>
  )
};

export default SearchBar