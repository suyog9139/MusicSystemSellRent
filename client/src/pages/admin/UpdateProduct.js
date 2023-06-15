import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';

const UpdateProduct = (productName) => {
  const [NewproductName, setNewProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [Description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:4000/api/v1/product/UpdateProduct/${productName}`, 
        {
          Title: productName,
          Stock: stock,
          price: price,
          Description: Description
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );

      console.log('Data updated successfully');
      setNewProductName('');
      setPrice('');
      setStock('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <Grid container spacing={2} justifyContent="center" alignItems="center">
  <Grid item xs={12}>
      <TextField
        fullWidth
        label="productName"
        value={productName}        
        required
        sx={{ width: '200px' }} // Custom style to reduce the width
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="NewproductName"
        value={NewproductName}
        onChange={(e) => setNewProductName(e.target.value)}
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
        label="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
        sx={{ width: '200px' }} // Custom style to reduce the width
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Description"
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
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
        Update Product
      </Button>
    </Grid>
  </Grid>
</form>

  );
};

export default UpdateProduct;
