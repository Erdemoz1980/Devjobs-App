import React from 'react';
import IconMoon from './IconMoon';
import IconSun from './IconSun';
import { Switcher } from '../models/models';

interface SwitchBoxProps extends Switcher {}


const SwitchBox: React.FC<SwitchBoxProps> = ({isDarkTheme, setIsDarkTheme}) => {
  

  return (
    <div className='switchbox-wrapper'>
      <IconSun />
      <input type="checkbox" name="theme-switch" id="theme-switch" checked={isDarkTheme} onChange={() => setIsDarkTheme(prevState => !prevState)} />
      <label htmlFor="theme-switch">
      </label>
      <IconMoon />
    </div>
  )
};

export default SwitchBox