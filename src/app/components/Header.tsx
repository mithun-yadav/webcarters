import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <nav>
        {isAuthenticated() ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
