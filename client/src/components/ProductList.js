import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const { products } = useSelector((state) => state.product);
  return (
    <div>
      {products.map((prod) => (
        <div>
          <p>{prod.prodDesc}</p>
          <p>{prod.prodName}</p>
          <p>{prod.prodStatus}</p>
          <p>{prod.addProdDate}</p>
          <img src={prod.prodImage} alt={prod.prodDesc} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
