import React, { useContext, useRef, useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Outside.module.scss";
import { ThemeContext } from "../../App";
import { Tooltip } from "antd";
import rainSounds from "../../Assets/Sound/city-rain.mp3";
import forestSounds from "../../Assets/Sound/forestday.mp3";
import birdSounds from "../../Assets/Sound/bird-voices-7716.mp3";
import riverSounds from "../../Assets/Sound/calm-river-ambience-loop-125071.mp3";
import day from "../../Assets/Video/outside.mp4";
import night from "../../Assets/Video/outside-pix.mp4";
import dayRain from "../../Assets/Video/outside-rain.mp4";
import nightRain from "../../Assets/Video/outside-rain-pix.mp4";
import Loading from "../../Components/Loading";

const cx = classNames.bind(styles);

export default function Outside({afk}) {
  const [video, setVideo] = useState(day);
  const { theme } = useContext(ThemeContext);
  const rainRef = useRef();
  const forestRef = useRef();
  const birdRef = useRef();
  const riverRef = useRef();
  const [rain, setRain] = useState(false);
  const [forest, setForest] = useState(false);
  const [bird, setBird] = useState(false);
  const [river, setRiver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startAudiorainRef = () => {
    rainRef.current.play();
  };

  const pauseAudiorainRef = () => {
    rainRef.current.pause();
  };

  const handleVolumerainRef = (e) => {
    rainRef.current.volume = e.target.value;
  };

  const startAudioforestRef = () => {
    forestRef.current.play();
  };

  const pauseAudioforestRef = () => {
    forestRef.current.pause();
  };

  const handleVolumeforestRef = (e) => {
    forestRef.current.volume = e.target.value;
  };

  const startAudiobirdRef = () => {
    birdRef.current.play();
  };

  const pauseAudiobirdRef = () => {
    birdRef.current.pause();
  };

  const handleVolumeCitybirdRef = (e) => {
    birdRef.current.volume = e.target.value;
  };

  const startAudioriverRef = () => {
    riverRef.current.play();
  };

  const pauseAudioriverRef = () => {
    riverRef.current.pause();
  };

  const handleVolumeriverRef = (e) => {
    riverRef.current.volume = e.target.value;
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
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        controlsList="nodownload"
        className={cx("bg-video")}
        src={video}
      ></video>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Bird Chirping</b>
            {bird && (
              <input
                onChange={handleVolumeCitybirdRef}
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
            setBird(!bird);
            if (bird) {
              pauseAudiobirdRef();
            } else startAudiobirdRef();
          }}
          style={{ top: "50%", left: "10%",opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>River</b>
            {river && (
              <input
                onChange={handleVolumeriverRef}
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
            setRiver(!river);
            if (river) {
              pauseAudioriverRef();
            } else startAudioriverRef();
          }}
          style={{ top: "70%", left: "70%",opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Forest</b>
            {forest && (
              <input
                onChange={handleVolumeforestRef}
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
            setForest(!forest);
            if (forest) {
              pauseAudioforestRef();
            } else startAudioforestRef();
          }}
          style={{ top: "40%", left: "80%",opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Rain</b>
            {rain && (
              <input
                onChange={handleVolumerainRef}
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
            setRain(!rain);
            if (rain) {
              pauseAudiorainRef();
            } else startAudiorainRef();
          }}
          style={{ top: "7%", left: "70%", borderColor: theme ? "red" : 'white',opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <audio loop ref={rainRef} src={rainSounds} />
      <audio loop ref={forestRef} src={forestSounds} />
      <audio loop ref={birdRef} src={birdSounds} />
      <audio loop ref={riverRef} src={riverSounds} />
    </div>
  );
}
