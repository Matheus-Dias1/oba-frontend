export interface BatchDetailI {
  _id: string;
  number: number;
  startDate: string;
  endDate: string;
  orders: {
    _id: string;
    client: string;
    createdAt: string;
    deliverAt: string;
    items: {
      amount: number;
      measurementUnit: string;
      item: {
        _id: string;
        description: string;
        defaultMeasurementUnit: string;
        conversions: {
          measurementUnit: string;
          oneDefaultEquals: number;
        }[];
      };
    }[];
  }[];
}
