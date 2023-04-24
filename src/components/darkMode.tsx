import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

import Button from './button';

function DarkModeToggle({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const classes = useStyles();

  const handleToggleClick = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={classes.fullHeightWrapper}>
      <Button
        title={darkMode ? '🌗 Dark' : '🌞 Light'}
        className={darkMode ? classes.darkButton : classes.lightButton}
        onClick={handleToggleClick}
      />
      <div className={darkMode ? classes.darkMode : ''}>{children}</div>
    </div>
  );
}

const useStyles = createUseStyles({
  fullHeightWrapper: {
    height: '100%',
  },
  darkMode: {
    height: '100%',
    backgroundColor: '#333',
    color: '#f5f5f5',
    transition: 'background-color 0.3s ease-in-out',
  },
  darkButton: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#333',
    color: '#f5f5f5',
    transition: 'background-color 0.3s ease-in-out',
  },
  lightButton: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    color: '#333',
    transition: 'background-color 0.3s ease-in-out',
  },
});

export default DarkModeToggle;
