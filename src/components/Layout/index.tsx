import Batches from '../../pages/Batches';
import Orders from '../../pages/Orders';
import Products from '../../pages/Products';
import { TitleBar } from './TitleBar';
import styles from './styles.module.scss';
import SideNav from './SideNav';
import BatchDetails from '../../pages/Batches/BatchDetails';
import Order from '../../pages/Orders/Order';
import Product from '../../pages/Products/Product';
import { useContext } from 'react';
import NavContext, { PagesEnum } from '../../context/NavContext';

const Layout = () => {
  const navCtx = useContext(NavContext);
  const location = navCtx.location;

  const getPage = () => {
    switch (location.page) {
      case PagesEnum.BATCHES:
        return <Batches />;
      case PagesEnum.BATCH_DETAILS:
        return <BatchDetails id={location.id!} />
      case PagesEnum.ORDERS:
        return <Orders />
      case PagesEnum.EDIT_ORDER:
        return <Order id={location.id!} />
      case PagesEnum.PRODUCTS:
        return <Products />
      case PagesEnum.EDIT_PRODUCT:
        return <Product id={location.id!} />
    }
  }

  return (
    <div className={styles.container}>
      <TitleBar />
      <div className={styles.content}>
        <SideNav />
        <main>
          {getPage()}
        </main>
      </div>
    </div>
  );
};

export default Layout;
