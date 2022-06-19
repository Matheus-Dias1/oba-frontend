import { useContext } from 'react';
import { TitleBar } from './components/TitleBar';
import AuthContext from './context/AuthContext';
import Login from './pages/Login';
import './styles/global.scss';

export function App() {
  const authCtx = useContext(AuthContext);

  return <>{authCtx.isLoggedIn ? <TitleBar /> : <Login />}</>;
}
