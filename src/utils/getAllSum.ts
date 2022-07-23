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
      if (
        item.measurementUnit.toLowerCase() !==
        item.item.defaultMeasurementUnit.toLowerCase()
      ) {
        const conv = item.item.conversions.find(
          c =>
            c.measurementUnit.toLowerCase() ===
            item.measurementUnit.toLowerCase()
        );
        amount = amount / conv!.oneDefaultEquals;
      }
      if (prodIndex >= 0) {
        products[prodIndex].amount = parseFloat(
          (amount + products[prodIndex].amount).toFixed(2)
        );
      } else {
        products.push({
          id: item.item._id,
          item: item.item.description,
          amount: parseFloat(amount.toFixed(2)),
          unit: item.item.defaultMeasurementUnit,
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
