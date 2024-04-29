"use client"
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { AppBar, Toolbar, Hidden, IconButton, Typography, Button } from '@mui/material';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="pb-[1rem] mb-[3rem]">
      <div className='fixed w-full z-[1000]'>
        <AppBar position="static" >
          <Toolbar>
            <Hidden mdUp>
              <IconButton color="inherit" aria-label="menu">
                {/* <MenuIcon /> */}
              </IconButton>
            </Hidden>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              WebCarters
            </Typography>
            {isAuthenticated() ? (
              <Button color="inherit" onClick={logout}>Logout</Button>
            ) : (
              <Button color="inherit" href="/login">Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Header;
