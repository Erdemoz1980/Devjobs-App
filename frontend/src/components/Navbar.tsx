import React from 'react';
import {  Link } from 'react-router-dom';
import SwitchBox from './SwitchBox';

const Navbar:React.FC = () => {
  return (
    <div className='navbar-wrapper'>
      <div className="triangle"></div>
      <div className="triangle"></div>
      <div className="triangle"></div>
      <div className="navbar-body container-lg">
        <Link to='/'>
          <h1 className='navbar-title size-h1'>Home</h1>
        </Link>
         <SwitchBox />
      </div>
    </div>
  )
}

export default Navbar