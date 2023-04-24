import React from 'react';

import { useAuthentication } from '../hooks/useAuthentication';
import Table from '../components/table/table';
import Button from '../components/button';
import LinkButton from '../components/linkButton';
import { createUseStyles } from 'react-jss';

const Home = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthentication();
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      <div className={classes.container}>
        {isAuthenticated && <Button title='Log Out' onClick={handleLogout} />}
        <LinkButton title='Create Joke' path='/jokes/new' />
      </div>
      <Table />
    </>
  );
};

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export default Home;
