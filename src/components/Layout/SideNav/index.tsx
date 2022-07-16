import styles from './styles.module.scss';
import Batches from '../../../assets/icons/nav/batches.svg';
import Orders from '../../../assets/icons/nav/orders.svg';
import Products from '../../../assets/icons/nav/products.svg';
import Logout from '../../../assets/icons/nav/logout.svg';
import { useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import NavContext, { PagesEnum } from '../../../context/NavContext';

const TAB_PAGES = {
  batch: [PagesEnum.BATCHES, PagesEnum.BATCH_DETAILS],
  order: [PagesEnum.ORDERS, PagesEnum.EDIT_ORDER],
  product: [PagesEnum.PRODUCTS, PagesEnum.EDIT_PRODUCT],
}

const SideNav = () => {
  const navCtx = useContext(NavContext);
  const authCtx = useContext(AuthContext);


  return (
    <div className={styles.nav}>
      <div onClick={() => {
        navCtx.setLocation({
          page: PagesEnum.BATCHES
        })
      }}>
        <button data-active={TAB_PAGES.batch.includes(navCtx.location.page)}>
          <Batches />
        </button>
      </div>
      <div onClick={() => {
        navCtx.setLocation({
          page: PagesEnum.ORDERS
        })
      }}>
        <button data-active={TAB_PAGES.order.includes(navCtx.location.page)}>
          <Orders />
        </button>
      </div>
      <div onClick={() => {
        navCtx.setLocation({
          page: PagesEnum.PRODUCTS
        })
      }}>
        <button data-active={TAB_PAGES.product.includes(navCtx.location.page)}>
          <Products />
        </button>
      </div>
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
