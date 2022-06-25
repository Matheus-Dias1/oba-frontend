import styles from './styles.module.scss';
import Batches from '../../../assets/icons/nav/batches.svg';
import Orders from '../../../assets/icons/nav/orders.svg';
import Products from '../../../assets/icons/nav/products.svg';
import Logout from '../../../assets/icons/nav/logout.svg';
import { Link, useLocation } from 'wouter';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';

const SideNav = () => {
  const [location] = useLocation();
  const authCtx = useContext(AuthContext);

  return (
    <div className={styles.nav}>
      <Link href="/batches">
        <button data-active={location === '/batches'}>
          <Batches />
        </button>
      </Link>
      <Link href="/orders">
        <button data-active={location === '/orders'}>
          <Orders />
        </button>
      </Link>
      <Link href="/products">
        <button data-active={location === '/products'}>
          <Products />
        </button>
      </Link>
      <button
        style={{ marginTop: 'auto' }}
        onClick={() => {
          authCtx.logout();
        }}
      >
        <Logout />
      </button>
    </div>
  );
};

export default SideNav;
