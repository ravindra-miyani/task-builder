import { SET_THEME_MODE } from "../actionTypes/actionTypes";

const setThemeMode = (mode) => {
  let payload = {
    themeMode: mode,
  };

  localStorage.setItem("themeMode", mode);

  return {
    type: SET_THEME_MODE,
    payload,
  };
};

export { setThemeMode };
