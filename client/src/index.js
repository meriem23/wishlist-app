import { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider, useSelector, useDispatch } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

const ParentApp = ({ children }) => {
  const { isLoadingUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, []);
  return isLoadingUser && token ? <p>Loading</p> : children;
};
ReactDOM.render(
  <Provider store={store}>
    <ParentApp>
      <App />
    </ParentApp>
  </Provider>,
  document.getElementById("root")
);
