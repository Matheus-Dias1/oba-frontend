import styles from './styles.module.scss';
import BackIcon from '../../../assets/icons/chevron-back.svg';
import { BatchDetailI } from '../../../queries/batches/models';
import { useQuery } from 'react-query';
import { getAllSum } from '../../../utils/getAllSum';
import { getSumByProduct } from '../../../utils/getSumByProduct';
import { useState } from 'react';
import ButtonSwitch from '../../../components/ButtonSwitch';
import Table from '../../../components/Table';
import { useLocation } from 'wouter';
import { getRandomID } from '../../../utils/randomID';
import { getBatch } from '../../../queries/batches/getBatches';
import ButtonRound from '../../../components/ButtonRound';
import {
  downloadOrders,
  downloadSummary,
} from '../../../queries/batches/download';
import Loader from '../../../components/Loader';
import Spacer from '../../../components/Spacer';
import { getSumByOrder } from '../../../utils/getSumByOrder';

const SWITCH_OPTIONS = [
  {
    title: 'Geral',
    value: 'overview',
    default: true,
  },
  {
    title: 'Por produto',
    value: 'products',
  },
  {
    title: 'Por cliente',
    value: 'clients',
  },
];

interface PropsI {
  id: string;
}

const BatchDetails = ({ id }: PropsI) => {
  const [screen, setScreen] = useState('overview');

  const { data, status } = useQuery(['batch'], async () => await getBatch(id));
  const isLoading = status === 'success';
  const batch: BatchDetailI = data;

  const [_, setLocation] = useLocation();

  const batchNumber = isLoading ? '#' + `${batch.number}`.padStart(3, '0') : '';
  const batchDates = isLoading
    ? `${new Date(batch.startDate).toLocaleDateString('pt-BR')} - ${new Date(
        batch.endDate
      ).toLocaleDateString('pt-BR')}`
    : '';

  const sumData = isLoading ? getAllSum(batch) : [];
  const sumByProdData = isLoading ? getSumByProduct(batch) : [];
  const sumByOrderData = isLoading ? getSumByOrder(batch) : [];

  const getTotal = (item: string) => {
    const prod = sumData.find(p => p.item === item);
    if (!prod) return '';
    return `${prod.amount} ${prod.unit}`;
  };

  const onDownload = async () => {
    switch (screen) {
      case 'overview':
        await downloadSummary(
          sumData,
          'Lote ' + `${batch.number}`.padStart(3, '0')
        );
        return;
      case 'clients':
        await downloadOrders(
          sumByOrderData,
          'Lote ' + `${batch.number}`.padStart(3, '0')
        );
    }
  };

  return (
    <div className={styles.container}>
      {screen === 'overview' ||
        (screen === 'clients' && (
          <div className={styles.actions}>
            <ButtonRound onClick={onDownload} type="download" />
          </div>
        ))}
      <header>
        <button
          className={styles['back-button']}
          onClick={() => {
            setLocation('/batches');
          }}
        >
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
      {status === 'loading' && (
        <>
          <Spacer />
          <Loader type="ellipsis" color="primary" />
        </>
      )}
      {screen === 'overview' && isLoading && (
        <div style={{ marginTop: '2em', paddingBottom: '2em' }}>
          <Table
            data={sumData.map(d => ({
              id: `${d.item}-${getRandomID()}`,
              item: d.item,
              quantidade: d.amount,
              unidade: d.unit,
            }))}
          />
        </div>
      )}
      {screen === 'clients' && isLoading && (
        <div style={{ paddingBottom: '2em' }}>
          {sumByOrderData.map(prod => {
            return (
              <div key={prod.client}>
                <div className={styles['prod-summary-container']}>
                  <h2>{prod.client}</h2>
                </div>
                <Table
                  data={prod.items.map(p => ({
                    id: p.id,
                    item: p.name,
                    quantidade: p.amount,
                    unidade: p.unit,
                  }))}
                />
              </div>
            );
          })}
        </div>
      )}
      {screen === 'products' && isLoading && (
        <div style={{ paddingBottom: '2em' }}>
          {sumByProdData.map(prod => {
            return (
              <div key={prod.item}>
                <div className={styles['prod-summary-container']}>
                  <h2>{prod.item}</h2>
                  <h2>Total:</h2>
                  <h2>{getTotal(prod.item)}</h2>
                </div>
                <Table
                  data={prod.clients.map(p => ({
                    id: `${p.name}-${getRandomID()}`,
                    cliente: p.name,
                    quantidade: p.amount,
                    unidade: p.unit,
                  }))}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BatchDetails;
