import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
import { useHistory,Routes,Route,useNavigate, Navigate } from 'react-router-dom';
import { Container } from "@chakra-ui/react";
import UpdateProduct from './UpdateProduct';





const ProductAdmin = () => {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  // using Async Await
  const getMyProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/product");
      setMyData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const handleDeleteProduct = async (productid) => {
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/product/DeleteProduct/${productid}`
      );
      console.log("Product deleted successfully");
      // Perform any additional actions after successful deletion

      // Update the product list after deletion
      getMyProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // NOTE:  calling the function
  useEffect(() => {
    getMyProducts();
  }, []);





  const navigate = useNavigate();
  
  return (
    
    <>
    
    {/* <h1>Products</h1> */}
      <table>
        <thead>
          <tr>
          <th>SI Number</th>
            <th>Product Name</th>
            <th>Product Cost</th>
            <th>Stock</th>
            <th>Delete Product</th>
            <th>Update Product</th>
            <th>id</th>
          </tr>
        </thead>
        <tbody>
          {myData.map((product,index) => {
            const { _id, Title, Price, Stock } = product;
            return (
              <tr key={_id}>
              <td>{index + 1}</td>
                <td>{Title}</td>
                <td>{Price}</td>
                <td>{Stock}</td>
                <td>
                  {/* <button className="button button1">Update product</button> */}
                  <button
                    className="button button1"
                    onClick={() => handleDeleteProduct(_id)}
                  >
                    Delete product
                  </button>
                </td>
                <td>
                  {/* <button className="button button1">Update product</button> */}
                  <button
                    className="button button1"
                    onClick={()=>navigate(`/UpdateProduct`)}
                  >
                    Update product
                  </button>
                </td>
                <td>{_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ProductAdmin;
