import { useState, ReactNode, createContext } from 'react';

export enum PagesEnum {
    // Batches
    BATCHES = 'batches',
    BATCH_DETAILS = 'batchDetails',
    // Orders
    ORDERS = 'orders',
    EDIT_ORDER = 'editOrder',
    // Products
    PRODUCTS = 'products',
    EDIT_PRODUCT = 'editProduct'
}

const NavContext = createContext<{
    location: {
        page: PagesEnum,
        id?: string;
    },
    setLocation: ({page, id}: {page: PagesEnum, id?: string}) => void
}>({
  location: {
    page: PagesEnum.BATCHES,
  },
  setLocation: ({page, id}: {page: PagesEnum, id?: string}) => {},
});

interface IProps {
  children: ReactNode;
}

export const NavContextProvider = ({ children }: IProps) => {
  const [location, setLocation] = useState<{
    page: PagesEnum,
    id?: string
  }>({page: PagesEnum.BATCHES });

  return (
    <NavContext.Provider value={{location, setLocation}}>{children}</NavContext.Provider>
  );
};

export default NavContext;
