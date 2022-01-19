import { Box, Button, TextField } from "@mui/material";
import bcrypt from "bcryptjs/dist/bcrypt";
import React, { useContext, useState } from "react";
import { AuthContext } from "../App";

const RegisterComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailPresent, setIsEmailPresent] = useState(false);

  const { setAuthTokens } = useContext(AuthContext);

  const registerHandler = () => {
    const url = "http://localhost:8080/register";
    const data = {
      fullName: name,
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
        if (data === "Email Already Exists") {
          setIsEmailPresent(true);
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
        <h1>Register</h1>
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          error={isEmailPresent}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={isEmailPresent ? "Email Already Exists" : ""}
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
