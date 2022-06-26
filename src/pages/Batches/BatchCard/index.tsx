import Card from '../../../components/Card';
import Chip from '../../../components/Chip';
import { getRandomID } from '../../../utils/randomID';
import styles from './styles.module.scss';

interface PropsI {
  startDate: Date;
  endDate: Date;
  number: number;
  items: string[];
}

const BatchCard = ({ startDate, endDate, number, items }: PropsI) => {
  const dateText = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
  return (
    <Card>
      <div className={styles['batch-card-layout']}>
        <div>
          <h3>Data</h3>
          <p>{dateText}</p>
        </div>
        <h2>{`${number}`.padStart(3, '0')}</h2>
        <div>
          <h3>Items</h3>
          <div className={styles.items}>
            {items.map((item: string) => (
              <Chip title={item} key={`${item}-${getRandomID()}`} />
            ))}
          </div>
        </div>
        <h2 className={styles.button}>&gt;</h2>
      </div>
    </Card>
  );
};

export default BatchCard;
