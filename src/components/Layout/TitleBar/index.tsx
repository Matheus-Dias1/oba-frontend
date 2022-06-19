import styles from './styles.module.scss';
import MaximizeIcon from '../../../assets/icons/window/maximize.svg';
import MinimizeIcon from '../../../assets/icons/window/minimize.svg';
import RestoreIcon from '../../../assets/icons/window/restore.svg';
import CloseIcon from '../../../assets/icons/window/close.svg';
import { WindowAction } from '../../../@types/bridge.d';
import { useState } from 'react';

export const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const handleWindowAction = (action: WindowAction) => {
    if ([WindowAction.MAXIMIZE, WindowAction.RESTORE].includes(action))
      setIsMaximized(x => !x);
    window.Main.resizeWindow(action);
  };
  return (
    <div className={styles['title-bar']}>
      <p>OBA GREEN</p>
      <div className={styles['window-actions']}>
        <button onClick={() => handleWindowAction(WindowAction.MINIMIZE)}>
          <MinimizeIcon className={styles.icon} />
        </button>
        {isMaximized ? (
          <button onClick={() => handleWindowAction(WindowAction.RESTORE)}>
            <RestoreIcon className={styles.icon} />
          </button>
        ) : (
          <button onClick={() => handleWindowAction(WindowAction.MAXIMIZE)}>
            <MaximizeIcon className={styles.icon} />
          </button>
        )}
        <button onClick={() => handleWindowAction(WindowAction.CLOSE)}>
          <CloseIcon className={styles.icon} />
        </button>
      </div>
    </div>
  );
};
