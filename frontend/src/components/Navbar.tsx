import React from 'react';
import SwitchBox from './SwitchBox';
import { Switcher } from '../models/models';

interface NavbarProps extends Switcher {}

const Navbar:React.FC<NavbarProps> = ({isDarkTheme ,setIsDarkTheme}) => {
  return (
    <nav className='navbar-wrapper'>
      <SwitchBox setIsDarkTheme={setIsDarkTheme} isDarkTheme={isDarkTheme} />
    </nav>
  )
}

export default Navbar