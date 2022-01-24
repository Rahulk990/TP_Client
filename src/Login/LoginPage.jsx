import { Box } from "@mui/material";
import React, { useState } from "react";
import { LoginComponent } from "./LoginComponent";
import { RegisterComponent } from "./RegisterComponent";

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
    </Box>
  );
};

export default LoginPage;
