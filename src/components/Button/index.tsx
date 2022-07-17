import Loader from '../Loader';
import styles from './styles.module.scss';

interface PropsI {
  title?: string;
  loading?: boolean;
  onClick: Function;
  variant?: 'solid' | 'leaked';
  disabled?: boolean;
  fit?: boolean;
}

const Button = ({
  title: titleP,
  loading,
  onClick,
  variant: variantP,
  disabled,
  fit,
}: PropsI) => {
  const title = titleP || '';
  const variant = variantP || 'solid';

  const getButtonClasses = () => {
    const buttonClasses: string[] = [styles.button];
    buttonClasses.push(styles[variant]);
    if (fit) buttonClasses.push(styles.fit);
    return buttonClasses.join(' ');
  };

  const handleClick = () => {
    if (!loading) onClick();
  };

  return (
    <button
      className={getButtonClasses()}
      onClick={handleClick}
      disabled={disabled}
      data-loading={loading}
    >
      {loading ? <Loader color={variant === 'leaked' ? 'primary' : 'white'} /> : title}
    </button>
  );
};

export default Button;
