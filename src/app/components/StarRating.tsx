import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import Product from '../types/productInterface';
import { Box, Tooltip } from '@mui/material';

interface StarRatingProps {
  product: Product;
}

const StarRating: React.FC<StarRatingProps> = ({ product }) => {
  return (
    <>
      <Box sx={{ textAlign: "center", color: "#fff" }}>
        <Tooltip title={`Rated ${product.rating.rate} by ${product.rating.count} users`}>
          <div className='bg-[orangered] rounded-[100vw] px-4 py-1 text-[15px]'>
            <span className="relative top-[1.5px]">{`${product.rating.rate}`}</span> <span className="relative top-[-1px]"><StarIcon fontSize='small' /></span>
          </div>
        </Tooltip>
      </Box>
    </>
  );
}

export default StarRating;