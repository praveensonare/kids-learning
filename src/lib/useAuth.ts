'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const name = localStorage.getItem('userName') || '';

    setIsLoggedIn(loggedIn);
    setUserName(name);
    setIsLoading(false);

    if (!loggedIn) {
      router.push('/login');
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  return { isLoggedIn, userName, isLoading, logout };
}
