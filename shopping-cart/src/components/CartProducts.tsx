import { useCart } from "../pages/CartPage/CartPageContextProvider";
import { CartProduct } from "../pages/CartPage/cartReducer";

type CartItemProps = {
  data: CartProduct;
};

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const { updateQuantity, removeProduct } = useCart();
  const { title, id, quantity, price } = data;

  return (
    <div>
      <h3>{title}</h3>
      <p>
        Price: €{price} Amount: {quantity} = €{price * quantity}
      </p>

      <button
        onClick={() => updateQuantity(id, quantity - 1)}
        disabled={quantity <= 1}
      >
        -
      </button>

      <button onClick={() => updateQuantity(id, quantity + 1)}>+</button>
      <button onClick={() => removeProduct(id)}>Remove From Cart</button>
    </div>
  );
};

export default CartItem;
