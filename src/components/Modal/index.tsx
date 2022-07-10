import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface PropsI {
  children: ReactNode;
  onClose: () => void;
}
const Modal = ({ children, onClose }: PropsI) => {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div
        onClick={e => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
