import React, {useRef,useState,useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Van.module.scss";
import { Tooltip } from "antd";
import sounds from '../../Assets/Sound/city-rain.mp3'
import fsounds from '../../Assets/Sound/forestday.mp3'
import day from '../../Assets/Video/van.mp4'
import dayRain from '../../Assets/Video/van-rain.mp4'
import Loading from "../../Components/Loading";

const cx = classNames.bind(styles);

export default function Van({afk}) {
  const myRef = useRef();
  const forestRef = useRef();
  const [rain, setRain] = useState(false)
  const [f, setF] = useState(false)
  const [video,setVideo] = useState(day)
  const [isLoading, setIsLoading] = useState(false);

  const startAudioforestRef = () => {
    forestRef.current.play();
  };

  const pauseAudioforestRef = () => {
    forestRef.current.pause();
  };

  const handleVolumeforestRef = (e) => {
    forestRef.current.volume = e.target.value;
  };

  const startAudio = () => {
    myRef.current.play();
  };

  const pauseAudio = () => {
    myRef.current.pause();
  };

  const handleVolumeCity = (e) => {
    myRef.current.volume = e.target.value;
  };

  useEffect(() => {
    const handleBg = () => {
      if (rain === false) {
        setVideo(day);
      }
      if (rain === true) {
        setVideo(dayRain);
      }
    };
    handleBg();
  }, [rain]);

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
        src={
          video
        }
      ></video>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Rain</b>
            {rain && <input
              onChange={handleVolumeCity}
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
            setRain(!rain);
            if (rain) {
              pauseAudio();
            } else startAudio();
          }}
          style={{ top: "30%", left: "60%",opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Forest</b>
            {f && <input
              onChange={handleVolumeforestRef}
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
            setF(!f);
            if (f) {
              pauseAudioforestRef();
            } else startAudioforestRef();
          }}
          style={{ top: "30%", left: "45%",opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <audio loop ref={myRef} src={sounds} />
      <audio loop ref={forestRef} src={fsounds} />
    </div>
  );
}
