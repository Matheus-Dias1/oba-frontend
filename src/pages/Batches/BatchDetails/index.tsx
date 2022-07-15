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
import { downloadSummary } from '../../../queries/batches/download';

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
  const [screen, setScreen] = useState('summary');

  const { data, status } = useQuery(['batch'], async () => await getBatch(id));
  const batch: BatchDetailI = data;

  const [_, setLocation] = useLocation();

  if (status === 'loading') return <></>;

  const batchNumber = '#' + `${batch.number}`.padStart(3, '0');
  const batchDates = `${new Date(batch.startDate).toLocaleDateString(
    'pt-BR'
  )} - ${new Date(batch.endDate).toLocaleDateString('pt-BR')}`;

  const sumData = getAllSum(batch);
  const sumByProdData = getSumByProduct(batch);

  const getTotal = (item: string) => {
    const prod = sumData.find(p => p.item === item);
    if (!prod) return '';
    return `${prod.amount} ${prod.unit}`;
  };

  const onDownload = async () => {
    await downloadSummary(
      sumData,
      'Lote ' + `${batch.number}`.padStart(3, '0')
    );
  };

  return (
    <div className={styles.container}>
      {screen === 'summary' && (
        <div className={styles.actions}>
          <ButtonRound onClick={onDownload} type="download" />
        </div>
      )}
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
      {screen === 'summary' ? (
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
      ) : (
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
