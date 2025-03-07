import { useEffect } from "react";
import { useCart } from "../CartPage/CartPageContextProvider";

const PantsPage = () => {
  const { productsList, addProduct, fetchProducts } = useCart();

  useEffect(() => {
    fetchProducts("pants");
  }, []);

  return (
    <div>
      <h1>Pants</h1>
      <ul>
        {productsList.map((product) => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.price} €</p>
            <img src={product.image} alt={product.title} width="100" />
            <button onClick={() => addProduct(product)}>Add to cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PantsPage;
