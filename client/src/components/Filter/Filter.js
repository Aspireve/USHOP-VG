import { useState } from 'react';

import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography
} from '@mui/material';

function Filtetr({ sort, handleSort, setPriceRange, setLtORgt, ltORgt, handlePriceRange, handleFilters, filters }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Typography sx={{ padding: '16px' }}>
          <h6>Sort By</h6>
          <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes('name')}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                value="name"
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Name"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes('price')}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                value="price"
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Price"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sort.includes('averageRating')}
                color="primary"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                value="averageRating"
                onChange={(e) => handleSort(e.target.value)}
              />
            }
            label="Rating"
          />

          <FormControl variant="outlined" sx={{ minWidth: 120, marginTop: '16px' }}>
            <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              onChange={(e) => handleFilters('category', e.target.value)}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Shirt">T-shirt</MenuItem>
              <MenuItem value="Pants">Pant</MenuItem>
              <MenuItem value="Vest">Vest</MenuItem>
            </Select>
          </FormControl>
          <div className="mt-4 mb-4">
            <TextField
              autoComplete="priceRange"
              name="priceRange"
              variant="outlined"
              type="number"
              required
              id="priceRange"
              placeholder="Price Range"
              label="Price Range"
              onChange={(e) => setPriceRange(e.target.value)}
            />{' '}
            <FormControlLabel
              control={
                <Checkbox
                  checked={ltORgt === 'lt'}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  value="lt"
                  onChange={(e) => setLtORgt(e.target.value)}
                />
              }
              label="Less than"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={ltORgt === 'gte'}
                  color="primary"
                  inputProps={{ 'aria-label': 'secondary checkbox' }}
                  value="gte"
                  onChange={(e) => setLtORgt(e.target.value)}
                />
              }
              label="Greater Or equal to"
            />
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={handlePriceRange}>
              Done
            </Button>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
export default Filtetr;
