import React, { useEffect } from 'react';
import { useAuthentication } from '../hooks/useAuthentication';
import Button from '../components/button';
import { generateToken } from '../utils/functions';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = () => {
    localStorage.setItem('token', JSON.stringify(generateToken()));
    setIsAuthenticated(true);
  };

  return (
    <div className='Login'>
      {!isAuthenticated && <Button title='Login' onClick={handleLogin} />}
    </div>
  );
};

export default Login;
