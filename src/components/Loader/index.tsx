import styles from './styles.module.scss';

interface PropsI {
  size?: number;
}

const Loader = ({ size: sizeP }: PropsI) => {
  const size = sizeP || 80;

  return (
    <div className={styles.clip}>
      <div className={styles['lds-ellipsis']} data-size={size}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
