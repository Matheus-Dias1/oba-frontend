import { BatchDetailI } from '../queries/batches/models';

export const getSumByProduct = (batch: BatchDetailI) => {
  const products: {
    item: string;
    clients: {
      name: string;
      amount: number;
      unit: string;
    }[];
  }[] = [];

  batch.orders.forEach(order => {
    const client = order.client;
    order.items.forEach(item => {
      const prodIndex = products.findIndex(
        p => p.item === item.item.description
      );
      const orderItem = {
        name: client,
        amount: item.amount,
        unit: item.measurementUnit,
      };
      if (prodIndex >= 0) {
        products[prodIndex].clients.push(orderItem);
      } else {
        products.push({
          item: item.item.description,
          clients: [orderItem],
        });
      }
    });
  });

  return products.sort((a, b) => {
    const A: string = a.item.toLowerCase();
    const B: string = b.item.toLowerCase();

    return A.localeCompare(B);
  });
};
