import CartItem from "../../components/CartProducts";
import { useCart } from "./CartPageContextProvider";

const Cart: React.FC = () => {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <h2>Cart is empty</h2>
      </div>
    );
  }

  const finalPrice = cart.reduce(
    (sum, currentProduct) =>
      sum + currentProduct.price * currentProduct.quantity,
    0
  );

  return (
    <div>
      <h2>Cart</h2>

      <p>Final Price: €{finalPrice}</p>

      <div>
        {cart.map((item) => (
          <CartItem key={item.id} data={item} />
        ))}
      </div>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;
