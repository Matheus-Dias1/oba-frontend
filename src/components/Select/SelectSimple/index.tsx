import ReactSelect, { ActionMeta } from 'react-select';
import { SELECT_STYLES } from '../selectStyles';

interface PropsI {
  placeholder?: string;
  onChange: (newValue: any) => void;
  options?: { value: string; label: string }[];
  loading?: boolean;
  disabled?: boolean;
  noOptionsText?: string;
  value: any;
}

const SelectSimple = ({
  onChange,
  options,
  placeholder,
  loading,
  disabled,
  noOptionsText,
  value,
}: PropsI) => {
  return (
    <ReactSelect
      value={value}
      options={options}
      onChange={onChange}
      placeholder={placeholder || ''}
      styles={SELECT_STYLES}
      isLoading={loading}
      isDisabled={disabled}
      loadingMessage={() => 'Carregando...'}
      noOptionsMessage={() => noOptionsText || 'Nenhuma opção'}
    />
  );
};

export default SelectSimple;
