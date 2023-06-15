import React, { useState } from 'react';
import axios from 'axios';
import { Button, Grid, TextField } from '@mui/material';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [stock,SetStock]=useState('')
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const {
        data: { success },
      } = await axios.post(
        "http://localhost:4000/api/v1/product/AddProduct",
        {
          Title: productName,
          Stock: stock,
          price: price,
          Description: description
        }
      );
  
      if (success) {
        console.log('Data posted successfully');
      }
  
      setProductName('');
      setPrice('');
      SetStock('');
      setDescription('');
      setImage(null);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with a status code:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Error setting up the request:', error.message);
      }
    }
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
            sx={{ width: '200px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            sx={{ width: '200px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Stock"
            value={stock}
            onChange={(e) => SetStock(e.target.value)}
            required
            sx={{ width: '200px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ width: '800px' }}
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
