import React, { useEffect, useState } from "react";
import axios from "axios";
import "./User.css";
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

  // NOTE:  calling the function
  useEffect(() => {
    getMyProducts();
  }, []);

 
  return (
    <>
      <div className="heading">
        <h1>Products</h1>
      </div>
      {isError !== "" && <h2>{isError}</h2>}

      <div className="grid">
        {myData.map((post) => {
          const { Title, Price, Stock, _id } = post;
          return (
            <div key={Title} className="card">
              <h2>
                <strong>Prodict Name :</strong>
                {Title}
              </h2>
              <h2>
                <strong>Product Cost :</strong> {Price}
              </h2>
              <h2>
                <strong>Quantity: </strong>
                {Stock}
              </h2>
              <h2>
                <strong>Product Id: </strong>
                {_id}
              </h2>
              <div className="heading1">
                <button  className="button button1">Update product</button>
                <button  className="button button1">Delete product</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default ProductAdmin;
