import { createContext } from "react";

const ThemeContext = createContext(["green", () => {}]); //just as hooks 2nd thing will be empty func

export default ThemeContext;
