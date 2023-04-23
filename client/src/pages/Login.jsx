import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";

const Login = () => {
  return (
    <>
    <div>
      <Navbar />
      <div
        className="container  my-3 py-3"
        // style={{ backgroundColor: "#b0bec5", color: "black" }}
      > 
        <h1 className="text-center fs-1">Login</h1>
        {/* <hr /> */}
        <br />
        <div class="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form>
              <div class="my-3">
                <label for="display-3">Phone</label>
                <input
                  type="email"
                  class="form-control form-control"
                  id="floatingInput"
                  placeholder="9658245215"
                />
              </div>
              {/* <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
             
                <label class="form-check-label" for="flexCheckDefault">
                  Remember Me
                </label>
              </div> */}

              <div class="my-3">
                <label for="floatingPassword display-4">Password</label>
                <input
                  type="password"
                  class="form-control form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
              </div>
              <div className="my-3 text-center text-black">
              <br />
                <p>
                  New Here?{" "}
                  <Link
                    to="/register"
                    className="text-decoration-underline text-info text-black text-center "
                  >
                    <h6>Register</h6>
                  </Link>{" "}
                </p>
              </div>
              <div className="text-center">
                <button class="my-2 mx-auto btn btn-primary btn-lg btn-block" type="submit">
                  Login
                </button>
                
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
};
export default Login;
