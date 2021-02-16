import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, deleteProduct } from "../actions/productActions";
import { DeleteOutlined } from "@ant-design/icons";

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const deleteOneProduct = (id) => {
    dispatch(deleteProduct(id));
  };
  const { products } = useSelector((state) => state.product);
  return (
    <div>
      {products.map((product, i) => (
        <div key={i}>
          <p>{product.Description}</p>
          <p>{product.Name}</p>
          <p>{product.Status}</p>
          <img src={product.Image} alt={product.Description} />
          <DeleteOutlined
            onClick={() => {
              deleteOneProduct(product._id);
            }}
            style={{ color: "red", fontSize: "20px" }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
