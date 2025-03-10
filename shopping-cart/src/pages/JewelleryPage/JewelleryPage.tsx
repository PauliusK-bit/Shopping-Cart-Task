import { useEffect } from "react";
import { useCart } from "../CartPage/CartPageContextProvider";

const JewelleryPage = () => {
  const { productsList, fetchProducts, addProduct } = useCart();

  useEffect(() => {
    fetchProducts("jewellery");
  }, []);

  return (
    <div>
      <h1>Jewellery</h1>
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

export default JewelleryPage;
