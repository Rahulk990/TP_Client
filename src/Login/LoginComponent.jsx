import { Box, Button, TextField } from "@mui/material";
import bcrypt from "bcryptjs/dist/bcrypt";
import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isWrong, setIsWrong] = useState(false);

  const { setAuthTokens } = useContext(AuthContext);

  const signInHandler = () => {
    const url = "http://localhost:8080/login";
    const data = {
      email: email,
      passwordHash: bcrypt.hashSync(password, "$2a$10$CwTycUXWue0Thq9StjUM0u"),
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((data) => {
        if (data === "Incorrect Email or Password") {
          setIsWrong(true);
        } else {
          localStorage.setItem("authToken", data);
          setAuthTokens(data);
        }
      });
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
          error={isWrong}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={isWrong ? "Incorrect Email or Password" : ""}
        />
        <TextField
          error={isWrong}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          helperText={isWrong ? "Incorrect Email or Password" : ""}
        />
        <Button variant="contained" onClick={signInHandler}>
          Sign In
        </Button>
      </Box>
    </div>
  );
};

export { LoginComponent };
