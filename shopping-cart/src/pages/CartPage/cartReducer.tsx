export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

export interface Category {
  mensClothing: string;
  womenCloting: string;
  jewellery: string;
  shoes: string;
  pants: string;
  electronics: string;
}

export interface CartProduct extends Product {
  quantity: number;
}

export interface Discount {
  title: string;
  dicount: number;
}

export interface CartState {
  productsList: Product[];
  cart: CartProduct[];
  categories: string[];
  loading: boolean;
  error: string;
}

export enum CartActionTypes {
  ADD_ITEM = "addItem",
  REMOVE_ITEM = "removeItem",
  CLEAR_CART = "clearCart",
  UPDATE_QUANTITY = "updateQuantity",
  FETCH = "fetch",
  FAIL = "fail",
  SUCCESS = "success",
}

export type CartAction =
  | { type: CartActionTypes.ADD_ITEM; payload: Product }
  | { type: CartActionTypes.REMOVE_ITEM; payload: Product["id"] }
  | { type: CartActionTypes.CLEAR_CART }
  | {
      type: CartActionTypes.UPDATE_QUANTITY;
      payload: { id: Product["id"]; quantity: number };
    }
  | { type: CartActionTypes.FETCH }
  | { type: CartActionTypes.SUCCESS; payload: Product[] }
  | { type: CartActionTypes.FAIL; payload: string };

export const cartInitialState: CartState = {
  cart: [],
  productsList: [],
  categories: [],
  loading: false,
  error: "",
};

export const cartReducer = (
  state: CartState,
  action: CartAction
): CartState => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM: {
      const { cart } = state;
      const newProduct = action.payload;
      const { id } = newProduct;

      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        const updatedCart = cart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        const updatedProduct: CartProduct = { ...newProduct, quantity: 1 };
        const updatedCart = [...cart, updatedProduct];

        return {
          ...state,
          cart: updatedCart,
        };
      }
    }

    case CartActionTypes.REMOVE_ITEM: {
      const removeItemId = action.payload;
      const updatedCart = state.cart.filter((item) => item.id !== removeItemId);

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case CartActionTypes.CLEAR_CART: {
      return {
        ...state,
        cart: [],
      };
    }

    case CartActionTypes.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;

      const updatedCart = state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );

      return {
        ...state,
        cart: updatedCart,
      };
    }

    case CartActionTypes.FETCH:
      return {
        ...state,
        loading: true,
        error: "",
      };

    case CartActionTypes.SUCCESS:
      return {
        ...state,
        loading: false,
        productsList: action.payload,
      };

    case CartActionTypes.FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
