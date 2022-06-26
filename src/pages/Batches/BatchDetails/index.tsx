import styles from './styles.module.scss';
import BackIcon from '../../../assets/icons/chevron-back.svg';
import { BatchDetailI } from '../../../models/batchDetails';
import { getAllSum } from '../../../utils/getAllSum';
import { getSumByProduct } from '../../../utils/getSumByProduct';
import { useState } from 'react';
import ButtonSwitch from '../../../components/ButtonSwitch';

const MOCK_BATCH: BatchDetailI = {
  _id: '62a5555f72a6d1d58a159abf',
  number: 3,
  startDate: new Date('2022-06-16T02:52:39.106Z'),
  endDate: new Date('2022-06-18T02:52:45.381Z'),
  orders: [
    {
      _id: '62a559b3d0a4a2ed57561ff3',
      client: 'Cliente X',
      createdAt: new Date('2022-06-12T03:12:51.561Z'),
      deliverAt: new Date('2022-06-15T23:39:55.247Z'),
      items: [
        {
          amount: 1,
          measurementUnit: 'KG',
          item: {
            description: 'Maçã01',
            conversions: [],
            defaultMeasurementUnit: 'KG',
          },
        },
        {
          amount: 2,
          measurementUnit: 'KG',
          item: {
            conversions: [],
            description: 'maça22',
            defaultMeasurementUnit: 'KG',
          },
        },
      ],
    },
    {
      _id: '62b7b7b15a158c496ce174aa',
      client: 'Cliente Y',
      createdAt: new Date('2022-06-26T01:34:41.890Z'),
      deliverAt: new Date('2022-06-25T23:39:55.247Z'),
      items: [
        {
          amount: 3,
          measurementUnit: 'KG',
          item: {
            description: 'Maçã3',
            defaultMeasurementUnit: 'KG',
            conversions: [
              {
                measurementUnit: 'UN',
                oneDefaultEquals: 10,
              },
              {
                measurementUnit: 'CX',
                oneDefaultEquals: 0.01,
              },
            ],
          },
        },
        {
          amount: 4,
          measurementUnit: 'KG',
          item: {
            conversions: [],
            description: 'maça22',
            defaultMeasurementUnit: 'KG',
          },
        },
      ],
    },
    {
      _id: '62b7ba57d073471656440fb9',
      client: 'Cliente Y',
      createdAt: new Date('2022-06-26T01:45:59.433Z'),
      deliverAt: new Date('2022-06-25T23:39:55.247Z'),
      items: [
        {
          amount: 2,
          measurementUnit: 'CX',
          item: {
            description: 'Maçã3',
            defaultMeasurementUnit: 'KG',
            conversions: [
              {
                measurementUnit: 'UN',
                oneDefaultEquals: 10,
              },
              {
                measurementUnit: 'CX',
                oneDefaultEquals: 0.01,
              },
            ],
          },
        },
      ],
    },
  ],
};

const SWITCH_OPTIONS = [
  {
    title: 'Resumo',
    value: 'summary',
    default: true,
  },
  {
    title: 'Detalhes',
    value: 'details',
  },
];

interface PropsI {
  id: string;
}

const BatchDetails = ({ id }: PropsI) => {
  const [batch, setBatch] = useState(MOCK_BATCH);
  const [screen, setScreen] = useState('summary');

  const batchNumber = '#' + `${batch.number}`.padStart(3, '0');
  const batchDates = `${batch.startDate.toLocaleDateString()} - ${batch.endDate.toLocaleDateString()}`;

  console.log(getAllSum(MOCK_BATCH));
  console.log(getSumByProduct(MOCK_BATCH));
  return (
    <div className={styles.container}>
      <header>
        <button className={styles['back-button']}>
          <BackIcon />
        </button>
        <div className={styles.info}>
          <h1>{batchNumber}</h1>
          <p>{batchDates}</p>
        </div>
        <div className={styles['button-switch']}>
          <ButtonSwitch
            options={SWITCH_OPTIONS}
            onChange={value => {
              setScreen(value);
            }}
          />
        </div>
      </header>
    </div>
  );
};

export default BatchDetails;
