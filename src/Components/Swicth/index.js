import React, { useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Switch.module.scss";
import { FaSun, FaCircle, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../App";

const cx = classNames.bind(styles);

export default function Switch({afk}) {
  const { theme, setTheme}  = useContext(ThemeContext)
  return (
    <div onClick={() => setTheme(!theme)} style={{ backgroundColor: theme === true ? '#f3a952' : 'rgb(24, 24, 24, 0.8)',opacity: afk }} className={cx("wrapper")}>
      <FaSun  />
      <FaCircle
        style={{ translate: theme === false ? -20 : 20 }}
        className={cx("dot")}
        fontSize={24}
      />
      <FaMoon  />
    </div>
  );
}
