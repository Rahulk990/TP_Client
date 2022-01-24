import { Box, Divider } from "@mui/material";
import React from "react";
import { LoginComponent } from "./LoginComponent";
import { RegisterComponent } from "./RegisterComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        margin: 10,
      }}
    >
      <LoginComponent />
      <Divider style={{ height: "auto" }} orientation="vertical" flexItem />
      <RegisterComponent />
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
