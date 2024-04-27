"use client"
import React from 'react'
import axios from 'axios';
import { useEffect, useState,useRef } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { styled } from '@mui/material/styles';


function Products() {

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const StyledCard = styled(Card)({
    height: '100%', // Ensures all cards are the same height
    display: 'flex',
    flexDirection: 'column'
  });
  
  const StyledCardMedia = styled(CardMedia)({
    paddingTop: '56.25%', // 16:9 aspect ratio
    backgroundSize: 'cover', // Cover ensures the image covers the designated area without distortion
  });
  
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));
  }, []);
  // Return your product table here

  return (
    <Grid container spacing={4} style={{ padding: '20px' }}>
      {products.map((product, index) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <StyledCard
            ref={(el) => cardRefs.current[index] = el}
            tabIndex={0}
            style={{ outline: 'none' }}
          >
            <CardActionArea>
              <StyledCardMedia
                image={product.image}
                title={product.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.description.length > 100 ? product.description.substring(0, 97) + '...' : product.description}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  Price: ${product.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Rating: {product.rating.rate} ({product.rating.count} reviews)
                </Typography>
              </CardContent>
            </CardActionArea>
          </StyledCard>
        </Grid>
      ))}
    </Grid>
  );
}

export default Products;
