import styles from './styles.module.scss';
import CancelIcon from '../../assets/icons/actions/cancel.svg';
import ConfirmIcon from '../../assets/icons/actions/confirm.svg';
import AddIcon from '../../assets/icons/actions/add.svg';
import DownloadIcon from '../../assets/icons/actions/download.svg';
import FilterIcon from '../../assets/icons/actions/filter.svg';
import { ReactNode } from 'react';
import Loader from '../Loader';

interface PropsI {
  type: 'cancel' | 'ok' | 'add' | 'download' | 'filter';
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const ButtonRound = ({ type, onClick, disabled, loading }: PropsI) => {
  const getIconAndColor = (): [node: ReactNode, type: 'red' | 'primary'] => {
    switch (type) {
      case 'cancel':
        return [<CancelIcon />, 'red'];
      case 'ok':
        return [<ConfirmIcon />, 'primary'];
      case 'add':
        return [<AddIcon />, 'primary'];
      case 'download':
        return [<DownloadIcon />, 'primary'];
      case 'filter':
        return [<FilterIcon />, 'primary'];
    }
  };

  const handleClick = () => {
    if (!loading) onClick();
  };

  const [icon, bg] = getIconAndColor();
  const classes = [
    styles.button,
    styles[bg],
    loading ? styles.loading : '',
  ].join(' ');

  return (
    <button className={classes} disabled={disabled} onClick={handleClick}>
      {loading ? <Loader type="ring" /> : icon}
    </button>
  );
};

export default ButtonRound;
