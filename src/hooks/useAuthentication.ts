import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/functions';

export function useAuthentication(url?: string) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isLoggedIn());
  const navigate = useNavigate();
  const redirectTo = url || '/';

  useEffect(() => {
    !isAuthenticated && navigate('/login');
  }, [isAuthenticated, navigate, redirectTo]);

  return { isAuthenticated, setIsAuthenticated };
}
