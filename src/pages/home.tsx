import React from 'react';

import { useAuthentication } from '../hooks/useAuthentication';
import Table from '../components/table/table';
import Button from '../components/button';
import LinkButton from '../components/linkButton';

const Home = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthentication();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <>
      {isAuthenticated && <Button title='Log Out' onClick={handleLogout} />}
      <LinkButton title='Create Joke' path='/jokes/new' />
      <Table />
    </>
  );
};

export default Home;
