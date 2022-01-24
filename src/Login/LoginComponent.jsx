import { Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { loginUser } from "../utils/APIUtils";
import { useAuth } from "../utils/contextUtils";
import { setLocalAuthTokens } from "../utils/localStorageUtils";
import { ERROR_WRONG_CREDENTIALS } from "../utils/globalConstants";
import { validateEmail, validatePassword } from "../utils/validatorUtil";

const STATE_LOGIN_DATA = {
  email: "",
  password: "",
};

const STATE_LOGIN_ERROR = {
  email: null,
  password: null,
};

const LoginComponent = ({ togglePage }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState(STATE_LOGIN_DATA);
  const [loginError, setLoginError] = useState(STATE_LOGIN_ERROR);
  const { setAuthTokens } = useAuth();

  const changeHandler = (prop) => (event) => {
    setLoginError({ ...loginError, [prop]: null });
    setLoginData({ ...loginData, [prop]: event.target.value });
  };

  const validate = () => {
    const emailError = validateEmail(loginData.email);
    const passwordError = validatePassword(loginData.password, false);

    if (emailError || passwordError) {
      setLoginError({
        email: emailError,
        password: passwordError,
      });
      return false;
    }

    return true;
  };

  const signInHandler = () => {
    if (validate()) {
      loginUser(loginData).then((res) => {
        if (!res) {
          return;
        } else if (res === ERROR_WRONG_CREDENTIALS) {
          setLoginError({
            email: ERROR_WRONG_CREDENTIALS,
            password: ERROR_WRONG_CREDENTIALS,
          });
        } else {
          setLocalAuthTokens(res.token);
          setAuthTokens(res.token);
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
        <h1>Sign In</h1>
        <TextField
          style={{ width: "100%" }}
          error={!!loginError.email}
          label="Email"
          value={loginData.email}
          onChange={changeHandler("email")}
          helperText={loginError.email}
        />
        <TextField
          style={{ width: "100%" }}
          error={!!loginError.password}
          label="Password"
          type="password"
          value={loginData.password}
          onChange={changeHandler("password")}
          helperText={loginError.password}
        />

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button variant="contained" onClick={signInHandler}>
            Sign In
          </Button>
        )}

        <p>
          New User? Click{" "}
          <span className="link" onClick={togglePage}>
            Here
          </span>{" "}
          to Register
        </p>
      </Box>
    </div>
  );
};

export { LoginComponent };
