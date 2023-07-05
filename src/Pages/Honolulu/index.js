import React, { useContext,useRef,useState } from "react";
import classNames from "classnames/bind";
import styles from "./Honolulu.module.scss";
import { ThemeContext } from "../../App";
import { Tooltip } from "antd";
import waterSound from '../../Assets/Sound/water.mp3'
import pagesSound from '../../Assets/Sound/pages.mp3'
import day from '../../Assets/Video/enviroment-day.mp4'
import night from '../../Assets/Video/enviroment-night.mp4'
import Loading from "../../Components/Loading";

const cx = classNames.bind(styles);

export default function Honolulu({afk}) {
  const { theme } = useContext(ThemeContext);
  const waterRef = useRef();
  const pagesRef = useRef();
  const [water, setWater] = useState(false)
  const [pages, setPages] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const startAudiowaterRef = () => {
    waterRef.current.play();
  };

  const pauseAudiowaterRef = () => {
    waterRef.current.pause();
  };

  const handleVolumewaterRef = (e) => {
    waterRef.current.volume = e.target.value;
  };

  
  const startAudiopagesSound = () => {
    pagesRef.current.play();
  };

  const pauseAudiopagesSound = () => {
    pagesRef.current.pause();
  };

  const handleVolumepagesSound = (e) => {
    pagesRef.current.volume = e.target.value;
  };

  return (
    <div className={cx("wrapper")}>
             {isLoading  && <Loading />}
      <video
        autoPlay
        muted
        loop
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        controlsList="nodownload"
        className={cx("bg-video")}
        src={
          theme
            ? day
            : night
        }
      ></video>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Read Book</b>
            {pages && <input
              onChange={handleVolumepagesSound}
              min="0"
              max="1"
              step="0.1"
              type="range"
            />}
          </div>
        }
        placement="right"
        showArrow={false}
        color="rgba(24, 24, 24, 0.6)"
      >
        <span
           onClick={() => {
            setPages(!pages);
            if (pages) {
              pauseAudiopagesSound();
            } else startAudiopagesSound();
          }}
          style={{ top: "80%", left: "90%",opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Waterfall</b>
            {water && <input
              onChange={handleVolumewaterRef}
              min="0"
              max="1"
              step="0.1"
              type="range"
            />}
          </div>
        }
        placement="right"
        showArrow={false}
        color="rgba(24, 24, 24, 0.6)"
      >
        <span
           onClick={() => {
            setWater(!water);
            if (water) {
              pauseAudiowaterRef();
            } else startAudiowaterRef();
          }}
          style={{ top: "50%", left: "10%",opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <audio loop ref={waterRef} src={waterSound} />
      <audio loop ref={pagesRef} src={pagesSound} />
    </div>
  );
}
