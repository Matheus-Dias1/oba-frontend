import { useLocation } from 'wouter';
import Card from '../../../components/Card';
import styles from './styles.module.scss';
import EditIcon from '../../../assets/icons/actions/edit.svg';

interface PropsI {
  id: string;
  description: string;
  defaultUnit: string;
  units: string[];
}

const ProductCard = ({ description, units, defaultUnit, id }: PropsI) => {
  const [_, setLocation] = useLocation();
  const conversions = units.length ? ` - ${units.join(' - ')}` : '';
  return (
    <Card>
      <div className={styles.card}>
        <h3>{description}</h3>
        <p>
          <b>{defaultUnit}</b>
          {conversions}
        </p>
        <button
          onClick={() => {
            setLocation(`/products/${id}`);
          }}
        >
          <EditIcon />
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;
