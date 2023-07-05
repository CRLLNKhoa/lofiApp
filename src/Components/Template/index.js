import React, { useContext } from "react";
import styles from "./Template.module.scss";
import classNames from "classnames/bind";
import chillImg from "../../Assets/Imgs/chill.png";
import focus from "../../Assets/Imgs/focus.png";
import sleep from "../../Assets/Imgs/sleep.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../App";
import { CloseContext } from "../Menu";

const cx = classNames.bind(styles);

export default function Template() {
  const { chill, jazz, sleepy, setSongs } = useContext(ThemeContext);
  const {setOpenTemplate} = useContext(CloseContext)

  return (
    <div className={cx("wrapper")}>
      <h2>Playlists</h2>
      <div className={cx("list")}>
        <Link to='/outside' onClick={() => {setSongs(chill);setOpenTemplate(false)}}>
          <img src={chillImg}  alt="i" />
        </Link>
        <Link to="/inside-cafe" onClick={() => {setSongs(jazz);setOpenTemplate(false)}}>
          <img src={focus} alt="i" />
        </Link>
        <Link onClick={() => {setSongs(sleepy);setOpenTemplate(false)}} to="/van" >
          <img src={sleep} alt="i" />
        </Link>
      </div>
    </div>
  );
}
