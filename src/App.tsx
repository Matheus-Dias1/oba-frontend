import { useContext, useEffect } from 'react';
import Layout from './components/Layout';
import AuthContext from './context/AuthContext';
import Login from './pages/Login';
import './styles/global.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

export function App() {
  const authCtx = useContext(AuthContext);

  return (
    <QueryClientProvider client={queryClient}>
      {authCtx.isLoggedIn ? <Layout /> : <Login />}
    </QueryClientProvider>
  );
}
