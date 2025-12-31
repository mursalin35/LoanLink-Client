import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useTheme = () => {
  const themeInfo = useContext(ThemeContext);
  return themeInfo;
};

export default useTheme;

// // this Theme how is it use
// const { theme, toggleTheme } = useTheme();

// <button onClick={toggleTheme}>
//   {theme === "dark" ? <MdLightMode /> : <MdOutlineLightMode />}
// </button>;
