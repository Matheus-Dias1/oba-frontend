export interface ProductI {
  _id: string;
  description: string;
  defaultMeasurementUnit: string;
  conversions: {
    measurementUnit: string;
    oneDefaultEquals: number;
  }[];
}
