import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const UpdateProduct = () => {
  const [productName, setProductName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Submitted!');
    
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
      <Button type="submit" variant="contained" color="primary">
        Delete Product
      </Button>
    </Grid>
  </Grid>
</form>

  );
};

export default UpdateProduct;
