import { Route, Switch, useLocation } from 'wouter';
import Batches from '../../pages/Batches';
import Orders from '../../pages/Orders';
import Products from '../../pages/Products';
import { TitleBar } from './TitleBar';
import styles from './styles.module.scss';
import SideNav from './SideNav';
import { useEffect } from 'react';

const Layout = () => {
  const [_, setLocation] = useLocation();
  useEffect(() => {
    setLocation('/batches');
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
            <Route path="/products">
              <Products />
            </Route>
            <Route path="/orders">
              <Orders />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default Layout;
