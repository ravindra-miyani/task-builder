import { createStore } from "redux";
import themeModeReducer from "./reducers/themeModeReducer";

const store = createStore(themeModeReducer);

export default store;
