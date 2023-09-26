import { SET_THEME_MODE } from "../actionTypes/actionTypes";

const themeModePreference = localStorage.getItem("themeMode"); // getting user preference theme mode.
const initialState = {
  themeMode: themeModePreference ? themeModePreference : "light",
};

export default function themeModeReducer(state = initialState, action) {
  switch (action.type) {
    case SET_THEME_MODE:
      return {
        ...state,
        themeMode: action.payload.themeMode,
      };
    default:
      return state;
  }
}
