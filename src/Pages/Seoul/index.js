import React, { useContext, useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Seoul.module.scss";
import { ThemeContext } from "../../App";
import { Tooltip } from "antd";
import day from "../../Assets/Video/main-bg-day.mp4";
import night from "../../Assets/Video/main-bg-night.mp4";
import dayRain from "../../Assets/Video/main-bg-day-rain.mp4";
import nightRain from "../../Assets/Video/main-bg-night-rain.mp4";
import rainAudio from "../../Assets/Sound/city-rain.mp3";
import keyBoard from "../../Assets/Sound/keyboard.mp3";
import Loading from "../../Components/Loading";

const cx = classNames.bind(styles);

export default function Seoul({ afk }) {
  const { theme } = useContext(ThemeContext);
  const [rain, setRain] = useState(false);
  const [keyboard, setKeyboard] = useState(false);
  const myRef = useRef();
  const keyBoardRef = useRef();
  const [video, setVideo] = useState(day);
  const [isLoading, setIsLoading] = useState(false);

  const startAudio = () => {
    myRef.current.play();
  };

  const pauseAudio = () => {
    myRef.current.pause();
  };

  const handleVolumeRain = (e) => {
    myRef.current.volume = e.target.value;
    if (e.target.value < 0.1) {
      setRain(false);
    } else setRain(true);
  };

  const handleVolumeKeyboard = (e) => {
    keyBoardRef.current.volume = e.target.value;
  };

  const startKeyboardAudio = () => {
    keyBoardRef.current.play();
  };

  const pauseKeyboardAudio = () => {
    keyBoardRef.current.pause();
  };

  useEffect(() => {
    const handleBg = () => {
      if (theme && rain === false) {
        setVideo(day);
      }
      if (theme === false && rain === false) {
        setVideo(night);
      }
      if (theme && rain === true) {
        setVideo(dayRain);
      }
      if (theme === false && rain === true) {
        setVideo(nightRain);
      }
    };
    handleBg();
  }, [rain, theme]);

  return (
    <div className={cx("wrapper")}>
       {isLoading  && <Loading />}
      <video
        autoPlay
        muted
        loop
        controlsList="nodownload"
        className={cx("bg-video")}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        src={video}
      ></video>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>CityRain</b>
            {rain && (
              <input
                onChange={handleVolumeRain}
                min="0"
                max="1"
                step="0.1"
                type="range"
              />
            )}
          </div>
        }
        placement="bottom"
        showArrow={false}
        color="rgba(24, 24, 24, 0.6)"
      >
        <span
          style={{ top: "30%", left: "60%", opacity: afk }}
          onClick={() => {
            setRain(!rain);
            if (rain) {
              pauseAudio();
            } else startAudio();
          }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>KeyBoard</b>
            {keyboard && (
              <input
                onChange={handleVolumeKeyboard}
                min="0"
                max="1"
                step="0.1"
                type="range"
              />
            )}
          </div>
        }
        placement="right"
        showArrow={false}
        color="rgba(24, 24, 24, 0.6)"
      >
        <span
          onClick={() => {
            setKeyboard(!keyboard);
            if (keyboard) {
              pauseKeyboardAudio();
            } else startKeyboardAudio();
          }}
          style={{ top: "70%", left: "44%", opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <audio loop ref={myRef} src={rainAudio} />
      <audio loop ref={keyBoardRef} src={keyBoard} />
    </div>
  );
}
