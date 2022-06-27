import Card from '../../../components/Card';
import Chip from '../../../components/Chip';
import { getRandomID } from '../../../utils/randomID';
import styles from './styles.module.scss';
import PDFIcon from '../../../assets/icons/pdf-file.svg';
import EditIcon from '../../../assets/icons/pencil.svg';
import { useLocation } from 'wouter';

interface PropsI {
  client: string;
  batch: string;
  batchNumber: number;
  createdAt: Date;
  deliverAt: Date;
  items: {
    description: string;
    amount: string;
  }[];
}

const OrderCard = ({
  client,
  batch,
  batchNumber,
  createdAt,
  deliverAt,
  items,
}: PropsI) => {
  const [_, setLocation] = useLocation();

  return (
    <Card>
      <div className={styles.info}>
        <h3 className={styles.client}>{client}</h3>
        <span className={styles.date}>
          CRIADO EM <h3>{createdAt.toLocaleDateString()}</h3>
        </span>
        <span>
          LOTE <h3>{`${batchNumber}`.padStart(3, '0')}</h3>
        </span>
        <span className={styles.date}>
          ENTREGA EM <h3>{deliverAt.toLocaleDateString()}</h3>
        </span>
      </div>
      <div className={styles['item-chips-container']}>
        <div className={styles['item-chips']}>
          {items.map(i => (
            <Chip
              title={i.description}
              amount={i.amount}
              key={`${i.description}-${getRandomID()}`}
            />
          ))}
        </div>
        <div className={styles.actions}>
          {/* <PDFIcon /> */}
          <button
            onClick={() => {
              setLocation(`/orders/${batch}`);
            }}
          >
            <EditIcon />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default OrderCard;
