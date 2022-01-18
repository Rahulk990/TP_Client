import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAuthTokens } = useContext(AuthContext);

  const signInHandler = () => {
    console.log(email, password);
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
        <h1>Sign In</h1>
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
        <Button variant="contained" onClick={signInHandler}>
          Sign In
        </Button>
      </Box>
    </div>
  );
};

export { LoginComponent };
