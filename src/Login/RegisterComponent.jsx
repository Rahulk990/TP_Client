import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthTokens } = useContext(AuthContext);

  const registerHandler = () => {
    console.log(name, email, password);
    // Encrypt Password
    // Send Post Request
    // Handle Tokens
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <h1>Register</h1>
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" onClick={registerHandler}>
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export { RegisterComponent };
