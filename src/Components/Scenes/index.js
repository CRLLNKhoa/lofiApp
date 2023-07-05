import React, {useContext} from "react";
import styles from "./Scenes.module.scss";
import classNames from "classnames/bind";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import { Link } from "react-router-dom";
import { CloseContext } from "../Menu";
import seoul from "../../Assets/Imgs/main-bg.png"
import tokyo from "../../Assets/Imgs/kyoto-bg.png"
import chill from "../../Assets/Imgs/chill-bg.png"
import van from "../../Assets/Imgs/van-set-bg.png"
import bookcafe from "../../Assets/Imgs/exterior-bg.png"
import cafe from "../../Assets/Imgs/cafe-set-bg.png"
import honolulu from "../../Assets/Imgs/honolulu-bg.png"

const cx = classNames.bind(styles);

const dataScenes = [
  {
    src: seoul,
    to: "/",
  },
  {
    src: tokyo,
    to: "/tokyo",
  },
  {
    src: van,
    to: "/van",
  },
  {
    src: honolulu,
    to: "/honolulu",
  },
  {
    src: bookcafe,
    to: "/book-cafe",
  },
  {
    src: cafe,
    to: "/cafe-lofi",
  },
  {
    src: chill,
    to: "/chill-vibes",
  },
];

export default function Scenes() {
    const {setOpenScenes} = useContext(CloseContext)
  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h2>SCENES</h2>
        <MdOutlineCloseFullscreen onClick={() => setOpenScenes(false)} style={{cursor: 'pointer'}} />
      </div>

      <div className={cx('list')}>
        {dataScenes.map((item, index) => (
          <Link to={item.to} key={index}>
            <img className={cx("img")} alt={item.to} src={item.src} />
          </Link>
        ))}
      </div>
    </div>
  );
}
