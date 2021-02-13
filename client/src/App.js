import { BrowserRouter, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from './PrivateRoute'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/home" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
