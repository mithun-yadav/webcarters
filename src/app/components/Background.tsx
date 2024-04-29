import { Box } from '@mui/material';
import styled from '@emotion/styled';

const Background = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: "url('https://img.freepik.com/free-vector/gradient-minimalist-background_23-2150012301.jpg?w=1380&t=st=1714326854~exp=1714327454~hmac=ba42874d40cc0f949db425f915f7415d330e18638119bbcfd0fbbbc8baba155d') no-repeat center center fixed", 
  backgroundSize: 'cover',
  zIndex: -1,
  animation: 'float 5s ease-in-out infinite',
  '@keyframes float': {
    '0%': {
      transform: 'scale(1)'
    },
    '50%': {
      transform: 'scale(1.1)'
    },
    '100%': {
    transform: 'scale(1)'
    }
  }
});

export default Background;
