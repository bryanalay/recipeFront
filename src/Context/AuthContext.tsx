import { createContext, ReactNode, useContext, useState } from "react";
import { loggedUser } from "../utils";

interface AuthContextType {
  token: string | null;
  setToken: (user: string | null) => void;
  login: (user: loggedUser, token: string) => void;
  user: loggedUser | undefined;
  logOut: () => void;
  loginModal: boolean;
  setLoginModal: (value: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) =>{
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<loggedUser>();
  const [loginModal, setLoginModal] = useState<boolean>(false);
  
  const login = (user:loggedUser, token: string)=>{
    setToken(token);
    setUser(user);
  }



  const logOut = () => {
    setToken(null);
    setUser(undefined);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, setToken, login, logOut, user, loginModal,setLoginModal }}>
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () =>{
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AuthProvider, useAuth };