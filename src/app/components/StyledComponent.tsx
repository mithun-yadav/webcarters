import { styled, Card, CardMedia, Typography, Tooltip } from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  outline: 'none',  // Removes browser's default focus style
  margin: 10,  // Increases spacing around each card
  padding: 10,  // Adds padding within each card for better spacing
  backgroundColor: '#fff',  // Ensures the card background is white for a clean look
  '&:focus-visible': {  // CSS pseudo-class for when an element is focused via the keyboard
    boxShadow: `0 0 12px 2px rgba(128, 128, 128, 0.8)`,  // Soft grey shadow for focus
    transform: 'scale(1.05)'  // Slightly scale up the card
  }
}));

const StyledCardMedia = styled(CardMedia)({
  paddingTop: '56.25%',  // 16:9 aspect ratio
  backgroundSize: 'contain'
});

const ProductName = styled((props: { title: string; children?: React.ReactNode; }) => (
  <Tooltip title={props.title} placement="top"><Typography {...props} /></Tooltip>
))({
  fontWeight: 'bold',
  fontSize: '1.25rem',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const ProductDescription = styled((props: { title: string; children?: React.ReactNode; }) => (
  <Tooltip title={props.title} placement="top"><Typography {...props} /></Tooltip>
))({
  fontSize: '1rem',
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  color: '#666',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: 10
});

const ProductPrice = styled(Typography)({
  fontWeight: 'bold',
  color: '#4CAF50',
  fontSize: '1.2rem'
});

// Export all styled components at the end of the file
export { StyledCard, StyledCardMedia, ProductName, ProductDescription, ProductPrice };
