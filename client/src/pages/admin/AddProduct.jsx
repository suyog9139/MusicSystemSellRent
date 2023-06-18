import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Grid, TextField } from '@mui/material';
import ResponsiveDrawer from "./Dashboard.jsx"

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4000/api/v1/product/AddProduct",
        {
          Title: productName,
          Stock: stock,
          Price: price,
          Description: description
        }
      );

      // Reset form fields
      setProductName('');
      setPrice('');
      setStock('');
      setDescription('');
      setImage(null);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with a status code:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f1f1' }}>
  <Container maxWidth="sm" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff' }}>  
    
    
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            sx={{ width: '400px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            sx={{ width: '400px' }}
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
    </Container>
    </div>

  );
};

export default AddProduct;
