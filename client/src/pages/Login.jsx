import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useState, useContext, useEffect } from "react";
import PhoneInput from "react-phone-input-2";

import AuthContext from "../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  // const { setauth } = useContext(AuthContext);
  // const { setrefreshToken } = useContext(AuthContext);
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    // console.log(e)
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/login/",
        JSON.stringify({ phone, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 400) {
        alert("User not Found");
      } else if (response.status === 401) {
        alert("Invalid Credentials");
      } else {
        const accessToken = response?.data?.token;
        localStorage.setItem("token", JSON.stringify(accessToken));
        localStorage.setItem("user", JSON.stringify(response?.data?.user));

        // setauth({ accessToken });
        // setrefreshToken(response?.data?.tokens?.refresh);
        navigate(from, { replace: true });
      }
      // console.log(response.data.token);
    } catch (err) {
      console.log(err);
    }
  };

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
              <form onSubmit={handleSubmit}>
                <div class="my-3">
                  <label for="display-3">Phone</label>
                  {/* <input
                    type="Phone"
                    class="form-control form-control"
                    id="floatingInput"
                    placeholder="9658245215"
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  /> */}
                  <PhoneInput
                    country={"in"}
                    value={phone}
                    onChange={setPhone}
                    // onChange={(e) => setPhone(e.target.value)}
                    class="my-2 mx-auto btn btn-primary btn-lg btn-block w-50px"
                    required
                    autoComplete="False"
                    // onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div class="my-3">
                  <label for="floatingPassword display-4">Password</label>
                  <input
                    type="password"
                    class="form-control form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    required
                    autoComplete="False"
                    onChange={(e) => setPassword(e.target.value)}
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
                  <button
                    class="my-2 mx-auto btn btn-primary btn-lg btn-block"
                    // type="submit"
                    onClick={handleSubmit}
                  >
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
