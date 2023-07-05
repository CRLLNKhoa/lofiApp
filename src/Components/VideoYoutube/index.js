import React,{useContext} from "react";
import styles from "./VideoYoutube.module.scss";
import classNames from "classnames/bind";
import Draggable from "react-draggable";
import { IoMdClose } from "react-icons/io";
import {CgSearch} from 'react-icons/cg'
import YouTube from "react-youtube";
import { CloseContext } from "../Menu";

const cx = classNames.bind(styles);

const opts = {
    height: '262px',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

export default function VideoYoutube({idVideo}) {
    const {setVideo,setOpen} = useContext(CloseContext)
  return (
    <Draggable>
      <div className={cx("wrapper")}>
        <div className={cx('header')}>
            <CgSearch style={{cursor: 'pointer'}} onClick={() => {setVideo(false);setOpen(true)}}  />
            <IoMdClose style={{cursor: 'pointer'}} onClick={() => setVideo(false)} />
        </div>
        <YouTube onError={() => {setVideo(false);setOpen(true)}} videoId={idVideo} opts={opts} />
      </div>
    </Draggable>
  );
}
