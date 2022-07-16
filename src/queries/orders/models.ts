import { ProductI } from '../products/models';

export interface OrderI {
  _id: string;
  client: string;
  batch: {
    _id: string;
    number: number;
    startDate: string;
    endDate: string;
  };
  createdAt: string;
  deliverAt: string;
  items: {
    item: ProductI;
    amount: number;
    measurementUnit: string;
  }[];
  archived: boolean;
}
