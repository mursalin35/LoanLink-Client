import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const NavBar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? <MdLightMode /> : <MdOutlineLightMode />}
    </button>
  );
};
