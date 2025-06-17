import React from "react";
import LoginForm from "./LoginForm";
import { useAdmin } from "../../contexts/AdminContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const { state } = useAdmin();
  const {admin, loading } = state;

  if (loading) {
    return <div className="text-center py-10">Checking session...</div>;
  }

  if (admin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex justify-center items-center w-full h-dvh p-4 bg-gray-50">
      <LoginForm />
    </div>
  );
};

export default Login;
