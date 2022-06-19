import { useContext, useEffect } from 'react';
import Layout from './components/Layout';
import AuthContext from './context/AuthContext';
import Login from './pages/Login';
import './styles/global.scss';

export function App() {
  const authCtx = useContext(AuthContext);

  return <>{authCtx.isLoggedIn ? <Layout /> : <Login />}</>;
}
