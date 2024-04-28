import { Checkbox, FormGroup, FormControlLabel, Slider, Typography } from '@mui/material';
import { useState } from 'react';

interface FilterMenuProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onPriceChange: (priceRange: [number, number]) => void;
  onRatingChange: (rating: number) => void;
}

export function FilterMenu({ categories, onCategoryChange, onPriceChange, onRatingChange }: FilterMenuProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Adjust max price as needed
  const [rating, setRating] = useState<number>(0);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.target.name;
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
    onCategoryChange(category);
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
    onPriceChange(newValue as [number, number]);
  };

  const handleRatingChange = (event: Event, newValue: number | number[]) => {
    setRating(newValue as number);
    onRatingChange(newValue as number);
  };

  return (
    <div>
      <Typography variant="h6">Filter by Category</Typography>
      <FormGroup>
        {['All', ...categories].map((category, index) => (
          <FormControlLabel
            control={<Checkbox checked={selectedCategories.includes(category)} onChange={handleCategoryChange} name={category} />}
            label={category}
            key={index}
          />
        ))}
      </FormGroup>
      <Typography variant="h6">Price Range</Typography>
      <Slider
        value={priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000} // Set this dynamically if possible
      />
      <Typography variant="h6">Rating</Typography>
      <Slider
        value={rating}
        onChange={handleRatingChange}
        valueLabelDisplay="auto"
        min={0}
        max={5}
        step={0.5}
      />
    </div>
  );
}
