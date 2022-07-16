import ReactDOM from 'react-dom';
import { App } from './App';
import { AuthContextProvider } from './context/AuthContext';
import { NavContextProvider } from './context/NavContext';

ReactDOM.render(
  <AuthContextProvider>
    <NavContextProvider>
      <App />
    </NavContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
