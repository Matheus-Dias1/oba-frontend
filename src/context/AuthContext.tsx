import { useCallback, useState, ReactNode, createContext } from 'react';
import { SessionResponseT } from '../queries/session/models';
import { createSession } from '../queries/session/session';
export interface LoginReturnT {
  status?: 'SUCCESS' | 'FAILED';
  message?: string;
}

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (user: string, pass: string) => ({}),
  logout: () => {},
});

interface IProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: IProps) => {
  // const [token, setToken] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const isLoggedIn = !!token;

  const login = useCallback(async (user: string, pass: string) => {
    // logica de login
    try {
      const res: SessionResponseT = await createSession(user, pass);
      localStorage.setItem('token', res.token!);
      setToken(res.token!);
      return {
        status: 'SUCCESS',
      } as LoginReturnT;
    } catch (err) {
      let message;
      if (err instanceof Error) message = err.message;
      else message = String(err);
      return {
        status: 'FAILED',
        message,
      } as LoginReturnT;
    }
  }, []);

  const logout = useCallback(() => {
    setToken('');
    localStorage.removeItem('token');
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
