import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ ...rest }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  return !userInfo ? ( <Navigate to="/login" />
  ) : userInfo.role !== "admin" ? ( <Navigate to="/" />
  ) : ( <Outlet {...rest} />
  );
};

export default AdminRoute;
