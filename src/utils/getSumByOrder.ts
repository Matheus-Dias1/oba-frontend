import { BatchDetailI } from '../queries/batches/models';

export const getSumByOrder = (batch: BatchDetailI) => {
  const products: {
    client: string;
    deliverAt: Date;
    items: {
      id: string;
      name: string;
      amount: number;
      unit: string;
    }[];
  }[] = [];

  batch.orders.forEach(order => {
    const client = order.client;
    const deliverAt = new Date(order.deliverAt);
    const items = order.items.map(item => ({
      id: item.item._id,
      name: item.item.description,
      amount: item.amount,
      unit: item.measurementUnit,
    }));
    products.push({ client, deliverAt, items });
  });

  return products.sort((a, b) => {
    if (a.deliverAt > b.deliverAt) return 1;
    if (a.deliverAt < b.deliverAt) return -1;
    return 0;
  });
};
