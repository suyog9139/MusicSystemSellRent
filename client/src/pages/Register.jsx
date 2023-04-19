import React from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <Navbar />
      <div
        className="container my-3 py-3"
        // style={{ backgroundColor: "#b0bec5", color: "black" }}
      >
        <h1 className="text-center fs-1">Register</h1>
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="form my-3">
                <label for="Name">Full Name</label>
                <input
                  type="email"
                  class="form-control form-control"
                  id="Name"
                  placeholder="Enter Your Name"
                />
              </div>
              <div class="form my-3">
                <label for="Email">Email address</label>
                <input
                  type="email"
                  class="form-control form-control"
                  id="Email"
                  placeholder="name@example.com"
                />
              </div>
              <div class="form  my-3">
                <label for="Password">Password</label>
                <input
                  type="password"
                  class="form-control form-control"
                  id="Password"
                  placeholder="Password"
                />
              </div>
              <div className="my-3 black text-center">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info text-black text-center"
                  >
                    <h6>Click Here</h6>
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-primary btn-lg btn-block" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
