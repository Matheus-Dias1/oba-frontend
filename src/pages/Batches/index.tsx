import BatchCard from './BatchCard';
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
  return (
    <div className={styles.container}>
      <h1>Lotes</h1>
      <h4>Resumo geral de cada lote, incluindo itens de cada pedido</h4>
      <div className={styles['batch-list']}>
        {MOCK_BATCH.map(MOCK_BATCH => {
          return (
            <BatchCard
              startDate={MOCK_BATCH.startDate}
              endDate={MOCK_BATCH.endDate}
              number={MOCK_BATCH.number}
              items={MOCK_BATCH.items}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Batches;
