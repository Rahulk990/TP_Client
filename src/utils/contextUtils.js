import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const ContactContext = createContext();
export const useContact = () => {
  return useContext(ContactContext);
};
