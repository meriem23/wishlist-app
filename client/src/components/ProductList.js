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
          <p>{prod.pDesc}</p>
          <p>{prod.pName}</p>
          <p>{prod.pStatus}</p>
          <img src={prod.pImage} alt={prod.prodDesc} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
