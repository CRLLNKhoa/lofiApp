import React, { useState} from "react";
import classNames from "classnames/bind";
import styles from "./Music.module.scss";
import { RiFullscreenFill, RiFullscreenExitLine } from "react-icons/ri";
import { Tooltip } from "antd";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const cx = classNames.bind(styles);

export default function Music({ listSong,afk }) {
  const [full, setFull] = useState(false);
  const [id, setId] = useState(0);

  const nextSong = () => {
    if (id < listSong.length) {
      setId(id + 1);
    }
    if (id >= listSong.length - 1) {
      setId(0);
    }
  };

  const prevSong = () => {
    if (id !== 0) {
      setId(id - 1);
    }
    if (id < 0) setId(listSong.length);
  };

  return (
    <div style={{opacity: afk}} className={cx("wrapper")}>
      <AudioPlayer
        autoPlay
        src={listSong[id].src}
        onPlay={(e) => console.log("onPlay")}
        style={{ width: '100%', marginRight: 20,height:60}}
        showSkipControls
        showJumpControls={false}
        onClickNext={nextSong}
        onClickPrevious={prevSong}
        onEnded={nextSong}
        autoPlayAfterSrcChange={true}
        layout="horizontal"
        // other props here
      />
      {/* <div className={cx("action")}>
        <Tooltip title={<b>PREV</b>}>
          <button onClick={() => prevSong()} className={cx("btn")}>
            <MdSkipPrevious />
          </button>
        </Tooltip>
        <Tooltip title={<b>PAUSE</b>}>
          <button className={cx("btn")}>
            <MdPause />
          </button>
        </Tooltip>
        <Tooltip title={<b>NEXT</b>}>
          <button onClick={() => nextSong()} className={cx("btn")}>
            <MdSkipNext />
          </button>
        </Tooltip>
      </div> */}
      <div className={cx("action")}>
        {full === false ? (
          <Tooltip title={<b>FULL SCREEN</b>}>
            <button
              onClick={() => {
                document.documentElement.requestFullscreen();
                setFull(true);
              }}
              className={cx("btn-1")}
            >
              <RiFullscreenFill />
            </button>
          </Tooltip>
        ) : (
          <Tooltip title={<b>EXIT</b>}>
            <button
              onClick={() => {
                document.exitFullscreen();
                setFull(false);
              }}
              className={cx("btn-1")}
            >
              <RiFullscreenExitLine />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
