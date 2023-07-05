import React, { useState, createContext, useContext } from "react";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";
import { TbTools } from "react-icons/tb";
import {
  RiTimerFill,
  RiSoundModuleFill,
  RiLayoutMasonryLine,
} from "react-icons/ri";
import { WiMoonAltWaningCrescent1 } from "react-icons/wi";
import { Tooltip } from "antd";
import { AiFillYoutube } from "react-icons/ai";
import Draggable from "react-draggable";
import { IoMdClose } from "react-icons/io";
import VideoYoutube from "../VideoYoutube";
import Timer from "../Timer";
import Scenes from "../Scenes";
import Template from "../Template";
import { ThemeContext } from "../../App";
import {FaUserCircle} from 'react-icons/fa'
import {IoLogoGameControllerB} from 'react-icons/io'


const cx = classNames.bind(styles);
export const CloseContext = createContext();

export default function Menu({hidden}) {
  const [open, setOpen] = useState(false);
  const [openScenes, setOpenScenes] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [link, setLink] = useState("");
  const [video, setVideo] = useState(false);
  const [height, setHeight] = useState(200);
  const [openTimer, setOpenTimer] = useState(false);
  const {setSongs} = useContext(ThemeContext)

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setLink(e.target.value);
      setOpen(false);
      setVideo(true);
    }
  };
  
  return (
    <div style={{opacity: hidden}} className={cx("wrapper")}>
      <div className={cx("list")}>
        <Tooltip placement="left" title={<b>COMING SOON</b>}>
          <RiSoundModuleFill className={cx("icon")} />
        </Tooltip>
        <Tooltip placement="left" title={<b>TEMPLATE</b>}>
          <RiLayoutMasonryLine onClick={() => setOpenTemplate(!openTemplate)} className={cx("icon")} />
        </Tooltip>
        <Tooltip placement="left" title={<b>SCENES</b>}>
          <WiMoonAltWaningCrescent1 onClick={() => {setOpenScenes(!openScenes)}} className={cx("icon")} />
        </Tooltip>
        <Tooltip placement="left" title={<b>TOOLS</b>}>
          <TbTools
            onClick={() => {
              setOpenScenes(false)
              if (height === 0) {
                setHeight(200);
              } else setHeight(0);
            }}
            className={cx("icon")}
          />
        </Tooltip>
      </div>
      <div style={{ height: height }} className={cx("list", "collapse")}>
        <span className={cx("line")}></span>
        <Tooltip placement="left" title={<b>YOUTUBE</b>}>
          <AiFillYoutube onClick={() => setOpen(true)} className={cx("icon")} />
        </Tooltip>
        <Tooltip
          onClick={() => setOpenTimer(!openTimer)}
          placement="left"
          title={<b>TIMER</b>}
        >
          <RiTimerFill className={cx("icon")} />
        </Tooltip>
        <Tooltip placement="left" title={<b>COMING SOON</b>}>
          <FaUserCircle className={cx("icon")} />
        </Tooltip>
        <Tooltip placement="left" title={<b>COMING SOON</b>}>
          <IoLogoGameControllerB className={cx("icon")} />
        </Tooltip>
      </div>
      {open && (
        <Draggable>
          <div className={cx("link-ytb")}>
            <input
              onKeyPress={handleKeyPress}
              type="text"
              placeholder="Paste a Youtube video URL here and press enter"
            />
            <IoMdClose
              style={{
                marginLeft: 10,
                color: "#949494",
                cursor: "pointer",
                fontWeight: "bold",
              }}
              onClick={() => setOpen(false)}
            />
          </div>
        </Draggable>
      )}

      <CloseContext.Provider value={{ setVideo, setOpen }}>
        {video && <VideoYoutube idVideo={link.slice(-11)} />}
      </CloseContext.Provider>

      <CloseContext.Provider value={{ setOpenTimer }}>
        {openTimer && <Timer />}
      </CloseContext.Provider>

      <CloseContext.Provider value={{ setOpenScenes }}>
        {openScenes && <Scenes />}
      </CloseContext.Provider>

      <CloseContext.Provider value={{setOpenTemplate}}>{openTemplate && <Template />}</CloseContext.Provider>
    </div>
  );
}
