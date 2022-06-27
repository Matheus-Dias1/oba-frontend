import styles from './styles.module.scss';

interface PropsI {
  title: string;
  amount?: string;
}

const Chip = ({ title, amount }: PropsI) => {
  const containerClasses = [styles.chip, !amount ? styles.padding : ''].join(
    ' '
  );
  const titleClasses = [amount ? styles.padding : ''].join(' ');
  return (
    <div className={containerClasses}>
      <div className={titleClasses}>{title}</div>
      {amount ? <div className={styles.amount}>{amount}</div> : <></>}
    </div>
  );
};

export default Chip;
