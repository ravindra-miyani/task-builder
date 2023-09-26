import { Provider } from "react-redux";
import store from "./store";
import Base from "./components/Base";

function App() {
  return (
    <Provider store={store}>
      <Base></Base>
    </Provider>
  );
}

export default App;
