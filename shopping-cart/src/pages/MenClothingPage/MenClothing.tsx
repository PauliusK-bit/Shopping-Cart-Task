import { useEffect } from "react";
import { useCart } from "../CartPage/CartPageContextProvider";

const MenClothingPage = () => {
  const { productsList, fetchProducts, addProduct } = useCart();

  useEffect(() => {
    fetchProducts("men's clothing");
  }, []);

  return (
    <div>
      <h1>Men's Clothing</h1>
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

export default MenClothingPage;
