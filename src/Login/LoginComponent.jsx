import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { loginUser } from "../utils/APIUtils";
import { useAuth } from "../utils/contextUtils";
import { setLocalAuthTokens } from "../utils/localStorageUtils";
import { ERROR_WRONG_CREDENTIALS } from "../utils/globalConstants";

const STATE_LOGIN_DATA = {
  email: "",
  passwordHash: "",
};

const LoginComponent = () => {
  const [loginData, setLoginData] = useState(STATE_LOGIN_DATA);
  const [isWrong, setIsWrong] = useState(false);
  const { setAuthTokens } = useAuth();

  const changeHandler = (prop) => (event) => {
    setIsWrong(false);
    setLoginData({ ...loginData, [prop]: event.target.value });
  };

  const signInHandler = () => {
    loginUser(loginData).then((res) => {
      if (res === ERROR_WRONG_CREDENTIALS) {
        setIsWrong(true);
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
        <h1>Sign In</h1>
        <TextField
          error={isWrong}
          label="Email"
          value={loginData.email}
          onChange={changeHandler("email")}
          helperText={isWrong && ERROR_WRONG_CREDENTIALS}
        />
        <TextField
          error={isWrong}
          label="Password"
          type="password"
          value={loginData.passwordHash}
          onChange={changeHandler("passwordHash")}
          helperText={isWrong && ERROR_WRONG_CREDENTIALS}
        />
        <Button variant="contained" onClick={signInHandler}>
          Sign In
        </Button>
      </Box>
    </div>
  );
};

export { LoginComponent };
