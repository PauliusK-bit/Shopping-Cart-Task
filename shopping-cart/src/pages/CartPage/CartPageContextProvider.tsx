import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import {
  CartActionTypes,
  cartInitialState,
  cartReducer,
  CartState,
  Product,
} from "./cartReducer";
import axios from "axios";
import { API_URL } from "../../components/config";

interface CartPageContextType extends CartState {
  addProduct: (product: Product) => void;
  removeProduct: (id: Product["id"]) => void;
  clearCart: () => void;
  updateQuantity: (id: Product["id"], quantity: number) => void;
  fetchProducts: (category: string) => void;
}

const CartPageContext = createContext<CartPageContextType | undefined>(
  undefined
);

type CartPageContextProviderProps = {
  children: ReactNode;
};

export const CartPageContextProvider: React.FC<
  CartPageContextProviderProps
> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const fetchProducts = useCallback(async (category: string) => {
    dispatch({ type: CartActionTypes.FETCH });
    try {
      const response = await axios.get(`${API_URL}/products`);
      const filteredProducts = response.data.filter(
        (product: Product) => product.category === category
      );
      dispatch({ type: CartActionTypes.SUCCESS, payload: filteredProducts });
    } catch (error) {
      dispatch({
        type: CartActionTypes.FAIL,
        payload: "Failed to fetch products",
      });
    }
  }, []);

  return (
    <CartPageContext.Provider value={{ ...state, fetchProducts }}>
      {children}
    </CartPageContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartPageContext);

  if (!ctx) {
    throw new Error(
      "useCart cannot be used outside the CartPageContextProvider"
    );
  }

  return ctx;
};
