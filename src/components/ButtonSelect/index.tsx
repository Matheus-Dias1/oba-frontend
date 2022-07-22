import Button from '../Button';
import styles from './styles.module.scss';

interface PropsI {
  options: {
    title: string;
    value: string;
    selected: boolean;
  }[];
  onChange: (val: string) => void;
}

const ButtonSelect = ({ options, onChange }: PropsI) => {
  return (
    <div className={styles['button-select']}>
      {options.map(op => (
        <Button
          key={op.value}
          title={op.title}
          variant={op.selected ? 'solid' : 'leaked'}
          onClick={() => {
            onChange(op.value);
          }}
        />
      ))}
    </div>
  );
};

export default ButtonSelect;
