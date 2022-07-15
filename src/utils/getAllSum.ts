import { BatchDetailI } from '../queries/batches/models';

export const getAllSum = (batch: BatchDetailI) => {
  const products: {
    id?: string;
    item: string;
    amount: number;
    unit: string;
  }[] = [];

  batch.orders.forEach(order => {
    order.items.forEach(item => {
      const prodIndex = products.findIndex(p => p.id === item.item._id);
      let amount = item.amount;
      if (item.measurementUnit !== item.item.defaultMeasurementUnit) {
        const conv = item.item.conversions.find(
          c => c.measurementUnit === item.measurementUnit
        );
        amount = amount / conv!.oneDefaultEquals;
      }
      if (prodIndex >= 0) {
        products[prodIndex].amount += amount;
      } else {
        products.push({
          id: item.item._id,
          item: item.item.description,
          amount: amount,
          unit: item.item.defaultMeasurementUnit,
        });
      }
    });
  });

  return products;
};
