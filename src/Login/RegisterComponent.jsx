import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { registerUser } from "../utils/APIUtils";
import { useAuth } from "../utils/contextUtils";
import { setLocalAuthTokens } from "../utils/localStorageUtils";
import {
  ERROR_EMAIL_EXISTS,
  STATE_REGISTER_DATA,
} from "../utils/globalConstants";

const RegisterComponent = () => {
  const [registerData, setRegisterData] = useState(STATE_REGISTER_DATA);
  const [isEmailPresent, setIsEmailPresent] = useState(false);
  const { setAuthTokens } = useAuth();

  const changeHandler = (prop) => (event) => {
    setIsEmailPresent(false);
    setRegisterData({ ...registerData, [prop]: event.target.value });
  };

  const registerHandler = () => {
    registerUser(registerData).then((res) => {
      if (res === ERROR_EMAIL_EXISTS) {
        setIsEmailPresent(true);
        setRegisterData(STATE_REGISTER_DATA);
      } else {
        setLocalAuthTokens(res);
        setAuthTokens(res);
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
          value={registerData.fullName}
          onChange={changeHandler("fullName")}
        />
        <TextField
          error={isEmailPresent}
          label="Email"
          value={registerData.email}
          onChange={changeHandler("email")}
          helperText={isEmailPresent && ERROR_EMAIL_EXISTS}
        />
        <TextField
          label="Password"
          type="password"
          value={registerData.passwordHash}
          onChange={changeHandler("passwordHash")}
        />
        <Button variant="contained" onClick={registerHandler}>
          Sign Up
        </Button>
      </Box>
    </div>
  );
};

export { RegisterComponent };
