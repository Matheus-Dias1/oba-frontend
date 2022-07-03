import { getRandomID } from '../../../../utils/randomID';

export const loadMoreProducts = async (query: string, options: any) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return {
    options: [
      {
        value: getRandomID(),
        label: 'Maçã',
        defaultMeasurementUnit: 'DF',
        conversions: [
          { measurementUnit: 'KK', oneDefaultEquals: 10 },
          { measurementUnit: 'KJ', oneDefaultEquals: 0.01 },
        ],
      },
      {
        value: getRandomID(),
        label: 'Banana',
        defaultMeasurementUnit: 'DF',
        conversions: [
          { measurementUnit: 'UN', oneDefaultEquals: 10 },
          { measurementUnit: 'CX', oneDefaultEquals: 0.01 },
        ],
      },
      {
        value: getRandomID(),
        label: 'Pera',
        defaultMeasurementUnit: 'DF',
        conversions: [
          { measurementUnit: 'UN', oneDefaultEquals: 10 },
          { measurementUnit: 'CX', oneDefaultEquals: 0.01 },
        ],
      },
      {
        value: getRandomID(),
        label: 'Cebola',
        defaultMeasurementUnit: 'DF',
        conversions: [
          { measurementUnit: 'UN', oneDefaultEquals: 10 },
          { measurementUnit: 'CX', oneDefaultEquals: 0.01 },
        ],
      },
      {
        value: getRandomID(),
        label: 'Tomate',
        defaultMeasurementUnit: 'DF',
        conversions: [
          { measurementUnit: 'UN', oneDefaultEquals: 10 },
          { measurementUnit: 'CX', oneDefaultEquals: 0.01 },
        ],
      },
      {
        value: getRandomID(),
        label: 'Manga',
        defaultMeasurementUnit: 'DF',
        conversions: [
          { measurementUnit: 'UN', oneDefaultEquals: 10 },
          { measurementUnit: 'CX', oneDefaultEquals: 0.01 },
        ],
      },
      {
        value: getRandomID(),
        label: 'Alface',
        defaultMeasurementUnit: 'DF',
        conversions: [
          { measurementUnit: 'UN', oneDefaultEquals: 10 },
          { measurementUnit: 'CX', oneDefaultEquals: 0.01 },
        ],
      },
      {
        value: getRandomID(),
        label: 'Alho',
        defaultMeasurementUnit: 'DF',
        conversions: [
          { measurementUnit: 'UN', oneDefaultEquals: 10 },
          { measurementUnit: 'CX', oneDefaultEquals: 0.01 },
        ],
      },
    ],
    hasMore: true,
  };
};
