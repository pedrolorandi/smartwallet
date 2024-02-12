import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ element, ...rest }) {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
}
