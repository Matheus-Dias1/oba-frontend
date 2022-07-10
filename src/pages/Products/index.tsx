import { useLocation } from 'wouter';
import ButtonRound from '../../components/ButtonRound';
import { getRandomID } from '../../utils/randomID';
import ProductCard from './ProductCard';
import styles from './styles.module.scss';

const MOCK_PRODUCTS = [
  {
    id: getRandomID(),
    description: 'Maçã',
    defaultUnit: 'UN',
    units: ['CX', 'KG'],
  },
  {
    id: getRandomID(),
    description: 'Banana',
    defaultUnit: 'UN',
    units: ['CX', 'KG'],
  },
  {
    id: getRandomID(),
    description: 'Melancia',
    defaultUnit: 'UN',
    units: ['CX', 'KG'],
  },
  {
    id: getRandomID(),
    description: 'Pera',
    defaultUnit: 'UN',
    units: ['CX', 'KG'],
  },
  {
    id: getRandomID(),
    description: 'Uva',
    defaultUnit: 'UN',
    units: ['CX', 'KG'],
  },
];

const Products = () => {
  const [_, setLocation] = useLocation();
  return (
    <div className={styles.container}>
      <div className={styles['add-product']}>
        <ButtonRound
          onClick={() => {
            setLocation('/products/new');
          }}
          type="add"
        />
      </div>
      <h1>Produtos</h1>
      <h4>Adicione e altere dados de produtos</h4>
      <div className={styles['product-list']}>
        {MOCK_PRODUCTS.map(p => (
          <ProductCard
            defaultUnit={p.defaultUnit}
            description={p.description}
            id={p.id}
            key={p.id}
            units={p.units}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
