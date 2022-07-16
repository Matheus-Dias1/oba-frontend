import Card from '../../../components/Card';
import styles from './styles.module.scss';
import EditIcon from '../../../assets/icons/actions/edit.svg';
import { useContext } from 'react';
import NavContext, { PagesEnum } from '../../../context/NavContext';

interface PropsI {
  id: string;
  description: string;
  defaultUnit: string;
  units: string[];
}

const ProductCard = ({ description, units, defaultUnit, id }: PropsI) => {
  const navCtx = useContext(NavContext);
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
            navCtx.setLocation({
              page: PagesEnum.EDIT_PRODUCT,
              id
            });
          }}
        >
          <EditIcon />
        </button>
      </div>
    </Card>
  );
};

export default ProductCard;
