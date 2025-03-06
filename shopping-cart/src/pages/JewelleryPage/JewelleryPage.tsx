import { useEffect } from "react";
import { useCart } from "../CartPage/CartPageContextProvider";

const JewelleryPage = () => {
  const { productsList, fetchProducts } = useCart();

  console.log(productsList);

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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JewelleryPage;
