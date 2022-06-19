import { useCallback, useState, ReactNode, createContext } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (user: string, pass: string) => ({}),
  logout: () => {},
});

interface IProps {
  children: ReactNode;
}

export interface LoginReturnT {
  status?: string;
  message?: string;
}

export const AuthContextProvider = ({ children }: IProps) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const isLoggedIn = !!token;

  const login = useCallback((user: string, pass: string) => {
    // logica de login
    if (user === '' && pass === '') {
      localStorage.setItem('token', 'token_valido');
      setToken('token_valido');
    } else
      return {
        status: 'FAILED',
        message:
          'INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS INVALID CREDENTIALS ',
      } as LoginReturnT;
    return {
      status: 'SUCCESS',
    } as LoginReturnT;
  }, []);

  const logout = useCallback(() => {
    setToken('');
  }, []);

  const initValue = {
    token,
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={initValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
