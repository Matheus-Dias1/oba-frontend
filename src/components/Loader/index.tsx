import styles from './styles.module.scss';

interface PropsI {
  type?: 'ring' | 'ellipsis';
}

const Loader = ({ type: typeP }: PropsI) => {
  const type = typeP || 'ellipsis';

  switch (type) {
    case 'ellipsis':
      return (
        <div className={styles.clip}>
          <div className={styles['lds-ellipsis']}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    case 'ring':
      return (
        <div className={styles['lds-ring']}>
          <div></div>
          <div></div>
        </div>
      );
  }
};

export default Loader;
