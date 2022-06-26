import { useState } from 'react';
import Button from '../Button';
import styles from './styles.module.scss';

interface PropsI {
  options: {
    title: string;
    value: string;
    default?: boolean;
  }[];
  onChange: (val: string) => void;
}

const ButtonSwitch = ({ options, onChange }: PropsI) => {
  const defaultSelected = options.find(op => op.default);
  const [selected, setSelected] = useState(
    defaultSelected ? defaultSelected.value : options[0].value
  );

  return (
    <div className={styles['button-switch']}>
      {options.map(op => (
        <Button
          key={op.value}
          title={op.title}
          fit
          variant={op.value === selected ? 'solid' : 'leaked'}
          onClick={() => {
            setSelected(op.value);
            onChange(op.value);
          }}
        />
      ))}
    </div>
  );
};

export default ButtonSwitch;
