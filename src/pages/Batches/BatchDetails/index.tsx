import styles from './styles.module.scss';
import BackIcon from '../../../assets/icons/chevron-back.svg';
import { BatchDetailI } from '../../../queries/batches/models';
import { useQuery } from 'react-query';
import { getAllSum } from '../../../utils/getAllSum';
import { getSumByProduct } from '../../../utils/getSumByProduct';
import { useContext, useEffect, useState } from 'react';
import ButtonSwitch from '../../../components/ButtonSwitch';
import Table from '../../../components/Table';
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
import NavContext, { PagesEnum } from '../../../context/NavContext';
import ButtonSelect from '../../../components/ButtonSelect';

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
  const navCtx = useContext(NavContext);
  const [screen, setScreen] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);

  const { data, status } = useQuery(['batch'], async () => await getBatch(id));
  const isLoading = status === 'success';
  const batch: BatchDetailI = data;

  const [selectedOrders, setSelectedOrders] = useState<
    {
      title: string;
      value: string;
      selected: boolean;
    }[]
  >([]);

  useEffect(() => {
    if (batch && batch.orders) {
      setSelectedOrders(
        batch.orders
          .sort((a, b) => {
            const date1 = new Date(a.deliverAt);
            const date2 = new Date(b.deliverAt);

            if (date1 > date2) return 1;
            if (date1 < date2) return -1;
            return 0;
          })
          .map(b => ({
            title: `${b.client} - ${new Date(b.deliverAt).toLocaleDateString(
              'pt-BR'
            )}`,
            value: b._id,
            selected: true,
          }))
      );
    }
  }, [status]);

  const onSelectionChange = (id: string) => {
    setSelectedOrders(old => {
      const cpy = JSON.parse(JSON.stringify(old));
      const order: { title: string; value: string; selected: boolean } =
        cpy.find(
          (x: { title: string; value: string; selected: boolean }) =>
            x.value === id
        );
      if (!order) return old;
      order.selected = !order.selected;
      return cpy;
    });
  };

  const batchNumber = isLoading ? '#' + `${batch.number}`.padStart(3, '0') : '';
  const batchDates = isLoading
    ? `${new Date(batch.startDate).toLocaleDateString('pt-BR')} - ${new Date(
        batch.endDate
      ).toLocaleDateString('pt-BR')}`
    : '';

  const filteredBatch = isLoading
    ? {
        ...batch,
        orders: batch.orders.filter(
          x => selectedOrders.find(y => y.value === x._id)?.selected
        ),
      }
    : undefined;

  const sumData = isLoading ? getAllSum(filteredBatch!) : [];
  const sumByProdData = isLoading ? getSumByProduct(filteredBatch!) : [];
  const sumByOrderData = isLoading ? getSumByOrder(filteredBatch!) : [];
  const getTotal = (item: string) => {
    const prod = sumData.find(p => p.item === item);
    if (!prod) return '';
    return `${prod.amount.toLocaleString('pt-BR')} ${prod.unit}`;
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
      {(screen === 'overview' || screen === 'clients') && (
        <div className={styles.actions}>
          <ButtonRound onClick={onDownload} type="download" />
        </div>
      )}
      <header>
        <button
          className={styles['back-button']}
          onClick={() => {
            navCtx.setLocation({
              page: PagesEnum.BATCHES,
            });
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
        <ButtonRound
          onClick={() => setShowFilters(old => !old)}
          type="filter"
        />
      </header>
      {showFilters && (
        <div className={styles.filters}>
          <ButtonSelect options={selectedOrders} onChange={onSelectionChange} />
        </div>
      )}
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
              <div key={`${prod.client}-${getRandomID()}`}>
                <div className={styles['prod-summary-container']}>
                  <h2>{`${prod.client} - ${prod.deliverAt.toLocaleDateString(
                    'pt-BR'
                  )}`}</h2>
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
