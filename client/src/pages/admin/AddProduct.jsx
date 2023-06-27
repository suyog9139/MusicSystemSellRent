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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('Title', productName);
      formData.append('Stock', stock);
      formData.append('Price', price);
      formData.append('Description', description);
      formData.append('Image', image);

      const { data: { success } } = await axios.post(
        'http://localhost:4000/api/v1/product/AddProduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Reset form fields
      if (success) {
        setProductName('');
        setPrice('');
        setStock('');
        setDescription('');
        setImage(null);
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            onChange={handleFileChange}
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
