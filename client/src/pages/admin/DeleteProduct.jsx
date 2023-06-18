import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { Container } from '@chakra-ui/react';


const DeleteProduct = ({ productName }) => {
   const [Name, setName] = useState('');
  // const [description, setDescription] = useState('');
  // const [stock,SetStock]=useState('')
  // const [price, setPrice] = useState('');
  // const [image, setImage] = useState(null);
  const handleSubmit = async () => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/product/DeleteProduct/${productName}`, // Replace with your actual delete endpoint
      );
      setName('');
      console.log('Product deleted successfully');
      // Perform any additional actions after successful deletion
    } catch (error) {
      console.error('Error deleting product:', error);
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
        onChange={(e) => setName(e.target.value)}
        required
        sx={{ width: '200px' }} // Custom style to reduce the width
      />
    </Grid>
    
    <Grid item xs={12}>
      <Button type="submit" variant="contained" color="primary">
        Delete Product
      </Button>
    </Grid>
  </Grid>
</form>
</Container>
    </div>
   
  );
};

export default DeleteProduct;
