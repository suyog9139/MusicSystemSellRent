import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const state = useSelector((state) => state.handleCart);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar navbar-light py-3 sticky-top"
      style={{ backgroundColor: "#0b1941", color: "white" }}
    >
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2  text-white" to="/">
          V M Music Systems
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/">
                Home{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/product">
                Products
              </NavLink>
            </li>
            {/* <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/about">About</NavLink>
                        </li> */}
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/contact">
                Admin
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-white" to="/contact">
                Contact
              </NavLink>
            </li>
          </ul>
          <div className="buttons text-center">
            {auth ? (
              <NavLink
                onClick={logout}
                to="/"
                className="btn btn-outline-dark m-2  text-white"
              >
                <i className="fa fa-sign-out-alt mr-1  text-white"></i> Logout
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-outline-dark m-2  text-white"
                >
                  <i className="fa fa-sign-in-alt mr-1  text-white"></i> Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn btn-outline-dark m-2  text-white"
                >
                  <i className="fa fa-user-plus mr-1  text-white"></i> Register
                </NavLink>
              </>
            )}
            {/* {auth? null:<NavLink to="/register" className="btn btn-outline-dark m-2  text-white"><i className="fa fa-user-plus mr-1  text-white"></i> Register</NavLink>} */}
            {/* <NavLink to="/register" className="btn btn-outline-dark m-2  text-white"><i className="fa fa-user-plus mr-1  text-white"></i> Register</NavLink> */}

            <NavLink
              to="/cart"
              className="btn btn-outline-dark m-2  text-white"
            >
              <i className="fa fa-cart-shopping mr-1  text-white"></i> Cart (
              {state.length}){" "}
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
