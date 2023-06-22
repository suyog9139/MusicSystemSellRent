import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './User.css'

const Users=()=> {
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] = useState("");

  // using Async Await
  const getMyUserData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/users");
      setMyData(res.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  // NOTE:  calling the function
  useEffect(() => {
    getMyUserData();
  }, []);


  return (
    <>
  
    <div className='heading'>
    <h1>USERS</h1>
    </div>
     
      <hr />
      {isError !== "" && <h2>{isError}</h2>}

      <div className="grid">
        {myData.map((post) => {
          const { name,phone} = post;
          return (
            <div key={name} className="card">
            <div>
              <strong>Name:</strong> {name}
            </div>
            <div>
              <strong>Phone Number:</strong> +{phone}
            </div>
          </div>
          );
        })}
      </div>
      
    </>
  );
};


export default Users;
