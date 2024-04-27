import { styled, Card, CardMedia } from '@mui/material';

export const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== 'focused',
})<{ focused: boolean }>(({ focused, theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: focused ? `0px 0px 15px ${theme.palette.primary.main}` : 'none', // Highlight with a shadow or change as preferred
    transition: 'box-shadow 0.3s', // Smooth transition for focus change
    outline: 'none',
}));


export const StyledCardMedia = styled(CardMedia)({
    paddingTop: '56.25%', // 16:9 aspect ratio
    backgroundSize: 'cover', // Cover ensures the image covers the designated area without distortion
});