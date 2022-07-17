import { BatchDetailI } from '../queries/batches/models';

export const getSumByOrder = (batch: BatchDetailI) => {
  const products: {
    client: string;
    items: {
      id: string;
      name: string;
      amount: number;
      unit: string;
    }[];
  }[] = [];

  batch.orders.forEach(order => {
    const client = order.client;
    const items = order.items.map(item => ({
      id: item.item._id,
      name: item.item.description,
      amount: item.amount,
      unit: item.measurementUnit,
    }));
    products.push({ client, items });
  });

  return products;
};
