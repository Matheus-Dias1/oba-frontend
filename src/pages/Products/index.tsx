import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useInfiniteQuery } from 'react-query';
import Button from '../../components/Button';
import ButtonRound from '../../components/ButtonRound';
import { ProductI } from '../../queries/products/models';
import ProductCard from './ProductCard';
import styles from './styles.module.scss';
import { getProducts } from '../../queries/products/getProducts';
import { getRandomID } from '../../utils/randomID';
import Loader from '../../components/Loader';
import Spacer from '../../components/Spacer';

const Products = () => {
  const [_, setLocation] = useLocation();

  const [search, setSearch] = useState('');
  const [hasNextPage, setHasNextPage] = useState(false);

  const [products, setProducts] = useState<ProductI[]>([]);

  const { data, status, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(
      ['products', search],
      async ({ pageParam = '' }) => await getProducts(pageParam, search),
      {
        getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
      }
    );

  useEffect(() => {
    if (status === 'success' && !isFetching) {
      const lastPage = data.pages.length - 1;
      setHasNextPage(data.pages[lastPage].pageInfo.hasNextPage);
      const updatedProducts: ProductI[] = [];
      data.pages.forEach(page => {
        updatedProducts.push(...page.edges.map((x: any) => x.node));
      });
      setProducts(updatedProducts);
    }
  }, [status, isFetching]);

  const getUnits = (product: ProductI) => {
    const units: string[] = [];
    if (!product.conversions) return [];
    product.conversions.forEach(c => units.push(c.measurementUnit));
    return units;
  };

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
      <div className={styles.header}>
        <div>
          <h1>Produtos</h1>
          <h4>Adicione e altere dados de produtos</h4>
        </div>
        <input
          type="text"
          value={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
          placeholder="Buscar produto"
        />
      </div>
      <div className={styles['product-list']}>
        {products.map(p => (
          <ProductCard
            defaultUnit={p.defaultMeasurementUnit}
            description={p.description}
            id={p._id || getRandomID()}
            key={p._id || getRandomID()}
            units={getUnits(p)}
          />
        ))}
        {hasNextPage && (
          <Button
            onClick={() => {
              fetchNextPage();
            }}
            title="Carregar mais"
            variant="leaked"
            loading={isFetchingNextPage}
          />
        )}
      </div>
      <Spacer />
      {status === 'loading' && <Loader color="primary" type="ellipsis" />}
    </div>
  );
};

export default Products;
