import { MutableRefObject, useRef, useState } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import styles from './styles.module.scss';

interface PropsI {
  next: number;
  onAdd: (start: Date, end: Date) => void;
}

const NewBatch = ({ next, onAdd }: PropsI) => {
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const startDateRef = useRef() as MutableRefObject<HTMLInputElement>;
  const endDateRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleAddBatch = () => {
    if (!startDate || !endDate) return;
    setLoading(true);
    onAdd(new Date(startDate), new Date(endDate));
  };

  return (
    <div className={styles.container}>
      <Card padding={false}>
        <div className={styles.content}>
          <h1>Lote {`${next}`.padStart(3, '0')}</h1>
          <form>
            <input
              type="text"
              ref={startDateRef}
              onFocus={() => {
                startDateRef.current.type = 'date';
              }}
              value={startDate}
              onChange={e => {
                setStartDate(e.target.value);
              }}
              placeholder="Data inicial"
            />
            <input
              type="text"
              ref={endDateRef}
              onFocus={() => {
                endDateRef.current.type = 'date';
              }}
              value={endDate}
              onChange={e => {
                setEndDate(e.target.value);
              }}
              placeholder="Data final"
            />
          </form>
          <Button
            onClick={handleAddBatch}
            title="Continuar"
            loading={loading}
            fit
          />
        </div>
      </Card>
    </div>
  );
};

export default NewBatch;
