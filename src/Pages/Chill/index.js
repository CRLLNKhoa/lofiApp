import React, { useContext, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Chill.module.scss";
import { ThemeContext } from "../../App";
import { Tooltip } from "antd";
import nightSound from "../../Assets/Sound/night.mp3";
import fireSound from "../../Assets/Sound/fire.mp3";
import cityTraffic from "../../Assets/Sound/city-traffic.mp3";
import day from "../../Assets/Video/lvr-day.mp4";
import night from "../../Assets/Video/lvr-night.mp4";
import Loading from "../../Components/Loading";

const cx = classNames.bind(styles);

export default function Chill({afk}) {
  const { theme } = useContext(ThemeContext);
  const cityRef = useRef();
  const nightRef = useRef();
  const FireRef = useRef();
  const [city, setCity] = useState(false);
  const [fire, setFire] = useState(false);
  const [nightState, setNight] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startcityRef = () => {
    cityRef.current.play();
  };

  const pausecityRef = () => {
    cityRef.current.pause();
  };

  const handleVolumecityRef = (e) => {
    cityRef.current.volume = e.target.value;
  };

  const startnightRef = () => {
    nightRef.current.play();
  };

  const pausenightRef = () => {
    nightRef.current.pause();
  };

  const handleVolumenightRef = (e) => {
    nightRef.current.volume = e.target.value;
  };

  const startFireRef = () => {
    FireRef.current.play();
  };

  const pauseFireRef = () => {
    FireRef.current.pause();
  };

  const handleVolumeFireRef = (e) => {
    FireRef.current.volume = e.target.value;
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
        src={theme ? day : night}
      ></video>
      {theme === true && (
        <Tooltip
          title={
            <div className="volumm">
              <b style={{ fontSize: 16, fontWeight: 500 }}>City Traffic</b>
              {city && (
                <input
                  onChange={handleVolumecityRef}
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
              setCity(!city);
              if (city) {
                pausecityRef();
              } else startcityRef();
            }}
            style={{ top: "35%", left: "62%",opacity: afk }}
            className="choice"
          >
            <span className="choice-hover"></span>
          </span>
        </Tooltip>
      )}
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Fire</b>
            {fire && (
              <input
                onChange={handleVolumeFireRef}
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
            setFire(!fire);
            if (fire) {
              pauseFireRef();
            } else startFireRef();
          }}
          style={{ top: "79%", left: "6%",opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      {theme === false && (
        <Tooltip
          title={
            <div className="volumm">
              <b style={{ fontSize: 16, fontWeight: 500 }}>City Traffic</b>
              {nightState && (
                <input
                  onChange={handleVolumenightRef}
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
              setNight(!nightState);
              if (nightState) {
                pausenightRef();
              } else startnightRef();
            }}
            style={{ top: "10%", left: "40%",opacity: afk }}
            className="choice"
          >
            <span className="choice-hover"></span>
          </span>
        </Tooltip>
      )}
      <audio muted={theme === true} loop ref={nightRef} src={nightSound} />
      <audio loop ref={FireRef} src={fireSound} />
      <audio muted={theme === false} loop ref={cityRef} src={cityTraffic} />
    </div>
  );
}
