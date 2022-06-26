export interface BatchDetailI {
  _id: string;
  number: number;
  startDate: Date;
  endDate: Date;
  orders: {
    _id: string;
    client: string;
    createdAt: Date;
    deliverAt: Date;
    items: {
      amount: number;
      measurementUnit: string;
      item: {
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
