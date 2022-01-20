import { LOCAL_STORAGE_TOKEN_KEY } from "./globalConstants";

export const getLocalAuthTokens = () => {
  localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
};

export const setLocalAuthTokens = (authToken) => {
  localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, authToken);
};

export const removeLocalAuthTokens = () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};
