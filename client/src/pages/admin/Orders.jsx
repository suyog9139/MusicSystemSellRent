// import React, { useEffect, useState } from 'react'
// import axios from 'axios';
// import './User.css'

// function Users() {
//   const [myData, setMyData] = useState([]);
//   const [isError, setIsError] = useState("");

//   // using Async Await
//   const Orders= async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/api/v1/order");
//       setMyData(res.data);
//     } catch (error) {
//       setIsError(error.message);
//     }
//   };

//   // NOTE:  calling the function
//   useEffect(() => {
//     getMyUserData();
//   }, []);


//   return (
//     <>
//       <h1>Orderss</h1>
//       {isError !== "" && <h2>{isError}</h2>}

//       {/* <div className="grid">
//         {myData.map((post) => {
//           const { name,phone} = post;
//           return (
//             <div key={name} className="card">
//               <h2>{name}</h2>
//               <h2>{title}</h2>
//             </div>
//           );
//         })}
//       </div> */}
//     </>
//   );
// };

// export default Orders
