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
    {/* <h1>USERS</h1> */}
  </div>
   
  {isError !== "" && <h2>{isError}</h2>}

  <>
  <table>
    <thead>
      <tr>
        <th>SI Number</th>
        <th>Name</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
      {myData.map((user, index) => {
        const { name, phone } = user;
        return (
          <tr key={name}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>+{phone}</td>
          </tr>
        );
      })}
    </tbody>
  </table>
</>

</>
  );
};


export default Users;
