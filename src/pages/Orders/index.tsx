import { useInfiniteQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import ButtonRound from '../../components/ButtonRound';
import styles from './styles.module.scss';
import { getOrders } from '../../queries/orders/getOrders';
import { OrderI } from '../../queries/orders/models';
import Button from '../../components/Button';
import Spacer from '../../components/Spacer';
import Loader from '../../components/Loader';
import OrderCard from './OrderCard';

const Orders = () => {
  const [hasNextPage, setHasNextPage] = useState(false);
  const [orders, setOrders] = useState<OrderI[]>([]);
  const [_, setLocation] = useLocation();

  const { data, status, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(
      ['batches'],
      async ({ pageParam = '' }) => await getOrders(pageParam),
      {
        getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
      }
    );

  useEffect(() => {
    if (status === 'success' && !isFetching) {
      const lastPage = data.pages.length - 1;
      setHasNextPage(data.pages[lastPage].pageInfo.hasNextPage);
      setOrders(old => {
        const oldOrders = JSON.parse(JSON.stringify(old));
        if (lastPage >= 0) {
          oldOrders.push(...data.pages[lastPage].edges.map((x: any) => x.node));
          return oldOrders;
        }
        return [];
      });
    }
  }, [status, isFetching]);

  const getItems = (order: OrderI) => {
    const items: string[] = [];
    order.items.forEach(item => {
      if (!items.includes(item.item.description))
        items.push(item.item.description);
    });

    return items;
  };

  return (
    <div className={styles.container}>
      <div className={styles['add-button']}>
        <ButtonRound
          type="add"
          onClick={() => {
            setLocation('/orders/new');
          }}
        />
      </div>
      <h1>Pedidos</h1>
      <h4>Detalhes de cada pedido</h4>
      <div className={styles['order-list']}>
        {orders.map(order => (
          <div key={order._id}>
            <OrderCard
              id={order._id}
              batchNumber={order.batch.number}
              client={order.client}
              createdAt={new Date(order.createdAt)}
              deliverAt={new Date(order.deliverAt)}
              items={getItems(order)}
            />
          </div>
        ))}
      </div>
      {isFetching && (
        <div>
          <Spacer />
          <Loader color="primary" type="ellipsis" />
        </div>
      )}
      {hasNextPage && (
        <Button
          onClick={() => {
            fetchNextPage();
          }}
          loading={isFetchingNextPage}
          fit
          title="Carregar mais"
          variant="leaked"
        />
      )}
      <Spacer />
    </div>
  );
};

export default Orders;
