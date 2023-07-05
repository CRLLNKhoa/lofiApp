import React, { useContext, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Tokyo.module.scss";
import { ThemeContext } from "../../App";
import { Tooltip } from "antd";
import day from "../../Assets/Video/kyotostreet-day.mp4";
import night from "../../Assets/Video/kyotostreet-night.mp4";
import talk from "../../Assets/Sound/talking.mp3";
import forestday from "../../Assets/Sound/forestday.mp3";
import nightSound from "../../Assets/Sound/night.mp3";
import Loading from "../../Components/Loading";

const cx = classNames.bind(styles);

export default function Tokyo({afk}) {
  const { theme } = useContext(ThemeContext);
  const nightRef = useRef();
  const forestdayRef = useRef();
  const talkingRef = useRef();
  const [nightstate, setNight] = useState(false);
  const [talkstate, setTalk] = useState(false);
  const [foresday, setForesday] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const startNightRef = () => {
    nightRef.current.play();
  };

  const pausenightRef = () => {
    nightRef.current.pause();
  };

  const handleVolumeNightRef = (e) => {
    nightRef.current.volume = e.target.value;
  };
  const startForestdayRef = () => {
    forestdayRef.current.play();
  };

  const pauseForestdayRef = () => {
    forestdayRef.current.pause();
  };

  const handleVolumeForestdayRef = (e) => {
    forestdayRef.current.volume = e.target.value;
  };
  const startTalkingRef = () => {
    talkingRef.current.play();
  };

  const pauseTalkingRef = () => {
    talkingRef.current.pause();
  };

  const handleVolumeTalkingRef = (e) => {
    talkingRef.current.volume = e.target.value;
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
      {theme === false ? (
        <Tooltip
          title={
            <div className="volumm">
              <b style={{ fontSize: 16, fontWeight: 500 }}>Night Sky</b>
              {nightstate && (
                <input
                  onChange={handleVolumeNightRef}
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
              setForesday(!foresday);
              setNight(!nightstate);
              if (nightstate) {
                pausenightRef();
                pauseForestdayRef();
              } else {
                startNightRef();
                pauseForestdayRef();
              }
            }}
            style={{ top: "15%", left: "30%",opacity: afk }}
            className="choice"
          >
            <span className="choice-hover"></span>
          </span>
        </Tooltip>
      ) : (
        <Tooltip
          title={
            <div className="volumm">
              <b style={{ fontSize: 16, fontWeight: 500 }}>Forestday</b>
              {foresday && (
                <input
                  onChange={handleVolumeForestdayRef}
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
              setNight(!nightstate);
              setForesday(!foresday);
              if (foresday) {
                pauseForestdayRef();
                pausenightRef();
              } else {
                startForestdayRef();
                pausenightRef();
              }
            }}
            style={{ top: "15%", left: "30%",opacity: afk }}
            className="choice"
          >
            <span className="choice-hover"></span>
          </span>
        </Tooltip>
      )}
      {theme === false && (
        <Tooltip
          title={
            <div className="volumm">
              <b style={{ fontSize: 16, fontWeight: 500 }}>Talking Peole</b>
              {talkstate && (
                <input
                  onChange={handleVolumeTalkingRef}
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
              setTalk(!talkstate);
              if (talkstate) {
                pauseTalkingRef();
              } else startTalkingRef();
            }}
            style={{ top: "50%", left: "82%",opacity: afk }}
            className="choice"
          >
            <span className="choice-hover"></span>
          </span>
        </Tooltip>
      )}
      <audio muted={theme === true} loop ref={talkingRef} src={talk} />
      <audio muted={theme === true} loop ref={nightRef} src={nightSound} />
      <audio muted={theme === false} loop ref={forestdayRef} src={forestday} />
    </div>
  );
}
