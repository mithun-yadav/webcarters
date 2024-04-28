"use client"
import React, { useState, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import Button from '@mui/material/Button';
import { CssBaseline, Box, Paper, Typography, TextField } from '@mui/material';
import Background from '../components/Background';


const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = '/products';
    }
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <CssBaseline />
      <Background />
      <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
        <Paper elevation={4} sx={{ padding: 4, maxWidth: 400, width: '100%', margin: 3 }}>
          <Typography variant="h5" component="h1" sx={{ textAlign: 'center', marginBottom: 3 }}>
            Login
          </Typography>
          <form onSubmit={handleLogin} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default LoginPage;


// <form onSubmit={handleLogin}>
    //   <div>
    //     <label>Username:</label>
    //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    //   </div>
    //   <div>
    //     <label>Password:</label>
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //   </div>
    //   <button type="submit">Login</button>
    // </form>