import { useRef, useState, MutableRefObject } from 'react';
import SelectPaginate from '../../../components/Select/SelectPaginate';
import SelectSimple from '../../../components/Select/SelectSimple';
import { loadMoreBatches } from './utils/fetchBatchOptions';
import DeleteIcon from '../../../assets/icons/actions/trash.svg';
import AddIcon from '../../../assets/icons/actions/confirm.svg';
import styles from './styles.module.scss';
import Table from '../../../components/Table';
import { loadMoreProducts } from './utils/fetchProductOptions';
import ButtonRound from '../../../components/ButtonRound';
import { useLocation } from 'wouter';

type Product = {
  id: string;
  description: string;
  defaultMeasurementUnit: string;
  conversions: { measurementUnit: string; oneDefaultEquals: number }[];
};

type ProdListItem = {
  amount: number;
  unit: string;
  product: Product;
};

type Option = {
  value: string;
  label: string;
};

interface PropsI {
  id: string;
}

const Order = ({ id }: PropsI) => {
  const [client, setClient] = useState('');
  const [batch, setBatch] = useState('');
  const [deliverAt, setDeliverAt] = useState('');

  // product input
  const [editing, setEditing] = useState(-1);
  const [product, setProduct] = useState<Product | null>(null);
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState<Option | null>(null);

  // product list
  const [prodList, setProdlist] = useState<ProdListItem[]>([]);

  // input date ref
  const dateRef = useRef() as MutableRefObject<HTMLInputElement>;

  // location
  const [_, setLocation] = useLocation();

  const getAvailableUnits = () => {
    if (!product) return undefined;
    return [
      {
        value: product.defaultMeasurementUnit,
        label: product.defaultMeasurementUnit,
      },
      ...product.conversions.map(c => ({
        value: c.measurementUnit,
        label: c.measurementUnit,
      })),
    ];
  };

  const resetNewProd = () => {
    setAmount('');
    setUnit(null);
    setProduct(null);
    setEditing(-1);
  };
  const onProdConfirm = () => {
    if (!product || !amount || !unit) return;
    if (editing >= 0) {
      setProdlist(o => {
        const newList: ProdListItem[] = JSON.parse(JSON.stringify(o));
        const idx = newList.findIndex(
          p => p.product.id === product.id && p.unit === unit.value
        );

        // only change is amount
        if (editing === idx) {
          newList[editing].amount = parseFloat(amount);
          return newList;
        } else {
          // other product and already exists
          if (idx >= 0) {
            newList[idx] = {
              ...newList[idx],
              amount: parseFloat(amount) + newList[idx].amount,
            };
            newList.splice(editing, 1);
            return newList;
          } else {
            // other new product
            newList[editing] = {
              product,
              amount: parseFloat(amount),
              unit: unit.value,
            };
            return newList;
          }
        }
      });
    } else {
      setProdlist(o => {
        const newList: ProdListItem[] = JSON.parse(JSON.stringify(o));
        const idx = newList.findIndex(
          p => p.product.id === product.id && p.unit === unit.value
        );
        if (idx !== -1) {
          newList[idx] = {
            ...newList[idx],
            amount: parseFloat(amount) + newList[idx].amount,
          };
          return newList;
        }
        newList.push({ product, amount: parseFloat(amount), unit: unit.value });
        return newList;
      });
    }
    resetNewProd();
  };

  const handleEdit = (id: string) => {
    const [eProd, eUnit] = id.split('-');
    const idx = prodList.findIndex(
      p => p.unit === eUnit && p.product.id === eProd
    )!;

    setAmount(`${prodList[idx].amount}`);
    setProduct(prodList[idx].product);
    setUnit({ value: prodList[idx].unit, label: prodList[idx].unit });

    setEditing(idx);
  };

  const removeEditing = () => {
    setProdlist(old => {
      const newList: ProdListItem[] = JSON.parse(JSON.stringify(old));
      newList.splice(editing, 1);
      return newList;
    });
    resetNewProd();
  };
  const getTitle = () => (id === 'new' ? 'Novo pedido' : 'Alterar pedido');
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <ButtonRound
          onClick={() => {
            setLocation('/orders');
          }}
          type="cancel"
        />
        <ButtonRound onClick={() => {}} type="ok" />
      </div>
      <h1>{getTitle()}</h1>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className={styles['first-row']}>
          <input
            type="text"
            placeholder="Cliente"
            value={client}
            onChange={e => {
              setClient(e.target.value);
            }}
          />
          <div>
            <SelectPaginate
              loadOptions={loadMoreBatches}
              onChange={e => {
                setBatch(e ? e.toString() : '');
              }}
              placeholder="Lote"
            />
          </div>
          <input
            type="text"
            ref={dateRef}
            onFocus={() => {
              dateRef.current.type = 'date';
            }}
            value={deliverAt}
            onChange={e => {
              setDeliverAt(e.target.value);
            }}
            placeholder="Entrega"
          />
        </div>
        <div className={styles['product-row']}>
          <SelectPaginate
            value={
              product
                ? {
                    label: product?.description,
                    value: product?.id,
                    defaultMeasurementUnit: product?.defaultMeasurementUnit,
                    conversions: product?.conversions,
                  }
                : null
            }
            loadOptions={loadMoreProducts}
            onChange={e => {
              setProduct({
                description: e.label,
                id: e.value,
                defaultMeasurementUnit: e.defaultMeasurementUnit,
                conversions: e.conversions,
              });
              setUnit(null);
            }}
            placeholder="Produto"
          />
          <input
            type="number"
            value={amount}
            onChange={e => {
              setAmount(e.target.value);
            }}
            placeholder="Quantidade"
          />
          <SelectSimple
            value={unit}
            options={getAvailableUnits()}
            onChange={e => {
              setUnit(e);
            }}
            placeholder="Unidade de medida"
            noOptionsText="Selecione um produto"
          />
          {editing >= 0 && (
            <button
              className={[styles.btn, styles['delete-btn']].join(' ')}
              onClick={removeEditing}
            >
              <DeleteIcon />
            </button>
          )}
          <button
            className={[styles.btn, styles['add-btn']].join(' ')}
            onClick={onProdConfirm}
          >
            <AddIcon />
          </button>
        </div>
        <div className={styles['items-list']}>
          <Table
            data={prodList.map(item => ({
              id: `${item.product.id}-${item.unit}`,
              produto: item.product.description,
              quantidade: item.amount,
              unidade: item.unit,
            }))}
            onClick={id => {
              handleEdit(id);
            }}
          />
        </div>
      </form>
    </div>
  );
};

export default Order;
