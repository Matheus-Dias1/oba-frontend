import styles from './styles.module.scss';

interface PropsI {
  id: string;
}

const Order = ({ id }: PropsI) => {
  const getTitle = () => {
    console.log(id);
    return id;
  };

  return (
    <div className={styles.container}>
      <h1>{getTitle()}</h1>
    </div>
  );
};

export default Order;
