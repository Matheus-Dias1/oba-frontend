import styles from './styles.module.scss';

interface PropsI {
  type?: 'ring' | 'ellipsis';
  color?: 'primary' | 'white';
}

const Loader = ({ type: typeP, color: colorP }: PropsI) => {
  const type = typeP || 'ellipsis';
  const color = colorP || 'white';

  switch (type) {
    case 'ellipsis':
      return (
        <div className={styles.clip} data-color={color}>
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
        <div className={styles['lds-ring']} data-color={color}>
          <div></div>
          <div></div>
        </div>
      );
  }
};

export default Loader;
