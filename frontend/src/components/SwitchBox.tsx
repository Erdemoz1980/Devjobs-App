import React, {useContext} from 'react';
import IconMoon from './IconMoon';
import IconSun from './IconSun';
import { GlobalContext } from '../context/GlobalState';

const SwitchBox: React.FC = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(GlobalContext);
  
  return (
    <div className='switchbox-wrapper'>
      <IconSun />
      <input type="checkbox" name="theme-switch" id="theme-switch" checked={isDarkTheme} onChange={setIsDarkTheme} />
      <label htmlFor="theme-switch">
      </label>
      <IconMoon />
    </div>
  )
};

export default SwitchBox