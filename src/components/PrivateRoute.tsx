import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthComponent";

interface PrivateRouteProps {
  element: React.ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const { token } = useAuth();

  return token ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
