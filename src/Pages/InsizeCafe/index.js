import React, { useContext, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Van.module.scss";
import { ThemeContext } from "../../App";
import { Tooltip } from "antd";
import forest from "../../Assets/Sound/forestday.mp3";
import writing from "../../Assets/Sound/writing.mp3";
import day from "../../Assets/Video/coffe-chill-day.mp4";
import night from "../../Assets/Video/coffe-chill-night.mp4";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";

const cx = classNames.bind(styles);

export default function InsizeCafe({ afk }) {
  const { theme } = useContext(ThemeContext);
  const forestRef = useRef();
  const writingRef = useRef();
  const [writingState, setWriting] = useState(false);
  const [forestState, setForest] = useState(false);
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

  const startAudiowritingRef = () => {
    writingRef.current.play();
  };

  const pauseAudiowritingRef = () => {
    writingRef.current.pause();
  };

  const handleVolumewritingRef = (e) => {
    writingRef.current.volume = e.target.value;
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
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Forest</b>
            {forestState && (
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
            setForest(!forestState);
            if (forestState) {
              pauseAudioforestRef();
            } else startAudioforestRef();
          }}
          style={{ top: "50%", left: "60%", opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>Writing</b>
            {writingState && (
              <input
                onChange={handleVolumewritingRef}
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
            setWriting(!writingState);
            if (writingState) {
              pauseAudiowritingRef();
            } else startAudiowritingRef();
          }}
          style={{ top: "80%", left: "30%", opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <Tooltip
        showArrow={false}
        color="rgba(24, 24, 24, 0.6)"
      >
        <Link to="/cafe-lofi
        ">
          <span
            style={{ top: "70%", left: "5%", opacity: afk }}
            className="choice"
          >
            <span className="choice-hover"></span>
          </span>
        </Link>
      </Tooltip>
      <audio loop ref={forestRef} src={forest} />
      <audio loop ref={writingRef} src={writing} />
    </div>
  );
}
