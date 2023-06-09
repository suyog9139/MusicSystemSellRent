import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const AddProduct = () => {
  const [productName, setProductName,Description,SetDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted!');
    console.log('Product Name:', productName);
    console.log('Price:', price);
  };

  return (
    <form onSubmit={handleSubmit}>
  <Grid container spacing={2} justifyContent="center" alignItems="center">
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
        sx={{ width: '200px' }} // Custom style to reduce the width
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        sx={{ width: '200px' }} // Custom style to reduce the width
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Description"
        value={Description}
        onChange={(e) => SetDescription(e.target.value)}
        required
        sx={{ width: '800px' }} // Custom style to reduce the width
      />
    </Grid>
    <Grid item xs={12}>
      <input
        accept="image/*"
        id="product-image"
        type="file"
        onChange={handleImageChange}
      />
      <label htmlFor="product-image">
        <Button component="span" variant="contained" color="primary">
          Upload Image
        </Button>
      </label>
    </Grid>
    <Grid item xs={12}>
      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </Grid>
  </Grid>
</form>

  );
};

export default AddProduct;
