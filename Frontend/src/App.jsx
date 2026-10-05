import { Provider } from "react-redux";
import AuthInitializer from "./redux/AuthInitializer";
import { store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <AuthInitializer />
    </Provider>
  );
};

export default App;
