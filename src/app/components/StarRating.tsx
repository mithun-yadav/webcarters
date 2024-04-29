import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import Product from '../types/productInterface';
import { Box, Tooltip } from '@mui/material';

interface StarRatingProps {
  product: Product;
}

const StarRating: React.FC<StarRatingProps> = ({ product }) => {
  let color = 'green'; // Default to green if none of the conditions below apply
  const rate = product.rating.rate;
  
  if (rate >= 0 && rate < 2) {
    color = 'red';
  } else if (rate >= 2 && rate < 3) {
    color = 'orangered';
  } else if (rate >= 3 && rate < 4) {
    color = 'goldenrod';
  } else if (rate >= 4 && rate <= 5) {
    color = 'green';
  }

  return (
    <>
      <Box sx={{ textAlign: "center", color: "#fff" }}>
        <Tooltip title={`Rated ${rate} by ${product.rating.count} users`}>
          <div style={{backgroundColor:`${color}`}} className={`rounded-[100vw] px-4 py-1 text-[15px]`}>
            <span className="relative top-[1.5px]">{`${rate}`}</span>
            <span className="relative top-[-1px]"><StarIcon fontSize='small' /></span>
          </div>
        </Tooltip>
      </Box>
    </>
  );
}

export default StarRating;