import { useSelector } from "react-redux";
import UserAvatar from "../components/UserAvatar";
import ProductList from "../components/ProductList";
import WishlistModal from "../components/WishlistModal";
import ProductAdd from "../components/ProductAdd";
import Wishlist from "../components/Wishlist";
const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user && (
        <div>
          <UserAvatar />
          {/* <WishlistModal /> */}
          {/* <Wishlist /> */}
          <ProductAdd />
          <ProductList />
        </div>
      )}
    </div>
  );
};

export default Home;
