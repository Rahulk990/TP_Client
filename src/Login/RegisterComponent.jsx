import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { registerUser } from "../utils/APIUtils";
import { useAuth } from "../utils/contextUtils";
import { setLocalAuthTokens } from "../utils/localStorageUtils";
import { ERROR_EMAIL_EXISTS } from "../utils/globalConstants";
import {
  validateEmail,
  validateFullName,
  validatePassword,
} from "../utils/validatorUtil";

const STATE_REGISTER_DATA = {
  fullName: "",
  email: "",
  passwordHash: "",
};

const STATE_REGISTER_ERROR = {
  fullName: null,
  email: null,
  passwordHash: null,
};

const RegisterComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [registerData, setRegisterData] = useState(STATE_REGISTER_DATA);
  const [registerError, setRegisterError] = useState(STATE_REGISTER_ERROR);
  const { setAuthTokens } = useAuth();

  const changeHandler = (prop) => (event) => {
    setRegisterError({ ...registerError, [prop]: null });
    setRegisterData({ ...registerData, [prop]: event.target.value });
  };

  const validate = () => {
    const fullNameError = validateFullName(registerData.fullName);
    const emailError = validateEmail(registerData.email);
    const passwordError = validatePassword(registerData.passwordHash);

    if (emailError || passwordError || fullNameError) {
      setRegisterError({
        fullName: fullNameError,
        email: emailError,
        passwordHash: passwordError,
      });
      return false;
    }

    return true;
  };

  const registerHandler = () => {
    if (validate()) {
      registerUser(registerData).then((res) => {
        if (res === ERROR_EMAIL_EXISTS) {
          setRegisterError({ ...registerError, email: ERROR_EMAIL_EXISTS });
        } else {
          setLocalAuthTokens(res);
          setAuthTokens(res);
        }
        setTimeout(() => setIsLoading(false), 1000);
      });
      setIsLoading(true);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          width: "300px",
        }}
      >
        <h1>Register</h1>
        <TextField
          style={{ width: "100%" }}
          error={!!registerError.fullName}
          label="Full Name"
          value={registerData.fullName}
          onChange={changeHandler("fullName")}
          helperText={registerError.fullName}
        />
        <TextField
          style={{ width: "100%" }}
          error={!!registerError.email}
          label="Email"
          value={registerData.email}
          onChange={changeHandler("email")}
          helperText={registerError.email}
        />
        <TextField
          style={{ width: "100%" }}
          error={!!registerError.passwordHash}
          label="Password"
          type="password"
          value={registerData.passwordHash}
          onChange={changeHandler("passwordHash")}
          helperText={registerError.passwordHash}
        />

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" onClick={registerHandler}>
            Sign Up
          </Button>
        )}
      </Box>
    </div>
  );
};

export { RegisterComponent };
