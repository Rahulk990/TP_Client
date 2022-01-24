import { Box } from "@mui/material";
import React, { useState } from "react";
import { LoginComponent } from "./LoginComponent";
import { RegisterComponent } from "./RegisterComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const togglePage = () => setIsLogin(!isLogin);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
      }}
    >
      {isLogin ? (
        <LoginComponent togglePage={togglePage} />
      ) : (
        <RegisterComponent togglePage={togglePage} />
      )}
      <ToastContainer position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
    </Box>
  );
};

export default LoginPage;
