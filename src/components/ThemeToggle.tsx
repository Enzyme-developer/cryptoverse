import React, { useContext } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { ThemeContext } from '../context/ThemeContext';

  
export const ThemeToggle = () => {
  //use the context
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className='py-2'>
      {theme === 'dark' ? (
        <div className='flex items-center cursor-pointer' onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
          <HiSun className='text-2xl mr-1' /> Light Mode
        </div>
      ) : (
        <div className='flex items-center cursor-pointer' onClick={()=>setTheme(theme==='dark'?'light':'dark')}>
          <HiMoon className='text-2xl mr-1' /> Dark Mode
        </div>
      )}
    </div>
  );
};