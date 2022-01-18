import { createContext, useState } from "react";
import "./App.css";
import { ContactsPage } from "./Contacts";
import { LoginPage } from "./Login";

export const AuthContext = createContext();

function App() {
  const existingTokens = JSON.parse(localStorage.getItem("authToken"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens }}>
      {authTokens ? <LoginPage /> : <ContactsPage />}
    </AuthContext.Provider>
  );
}

export default App;
