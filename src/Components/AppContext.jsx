import { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {

  const [showAuth, setShowAuth] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const[userDetails,setUserDetails] = useState(null);
  const apiUrl = "https://hostel-stuff-backend.onrender.com";

  const value = {
    showAuth,
    setShowAuth,
    showLogin,
    setShowLogin,
    userDetails,
    setUserDetails,
    apiUrl
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppContextProvider;
