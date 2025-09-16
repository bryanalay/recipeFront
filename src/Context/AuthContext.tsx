import { createContext, ReactNode, useContext, useState, useCallback } from 'react';
import { loggedUser } from '../utils';

interface AuthContextType {
  token: string | null;
  setToken: (user: string | null) => void;
  login: (user: loggedUser, token: string) => void;
  user: loggedUser | undefined;
  logOut: () => void;
  loginModal: boolean;
  setLoginModal: (value: boolean) => void;
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setTokenState] = useState<string | null>(null);
  const [user, setUser] = useState<loggedUser>();
  const [loginModal, setLoginModalState] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModalState] = useState<boolean>(false);

  // Estabiliza las funciones con useCallback
  const setToken = useCallback((value: string | null) => {
    setTokenState(value);
  }, []);

  const setLoginModal = useCallback((value: boolean) => {
    setLoginModalState(value);
  }, []);

  const setIsOpenModal = useCallback((value: boolean) => {
    setIsOpenModalState(value);
  }, []);

  const login = useCallback((user: loggedUser, token: string) => {
    setTokenState(token);
    setUser(user);
  }, []);

  const logOut = useCallback(() => {
    setTokenState(null);
    setUser(undefined);
    localStorage.removeItem('token');
  }, []);

  console.log('AuthProvider renderizado'); // Para debug

  return (
    <AuthContext.Provider
      value={{ token, setToken, login, logOut, user, loginModal, setLoginModal, isOpenModal, setIsOpenModal }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider, useAuth };