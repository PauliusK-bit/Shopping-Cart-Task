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
  CartProduct,
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
  cart: CartProduct[];
  fetchCart: () => void;
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
  const { cart } = state;

  const fetchProducts = useCallback(async (category: string) => {
    dispatch({ type: CartActionTypes.FETCH });
    try {
      const { data } = await axios.get(`${API_URL}/products`);
      const filteredProducts = data.filter(
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

  const addProduct = useCallback(async (product: Product) => {
    try {
      const { data } = await axios.post(`${API_URL}/cart`, product);

      dispatch({ type: CartActionTypes.ADD_ITEM, payload: data });
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/cart`);

        if (Array.isArray(data) && data.length > 0) {
          data.forEach((product: Product) => {
            dispatch({ type: CartActionTypes.ADD_ITEM, payload: product });
          });
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchCart();
  }, []);

  const removeProduct = async (productId: string) => {
    try {
      const { data } = await axios.delete(`${API_URL}/cart/${productId}`);
      dispatch({ type: CartActionTypes.REMOVE_ITEM, payload: productId });
      console.log("Produktas pašalintas iš krepšelio:", data);
    } catch (error) {
      console.error("Something  went wrong:", error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) return;

    try {
      const { data } = await axios.patch(`${API_URL}/cart/${productId}`, {
        quantity,
      });
      dispatch({ type: CartActionTypes.UPDATE_QUANTITY, payload: data });
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearCart = () => {
    dispatch({ type: CartActionTypes.CLEAR_CART });
  };

  // const clearCart = async () => {
  //   try {
  //     const { data } = await axios.delete(`${API_URL}/cart`);
  //     dispatch({ type: CartActionTypes.CLEAR_CART });
  //   } catch (error) {
  //     console.error("Nepavyko išvalyti krepšelio iš serverio:", error);
  //   }
  // };

  return (
    <CartPageContext.Provider
      value={{
        ...state,
        fetchProducts,
        addProduct,
        cart,
        removeProduct,
        updateQuantity,
        clearCart,
      }}
    >
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
