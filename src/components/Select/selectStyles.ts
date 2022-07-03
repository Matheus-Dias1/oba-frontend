export const SELECT_STYLES = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderRadius: 0,
    border: 'none',
    borderBottom: `solid 2px ${state.isFocused ? '#265948' : '#afafaf'}`,
    boxShadow: 'none',
    transition: 'border-bottom-color 200ms ease-in-out',

    '&:hover': {
      borderBottom: `solid 2px ${state.isFocused ? '#265948' : '#afafaf'}`,
    },
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#132d24' : 'auto',
    '&:active': {
      backgroundColor: '#132d24',
      color: 'white',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontSize: '1.2em',
    fontWeight: 500,
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontSize: '1.2em',
    fontWeight: 500,
    color: '#afafaf',
  }),
};
