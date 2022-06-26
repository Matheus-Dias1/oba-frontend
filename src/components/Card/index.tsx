import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface PropsI {
  children: ReactNode;
  padding?: boolean;
}

const Card = ({ children, padding }: PropsI) => {
  return (
    <div
      className={styles.card}
      data-padding={padding === undefined ? true : padding}
    >
      {children}
    </div>
  );
};

export default Card;
