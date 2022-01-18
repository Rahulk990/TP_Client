import { Box, Divider } from "@mui/material";
import React from "react";
import { LoginComponent } from "./LoginComponent";
import { RegisterComponent } from "./RegisterComponent";

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
      <Divider orientation="vertical" flexItem />
      <RegisterComponent />
    </Box>
  );
};

export { LoginPage };
