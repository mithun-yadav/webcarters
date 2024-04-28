"use client"
import axios from 'axios';
import { useEffect, useState, useRef, SetStateAction } from 'react';
import { Grid, CardContent, Typography, CardActionArea, SelectChangeEvent } from '@mui/material';
import { StyledCard, StyledCardMedia } from "../components/StyledComponent"; // Assuming styled components are exported


import { Select, MenuItem } from '@mui/material';
import { FilterMenu } from '../components/FilterMenu';



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
  const [categories, setCategories] = useState<string[]>([]);


  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [sortPrice, setSortPrice] = useState<string>('asc');

  const extractUniqueCategories = (products: Product[]): string[] => {
    const categories = products.map(product => product.category); // Extract categories from each product
    const uniqueCategories = Array.from(new Set(categories)); // Convert array to set to remove duplicates, then back to array
    return uniqueCategories;
  };


  useEffect(() => {
    // Simulate fetching products or use actual API call here
    const fetchedProducts: Product[] = [
      // Assuming you have some mock or fetched products here
    ];
    setProducts(fetchedProducts);
    setCategories(extractUniqueCategories(fetchedProducts));
  }, []);

  const filteredProducts = products.filter(product =>
    (categoryFilter === 'All' || product.category === categoryFilter) &&
    product.price >= priceFilter[0] && product.price <= priceFilter[1] &&
    product.rating.rate >= ratingFilter
  ).sort((a, b) => sortPrice === 'asc' ? a.price - b.price : b.price - a.price);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortPrice(event.target.value as string);
  };

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products', error));

    cardRefs.current = cardRefs.current.slice(0, products.length);
  }, [products.length]);

  const handleFocus = (newIndex:number) => {
    cardRefs.current[newIndex]?.focus();
    setFocusedIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentIndex = focusedIndex !== null ? focusedIndex : -1;
      let newIndex = currentIndex;
      switch (event.key) {
        case 'ArrowDown':
          newIndex = currentIndex < products.length - 4 ? currentIndex + 4 : currentIndex;
          break;
        case 'ArrowUp':
          newIndex = currentIndex >= 4 ? currentIndex - 4 : currentIndex;
          break;
        case 'ArrowLeft':
          newIndex = currentIndex > 0 ? currentIndex - 1 : currentIndex;
          break;
        case 'ArrowRight':
          newIndex = currentIndex < products.length - 1 ? currentIndex + 1 : currentIndex;
          break;
        default:
          return; // ignore other keys
      }

      handleFocus(newIndex);

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
    <div style={{ display: 'flex' }}>
      <FilterMenu
        categories={extractUniqueCategories(products)} // Assume you have a mechanism to determine unique categories
        onCategoryChange={setCategoryFilter}
        onPriceChange={setPriceFilter}
        onRatingChange={setRatingFilter}
      />
      <div style={{ flexGrow: 1 }}>
        <Typography variant="h4">Showing Products: {categoryFilter}</Typography>
        <Select
          value={sortPrice}
          onChange={handleSortChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
        </Select>
        <Grid container spacing={4} style={{ padding: '20px' }}>
          {products.map((product, currentIndex) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <StyledCard
                ref={(el) => {
                  if (el) cardRefs.current[currentIndex] = el;
                }}
                tabIndex={0}
                focused={currentIndex === focusedIndex}
                onClick={() => handleFocus(currentIndex)}
              // onKeyDown={(event) => handleKeyDown(event, index)}
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
      </div>
    </div>
  );
}
