import { useState } from 'react';
import { useLocation } from 'wouter';
import ButtonRound from '../../components/ButtonRound';
import OrderCard from './OrderCard';
import styles from './styles.module.scss';

const MOCK_ORDERS = [
  {
    client: 'Cliente X',
    batch: 3,
    createdAt: new Date(),
    deliveryAt: new Date(),
    items: [
      {
        description: 'banana',
        amount: '30 kg',
      },
      {
        description: 'maça',
        amount: '20 un',
      },
      {
        description: 'cebola',
        amount: '30 kg',
      },
      {
        description: 'banana',
        amount: '30 kg',
      },
      {
        description: 'maça',
        amount: '20 un',
      },
      {
        description: 'cebola',
        amount: '30 kg',
      },
      {
        description: 'banana',
        amount: '30 kg',
      },
      {
        description: 'maça',
        amount: '20 un',
      },
      {
        description: 'cebola',
        amount: '30 kg',
      },
      {
        description: 'banana',
        amount: '30 kg',
      },
      {
        description: 'maça',
        amount: '20 un',
      },
      {
        description: 'cebola',
        amount: '30 kg',
      },
    ],
  },
];

const Orders = () => {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [_, setLocation] = useLocation();

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
          <div key={`${order.batch}-${order.createdAt.getTime()}`}>
            <OrderCard
              batch={`${order.batch}-${order.createdAt.getTime()}`}
              batchNumber={order.batch}
              client={order.client}
              createdAt={order.createdAt}
              deliverAt={order.deliveryAt}
              items={order.items}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
