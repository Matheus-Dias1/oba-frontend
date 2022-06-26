import styles from './styles.module.scss';

interface PropsI {
  title: string;
  amount?: string;
}

const Chip = ({ title, amount }: PropsI) => {
  return <div className={styles.chip}>{title}</div>;
};

export default Chip;
