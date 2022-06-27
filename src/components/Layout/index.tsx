import { Route, Switch, useLocation } from 'wouter';
import Batches from '../../pages/Batches';
import Orders from '../../pages/Orders';
import Products from '../../pages/Products';
import { TitleBar } from './TitleBar';
import styles from './styles.module.scss';
import SideNav from './SideNav';
import { useEffect } from 'react';
import BatchDetails from '../../pages/Batches/BatchDetails';
import { getRandomID } from '../../utils/randomID';
import Order from '../../pages/Orders/Order';

const Layout = () => {
  const [_, setLocation] = useLocation();
  useEffect(() => {
    setLocation(`/orders`);
  }, []);

  return (
    <div className={styles.container}>
      <TitleBar />
      <div className={styles.content}>
        <SideNav />
        <main>
          <Switch>
            <Route path="/batches">
              <Batches />
            </Route>
            <Route path="/batches/:id">
              {params => <BatchDetails id={params.id} />}
            </Route>
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
            <Route path="/orders/:id">
              {params => <Order id={params.id} />}
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Layout;
