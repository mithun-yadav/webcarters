"use client"
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { Grid, CardContent, Typography, CardActionArea } from '@mui/material';
import { StyledCard, StyledCardMedia } from "../components/StyledComponent"; // Assuming styled components are exported


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

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));

    cardRefs.current = cardRefs.current.slice(0, products.length);
  }, [products.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = focusedIndex !== null ? focusedIndex : -1;
      let newIndex = currentIndex;

      switch (event.key) {
        case 'ArrowDown':
          newIndex = currentIndex < cardRefs.current.length - 4 ? currentIndex + 4 : currentIndex;
          break;
        case 'ArrowUp':
          newIndex = currentIndex >= 4 ? currentIndex - 4 : currentIndex;
          break;
        case 'ArrowLeft':
          newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
          break;
        case 'ArrowRight':
          newIndex = currentIndex < cardRefs.current.length - 1 ? currentIndex + 1 : currentIndex;
          break;
      }

      if (newIndex !== currentIndex && cardRefs.current[newIndex]) {
        cardRefs.current[newIndex]?.focus();
        setFocusedIndex(newIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [products, focusedIndex]);

  return (
    <Grid container spacing={4} style={{ padding: '20px' }}>
      {products.map((product, index) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
          <StyledCard
            ref={(el) => {
              if (el) cardRefs.current[index] = el;
            }}
            tabIndex={0}
            focused={index === focusedIndex}
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
