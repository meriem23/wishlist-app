import { useSelector } from "react-redux";
import UserAvatar from "../components/UserAvatar";
const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {user && (
        <div>
          <UserAvatar />
        </div>
      )}
    </div>
  );
};

export default Home;
