import { useState } from 'react';
import Button from '../../components/Button';
import ButtonRound from '../../components/ButtonRound';
import Modal from '../../components/Modal';
import Spacer from '../../components/Spacer';
import { getRandomID } from '../../utils/randomID';
import BatchCard from './BatchCard';
import NewBatch from './NewBatch';
import styles from './styles.module.scss';

const MOCK_BATCH = [
  {
    startDate: new Date('2022-06-25T23:22:18.512Z'),
    endDate: new Date('2022-06-20T23:22:18.512Z'),
    number: 5,
    items: [
      'banana',
      'maçã',
      'pera',
      'banana',
      'maçã',
      'pera',
      'banana',
      'maçã',
      'pera',
      'banana',
      'maçã',
      'pera',
      'banana',
      'maçã',
      'pera',
      'banana',
      'maçã',
      'pera',
      'banana',
      'maçã',
      'pera',
      'banana',
      'maçã',
      'pera',
      'banana',
      'maçã',
      'pera',
    ],
  },
  {
    startDate: new Date('2022-06-25T23:22:18.512Z'),
    endDate: new Date('2022-06-20T23:22:18.512Z'),
    number: 5,
    items: ['banana', 'maçã', 'pera'],
  },
  {
    startDate: new Date('2022-06-25T23:22:18.512Z'),
    endDate: new Date('2022-06-20T23:22:18.512Z'),
    number: 5,
    items: ['banana', 'maçã', 'pera'],
  },
  {
    startDate: new Date('2022-06-25T23:22:18.512Z'),
    endDate: new Date('2022-06-20T23:22:18.512Z'),
    number: 5,
    items: ['banana', 'maçã', 'pera'],
  },
  {
    startDate: new Date('2022-06-25T23:22:18.512Z'),
    endDate: new Date('2022-06-20T23:22:18.512Z'),
    number: 5,
    items: ['banana', 'maçã', 'pera'],
  },
  {
    startDate: new Date('2022-06-25T23:22:18.512Z'),
    endDate: new Date('2022-06-20T23:22:18.512Z'),
    number: 5,
    items: ['banana', 'maçã', 'pera'],
  },
  {
    startDate: new Date('2022-06-25T23:22:18.512Z'),
    endDate: new Date('2022-06-20T23:22:18.512Z'),
    number: 5,
    items: ['banana', 'maçã', 'pera'],
  },
];

const Batches = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [search, setSearch] = useState('');
  const [batches, setBatches] = useState(MOCK_BATCH);

  const [modalOpen, setModalOpen] = useState(false);

  const handleNewBatch = async (start: Date, end: Date) => {
    batches.unshift({
      items: [],
      endDate: end,
      startDate: start,
      number: batches.length + 1,
    });
    await new Promise(resolve => setTimeout(resolve, 2000));
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {modalOpen && (
        <Modal
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <NewBatch next={batches.length + 1} onAdd={handleNewBatch} />
        </Modal>
      )}
      <div className={styles.actions}>
        <ButtonRound
          onClick={() => {
            setModalOpen(true);
          }}
          type="add"
        />
      </div>
      <div className={styles.header}>
        <div>
          <h1>Lotes</h1>
          <h4>Resumo geral de cada lote, incluindo itens de cada pedido</h4>
        </div>
        <input
          type="text"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
          placeholder="Buscar lote"
        />{' '}
      </div>
      <div className={styles['batch-list']}>
        {batches.map(batches => {
          return (
            <BatchCard
              key={getRandomID()}
              startDate={batches.startDate}
              endDate={batches.endDate}
              number={batches.number}
              items={batches.items}
            />
          );
        })}
      </div>
      <Button
        onClick={() => {}}
        loading={loadingMore}
        fit
        title="Carregar mais"
        variant="leaked"
      />
      <Spacer />
    </div>
  );
};

export default Batches;
