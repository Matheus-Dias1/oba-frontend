import { useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Button from '../../components/Button';
import ButtonRound from '../../components/ButtonRound';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import Spacer from '../../components/Spacer';
import { getBatches } from '../../queries/batches/getBatches';
import { BatchDetailI } from '../../queries/batches/models';
import { newBatch } from '../../queries/batches/newBatch';
import BatchCard from './BatchCard';
import NewBatch from './NewBatch';
import styles from './styles.module.scss';

const Batches = () => {
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [batches, setBatches] = useState<BatchDetailI[]>([]);
  const [hasNextPage, setHasNextPage] = useState(false);

  const { data, status, fetchNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery(
      ['batches', search],
      async ({ pageParam = '' }) => await getBatches(pageParam, search),
      {
        getNextPageParam: lastPage => lastPage.pageInfo.endCursor,
      }
    );

  useEffect(() => {
    if (status === 'success' && !isFetching) {
      const lastPage = data.pages.length - 1;
      setHasNextPage(data.pages[lastPage].pageInfo.hasNextPage);
      const updatedBatches: BatchDetailI[] = [];
      data.pages.forEach(page => {
        updatedBatches.push(...page.edges.map((x: any) => x.node));
      });
      setBatches(updatedBatches);
    }
  }, [status, isFetching]);

  const getItems = (batch: BatchDetailI) => {
    const items: string[] = [];
    batch.orders.forEach(order => {
      order.items.forEach(item => {
        if (!items.includes(item.item.description))
          items.push(item.item.description);
      });
    });

    return items;
  };

  const handleNewBatch = async (start: Date, end: Date) => {
    batches.unshift({
      _id: '',
      orders: [],
      endDate: end.toISOString(),
      startDate: start.toISOString(),
      number: batches.length + 1,
    });
    await newBatch(start.toISOString(), end.toISOString());
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
        />
      </div>
      {status === 'success' && (
        <div className={styles['batch-list']}>
          {batches.map(batch => {
            return (
              <BatchCard
                key={batch._id}
                id={batch._id}
                startDate={new Date(batch.startDate)}
                endDate={new Date(batch.endDate)}
                number={batch.number}
                items={getItems(batch)}
              />
            );
          })}
        </div>
      )}
      {status === 'loading' ||
        (isFetching && (
          <>
            <Spacer />
            <Loader type="ellipsis" color="primary" />
          </>
        ))}
      {hasNextPage && (
        <Button
          onClick={() => {
            fetchNextPage();
          }}
          loading={isFetchingNextPage}
          fit
          title="Carregar mais"
          variant="leaked"
        />
      )}
      <Spacer />
    </div>
  );
};

export default Batches;
