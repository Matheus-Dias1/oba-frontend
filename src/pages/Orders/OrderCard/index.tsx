import Card from '../../../components/Card';
import Chip from '../../../components/Chip';
import { getRandomID } from '../../../utils/randomID';
import styles from './styles.module.scss';
import EditIcon from '../../../assets/icons/pencil.svg';
import { useContext } from 'react';
import NavContext, { PagesEnum } from '../../../context/NavContext';

interface PropsI {
  client: string;
  id: string;
  batchNumber: number;
  createdAt: Date;
  deliverAt: Date;
  items: string[];
}

const OrderCard = ({
  client,
  id,
  batchNumber,
  createdAt,
  deliverAt,
  items,
}: PropsI) => {
  const navCtx = useContext(NavContext);

  return (
    <Card>
      <div className={styles.info}>
        <h3 className={styles.client}>{client}</h3>
        <span className={styles.date}>
          CRIADO EM <h3>{createdAt.toLocaleDateString('pt-BR')}</h3>
        </span>
        <span>
          LOTE <h3>{`${batchNumber}`.padStart(3, '0')}</h3>
        </span>
        <span className={styles.date}>
          ENTREGA EM <h3>{deliverAt.toLocaleDateString('pt-BR')}</h3>
        </span>
      </div>
      <div className={styles['item-chips-container']}>
        <div className={styles['item-chips']}>
          {items.map(i => (
            <Chip title={i} key={`${i}-${getRandomID()}`} />
          ))}
        </div>
        <div className={styles.actions}>
          {/* <PDFIcon /> */}
          <button
            onClick={() => {
              navCtx.setLocation({
                page: PagesEnum.EDIT_ORDER,
                id
              });
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
