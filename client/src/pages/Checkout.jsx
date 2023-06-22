import React, { useState, useEffect } from "react";
import { Footer, Navbar } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Checkout = ({ amount, img, checkoutHandler }) => {
  const [first_name, setFirst_name] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [statet, setStatet] = useState("");
  const [zip, setZip] = useState("");
  const state = useSelector((state) => state.handleCart);
  // const auth = localStorage.getItem("user");
  const auth = JSON.parse(localStorage.getItem("user"));
  const [products, setProducts] = useState([]);
  
  const completeAddress = address+" "+statet +" "+zip;

  useEffect(() => {
    var name = localStorage.getItem('user');
    var obj = JSON.parse(name);
    var name1 = obj.name;
    setFirst_name(name1);

    var number = obj.phone;
    console.log(number);
    const modifiedString = number.substring(2);
    const newstr = "+91"+modifiedString
    var number1 = newstr

    setPhone(number1);

    const product = state.map((item) => [item.title,item.price, item.qty]);
    setProducts(product);
  }, []);

  const EmptyCart = () => {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 bg-light text-center">
            <h4 className="p-3 display-5">No item in Cart</h4>
            <Link to="/" className="btn btn-outline-dark mx-4">
              <i className="fa fa-arrow-left"></i> Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const ShowCheckout = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;
    state.map((item) => {
      return (subtotal += item.price * item.qty);
    });

    state.map((item) => {
      return (totalItems += item.qty);
    });

    const checkoutHandler = async (amount) => {
      const {
        data: { key },
      } = await axios.get("http://www.localhost:4000/api/getkey");

      const {
        data: { order },
      } = await axios.post("http://localhost:4000/api/checkout", {
        amount,
      });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "VM Music System",
        description: "Buy Rent Web",
        image: "",
        order_id: order.id,
        // callback_url: "http://localhost:4000/api/paymentverification/",
        handler: async function (response) {
          const {
            data: { success },
          } = await axios.post(
            "http://localhost:4000/api/paymentverification/",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              product: products,
              customer_id: auth._id,
              address:completeAddress,
              
            }
          );
          if (success) {
            window.location.href = `http://localhost:3000/paymentsuccess?reference=${response.razorpay_payment_id}`;
          }
        },
        prefill: {
          name: first_name ,
          // email: "gaurav.kumar@example.com",
          contact: phone,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    };                  
    return (
      <>
        <div className="container py-5">
          <div className="row my-4">
            <div className="col-md-5 col-lg-4 order-md-last">
              <div className="card mb-4">
                <div className="card-header py-3 bg-light">
                  <h5 className="mb-0">Order Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Products ({totalItems})
                      <span>${Math.round(subtotal)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>${shipping}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(subtotal + shipping)}</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-7 col-lg-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h4 className="mb-0">Billing address</h4>
                </div>
                <div className="card-body">
                  <form className="needs-validation" novalidate>
                    <div className="row g-3">
                      <div className="col-12 my-1">
                        <label for="firstName" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control "
                          id="firstName"
                          placeholder=""
                          value={first_name}
                          onChange={(e) => setFirst_name(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Valid  Name is required.
                        </div>
                      </div>

                      {/* <div className="col-sm-6 my-1">
                        <label for="lastName" className="form-label">
                          Last name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder=""
                          value=""
                          required
                        />
                        <div className="invalid-feedback">
                          Valid last name is required.
                        </div>
                      </div> */}

                      <div className="col-12 my-1">
                        <label for="email" className="form-label">
                          Email
                          <span> (Optional)</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="you@example.com"
                        />
                        <div className="invalid-feedback">
                          Please enter a valid email address for shipping
                          updates.
                        </div>
                      </div>

                      <div className="col-12 my-1">
                        <label for="address" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          placeholder="1234 Main St"
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your shipping address.
                        </div>
                      </div>

                                        <div className="col-12">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number{" "}
                      <span className="text-muted"></span>
                    </label>
                                        
                        <input
                          type="tel"
                          className="form-control"
                          id="phoneNumber"
                          placeholder="Enter your phone number"
                          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                  </div>

                      <div className="col-md-5 my-1">
                        <label for="country" className="form-label">
                          Country
                        </label>
                        <br />
                        <select className="form-select" id="country" required>
                          <option value="">Choose...</option>
                          <option>India</option>
                        </select>
                        <div className="invalid-feedback">
                          Please select a valid country.
                        </div>
                      </div>

                      <div className="col-md-4 my-1">
                        <label for="state" className="form-label">
                          State
                        </label>
                        <br />
                        <select onChange={(e) => setStatet(e.target.value)}  className="form-select" id="state" required>
                          <option  value="">Choose...</option>
                          <option>Maharashtra</option>
                          <option>Karnataka</option>
                          <option>Goa</option>
                          <option>Delhi</option>
                        </select>
                        <div className="invalid-feedback">
                          Please provide a valid state.
                        </div>
                      </div>

                      <div className="col-md-3 my-1">
                        <label for="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="zip"
                          placeholder=""
                          onChange={(e) => setZip(e.target.value)}
                          required
                        />
                        <div className="invalid-feedback">
                          Zip code required.
                        </div>
                      </div>
                    </div>

                    <hr className="my-4" />

                    <button
                      type="button"
                      className="btn btn-dark btn-lg btn-block"
                      onClick={() =>
                        checkoutHandler(Math.round(subtotal + shipping))
                      }
                    >
                      Buy Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />
        {state.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
