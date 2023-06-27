import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
import { Container } from '@chakra-ui/react';

const UpdateProduct = () => {
  const [NewproductName, setNewProductName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [Description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [productName,setproductName]= useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async () => {
    try {
      const {
        data: { success },
      }= await axios.put(
        `http://localhost:4000/api/v1/product/UpdateProduct/${productName}`, 
        {
          Title: NewproductName,
          Stock: stock,
          price: price,
          Description: Description
        },
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      if(success){
        console.log('Data updated successfully');
        setNewProductName('');
        setPrice('');
        setStock('');
          setDescription('');
      setImage(null);
      }
      

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f1f1f1' }}>
    <Container maxWidth="sm" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#ffff' }}>  
    <form onSubmit={handleSubmit}>
  <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ textAlign: 'center'}}>
  <Grid item xs={12}>
      <TextField
        fullWidth
        label="productName"
        value={productName}   
        onChange={(e) => setproductName(e.target.value)}     
        required
        sx={{ width: '400px' }} // Custom style to reduce the width
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="NewproductName"
        value={NewproductName}
        onChange={(e) => setNewProductName(e.target.value)}
        required
        sx={{ width: '400px' }} // Custom style to reduce the width
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        sx={{ width: '400px' }} // Custom style to reduce the width
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
        sx={{ width: '400px' }} // Custom style to reduce the width
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Description"
        value={Description}
        onChange={(e) => setDescription(e.target.value)}
        required
        sx={{ width: '400px' }} // Custom style to reduce the width
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
</Container>
</div>
  );
};

export default UpdateProduct;
