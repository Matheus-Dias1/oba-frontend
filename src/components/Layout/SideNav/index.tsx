import styles from './styles.module.scss';
import Batches from '../../../assets/icons/nav/batches.svg';
import Orders from '../../../assets/icons/nav/orders.svg';
import Products from '../../../assets/icons/nav/products.svg';
import { Link, useLocation } from 'wouter';

const SideNav = () => {
  const [location] = useLocation();

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
    </div>
  );
};

export default SideNav;
