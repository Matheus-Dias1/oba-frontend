import { useLocation } from 'wouter';
import Card from '../../../components/Card';
import Chip from '../../../components/Chip';
import { getRandomID } from '../../../utils/randomID';
import styles from './styles.module.scss';

interface PropsI {
  id: string;
  startDate: Date;
  endDate: Date;
  number: number;
  items: string[];
}

const BatchCard = ({ startDate, endDate, number, items, id }: PropsI) => {
  const [_, setLocation] = useLocation();
  const dateText = `${startDate.toLocaleDateString(
    'pt-BR'
  )} - ${endDate.toLocaleDateString('pt-BR')}`;
  const handleCardClick = () => {
    setLocation(`batches/${id}`);
  };
  return (
    <Card onClick={handleCardClick}>
      <div className={styles['batch-card-layout']}>
        <div>
          <h3>Data</h3>
          <p>{dateText}</p>
        </div>
        <h2>{`${number}`.padStart(3, '0')}</h2>
        <div>
          <h3>Items</h3>
          {items.length ? (
            <div className={styles.items}>
              {items.map((item: string) => (
                <Chip title={item} key={`${item}-${getRandomID()}`} />
              ))}
            </div>
          ) : (
            <p>Ainda não há pedidos para esse lote</p>
          )}
        </div>
        <h2 className={styles.button}>&gt;</h2>
      </div>
    </Card>
  );
};

export default BatchCard;
