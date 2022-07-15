import { KeyboardEvent, useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import ButtonRound from '../../../components/ButtonRound';
import { getProduct } from '../../../queries/products/getProducts';
import { ProductI } from '../../../queries/products/models';
import { setProduct } from '../../../queries/products/setProduct';
import DeleteIcon from '../../../assets/icons/actions/trash.svg';
import AddIcon from '../../../assets/icons/actions/confirm.svg';
import styles from './styles.module.scss';

type Conversions = {
  unit: string;
  defaultAmount: string;
  convAmount: string;
}[];

interface PropsI {
  id: string;
}

const Product = ({ id }: PropsI) => {
  const [_, setLocation] = useLocation();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');

  const [defaultAmount, setDefaultAmount] = useState('');
  const [convAmount, setConvAmount] = useState('');
  const [convUnit, setConvUnit] = useState('');

  const [conversions, setConversions] = useState<Conversions>([]);

  const init = async () => {
    if (id === 'new') return;
    try {
      const product: ProductI = await getProduct(id);
      setName(product.description);
      setUnit(product.defaultMeasurementUnit);
      setConversions(
        product.conversions.map(conv => ({
          defaultAmount: '1',
          convAmount: `${conv.oneDefaultEquals}`,
          unit: conv.measurementUnit,
        }))
      );
    } catch (err) {
      alert(`Erro ao carregar produto: ${err}`);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') pushNewConversion();
  };

  const pushNewConversion = () => {
    if (!defaultAmount || !convAmount || !convUnit) return;
    setConversions(conversions => {
      const cpy: Conversions = JSON.parse(JSON.stringify(conversions));
      cpy.unshift({
        unit: convUnit,
        convAmount,
        defaultAmount,
      });
      return cpy;
    });

    setDefaultAmount('');
    setConvAmount('');
    setConvUnit('');
  };

  const editConversion = (
    index: number,
    field: 'unit' | 'defaultAmount' | 'convAmount',
    val: string
  ) => {
    setConversions(conversions => {
      const cpy: Conversions = JSON.parse(JSON.stringify(conversions));
      cpy[index][field] = val;
      return cpy;
    });
  };

  const removeConversion = (i: number) => {
    setConversions(c => {
      const convs = JSON.parse(JSON.stringify(c));
      convs.splice(i, 1);
      return convs;
    });
  };

  const onSubmit = async () => {
    if (!name || !unit) return;
    setLoading(true);
    await setProduct(
      {
        description: name,
        defaultMeasurementUnit: unit,
        conversions: conversions.map(c => ({
          measurementUnit: c.unit,
          oneDefaultEquals:
            parseFloat(c.convAmount) / parseFloat(c.defaultAmount),
        })),
      },
      id !== 'new' ? id : undefined
    );
    setLoading(false);
    setLocation('/products');
  };

  const getTitle = () => (id === 'new' ? 'Novo produto' : 'Alterar produto');
  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <ButtonRound
          onClick={() => {
            setLocation('/products');
          }}
          type="cancel"
        />
        <ButtonRound onClick={onSubmit} type="ok" loading={loading} />
      </div>
      <h1>{getTitle()}</h1>
      <form className={styles.info}>
        <input
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          placeholder="Descrição do produto"
        />
        <input
          type="text"
          value={unit}
          onChange={e => {
            setUnit(e.target.value);
          }}
          placeholder="Unidade de medida primária"
        />
      </form>
      {unit && (
        <>
          <h2>Conversões</h2>
          <form className={styles['conversions-form']}>
            <input
              type="number"
              value={defaultAmount}
              onChange={e => {
                setDefaultAmount(e.target.value);
              }}
              placeholder="1"
              onBlur={pushNewConversion}
              onKeyUp={e => handleEnterKey(e)}
            />
            <p>{unit}</p>
            <div className={styles.separator} />
            <input
              type="number"
              value={convAmount}
              onChange={e => {
                setConvAmount(e.target.value);
              }}
              onBlur={pushNewConversion}
              onKeyUp={e => handleEnterKey(e)}
              placeholder="2"
            />
            <input
              type="text"
              value={convUnit}
              onChange={e => {
                setConvUnit(e.target.value);
              }}
              onBlur={pushNewConversion}
              onKeyUp={e => handleEnterKey(e)}
              placeholder="UN"
            />
          </form>
          {conversions.map((conv, i) => (
            <form className={styles['conversions-form']} key={i}>
              <input
                type="number"
                value={conv.defaultAmount}
                onChange={e => {
                  editConversion(i, 'defaultAmount', e.target.value);
                }}
                onBlur={pushNewConversion}
                onKeyUp={e => handleEnterKey(e)}
                placeholder="1"
              />
              <p>{unit}</p>
              <div className={styles.separator} />
              <input
                type="number"
                value={conv.convAmount}
                onChange={e => {
                  editConversion(i, 'convAmount', e.target.value);
                }}
                onBlur={pushNewConversion}
                onKeyUp={e => handleEnterKey(e)}
                placeholder="2"
              />
              <input
                type="text"
                value={conv.unit}
                onChange={e => {
                  editConversion(i, 'unit', e.target.value);
                }}
                onBlur={pushNewConversion}
                onKeyUp={e => handleEnterKey(e)}
                placeholder="UN"
              />
              <button type="button" onClick={() => removeConversion(i)}>
                <DeleteIcon />
              </button>
            </form>
          ))}
        </>
      )}
    </div>
  );
};

export default Product;
