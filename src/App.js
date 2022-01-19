import { createContext, useState } from "react";
import "./App.css";
import { ContactsPage } from "./Contacts";
import { LoginPage } from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";

export const AuthContext = createContext();

const App = () => {
  const existingTokens = localStorage.getItem("authToken");
  const [authTokens, setAuthTokens] = useState(existingTokens);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens }}>
      {authTokens ? <ContactsPage /> : <LoginPage />}
    </AuthContext.Provider>
  );
};

export default App;
