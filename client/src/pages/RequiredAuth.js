import { useLocation, Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { useContext } from "react";
const RequiredAuth = () => {
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      {auth === undefined || auth === null ? (
        <Navigate to="/login" state={{ from: location }} replace />
      ) : (
        <Outlet></Outlet>
      )}
    </>
  );
};

export default RequiredAuth;