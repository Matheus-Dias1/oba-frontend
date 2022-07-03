import { AsyncPaginate } from 'react-select-async-paginate';
import { ActionMeta } from 'react-select';
import { SELECT_STYLES } from '../selectStyles';

type simpleValue = number | string | boolean;

interface PropsI {
  placeholder?: string;
  onChange: (newValue: any, actionMeta?: ActionMeta<simpleValue>) => void;
  loadOptions: (
    query: string,
    loadedOptions: any
  ) => Promise<{ options: any; hasMore: boolean }>;
  value?: any;
}

const SelectPaginate = ({
  onChange,
  loadOptions,
  placeholder,
  value,
}: PropsI) => {
  return (
    <AsyncPaginate
      value={value}
      loadOptions={loadOptions}
      onChange={onChange}
      placeholder={placeholder || ''}
      styles={SELECT_STYLES}
      loadingMessage={() => 'Carregando...'}
    />
  );
};

export default SelectPaginate;
