"use client"
import React, { useState,useRef, useCallback } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, CardActionArea, Modal, Box, IconButton, styled, CssBaseline, Tooltip, Rating } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { StyledCard, StyledCardMedia, ProductName, ProductDescription, ProductPrice } from '../components/StyledComponent';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/Header';
import CircularProgress from '@mui/material/CircularProgress';
import Product from '../types/productInterface';
import StarRating from '../components/StarRating';



const ModalStyle = styled(Box)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '960px',
  bgcolor: 'background.paper',
  boxShadow: '24px',
  p: 2,
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden',
  borderRadius: '8px'
});

const ProductGrid = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);
  const productRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>;  // Show loading text while checking auth state
  }

  const fetchProductData = () => {
    axios.get<Product[]>('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
        productRefs.current = new Array(response.data.length).fill(null).map((_, i) => productRefs.current[i] || null);
      })
      .catch(error => console.error('Error fetching products', error));
  }

  if (!isAuthenticated()) {
    // Optionally use router to handle redirection more gracefully
    if (typeof window !== 'undefined') {
      window.location.href = '/login';  // Redirect if not authenticated
      return null;  // Return null to ensure nothing else is rendered until redirect completes
    }
  } else {
    fetchProductData();
  }

  const handleOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    let newIndex = index;
    const totalItems = productRefs.current.length;

    switch (event.key) {
      case 'ArrowDown':
        newIndex = (index + 4) % totalItems;
        break;
      case 'ArrowUp':
        newIndex = (index - 4 + totalItems) % totalItems;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + totalItems) % totalItems;
        break;
      case 'ArrowRight':
        newIndex = (index + 1) % totalItems;
        break;
      case 'Enter':
      case ' ':
        handleOpen(products[index]);
        break;
      case 'Escape':
        handleClose();
        return;
    }

    // Focus the new index
    productRefs.current[newIndex]?.focus();
  };

  return (
    <div>
      <Header />
      <div className='container mx-auto'>
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <StyledCard
                ref={(node: HTMLDivElement | null) => { if (node) productRefs.current[index] = node }}
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onClick={() => handleOpen(product)}
                style={{ cursor: 'pointer' }}
              >
                <CardActionArea>
                  <StyledCardMedia
                    image={product.image}
                    title={product.title}
                  />
                  <ProductName title={product.title}>{product.title}</ProductName>
                  <ProductDescription title={product.description}>{product.description}</ProductDescription>
                  <div className='flex items-center mt-[1rem]' >
                    <ProductPrice sx={{ display: 'inline-block', alignItems: 'center', width: "68%"}}><span>${product.price.toFixed(2)}</span></ProductPrice>
                    <StarRating product={product} />
                  </div>

                </CardActionArea>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </div>
      {selectedProduct && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="product-modal-title"
          aria-describedby="product-modal-description"
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 'auto', maxWidth: '800px', bgcolor: 'background.paper', boxShadow: 24, p: 4, display: 'flex', flexDirection: 'row' }}>
            <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
            <CardMedia
              component="img"
              sx={{ width: 250, height: 250, m: 2 }}
              image={selectedProduct.image}
              alt={selectedProduct.title}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 2 }}>
              <Typography variant="h4" component="h2">{selectedProduct.title}</Typography>
              <Typography>{selectedProduct.description}</Typography>
              <div className="flex align-center justify-between mt-[1rem]">
              <ProductPrice>${selectedProduct.price.toFixed(2)}</ProductPrice>
              <StarRating product={selectedProduct}/>
              </div>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ProductGrid;
