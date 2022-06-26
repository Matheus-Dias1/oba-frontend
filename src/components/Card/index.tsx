import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface PropsI {
  children: ReactNode;
  padding?: boolean;
  onClick?: Function;
}

const Card = ({ children, padding, onClick }: PropsI) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  return (
    <div
      className={styles.card}
      data-padding={padding === undefined ? true : padding}
      data-clickable={!!onClick}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Card;
