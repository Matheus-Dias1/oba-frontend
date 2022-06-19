import { useContext, useEffect, useState } from 'react';
import Button from '../../components/Button';
import styles from './styles.module.scss';
import logo from '../../assets/visuals/logo.png';
import cover from '../../assets/visuals/login-image.png';
import CloseIcon from '../../assets/icons/window/close.svg';
import { WindowAction } from '../../../electron/types';
import AuthContext from '../../context/AuthContext';

const Login = () => {
  const authCtx = useContext(AuthContext);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    // setLoading(true);
    authCtx.login(user, password);
    // setLoading(false);
  };

  return (
    <>
      <div className={styles.dragable}></div>
      <button
        className={styles['close-button']}
        onClick={() => {
          window.Main.resizeWindow(WindowAction.CLOSE);
        }}
      >
        <CloseIcon className={styles.icon} />
      </button>
      <div className={styles.container}>
        <div className={styles['login-area']}>
          <img src={logo} alt="oba logo" />
          <form
            onSubmit={e => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              value={user}
              placeholder="Usuário"
              onChange={e => {
                setUser(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
            <Button loading={loading} title={'Entrar'} onClick={handleLogin} />
          </form>
        </div>
        <img src={cover} alt="" className={styles.cover} />
      </div>
    </>
  );
};

export default Login;
