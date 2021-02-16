import { useSelector } from "react-redux";
import UserAvatar from "../components/UserAvatar";
import ProductList from "../components/ProductList";
import WishlistModal from "../components/WishlistModal";
import ProductAdd from "../components/ProductAdd";
const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user && (
        <div>
          <UserAvatar />
          <WishlistModal />
          <ProductAdd />
          {/* <ProductList /> */}
        </div>
      )}
    </div>
  );
};

export default Home;
