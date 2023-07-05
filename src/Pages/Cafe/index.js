import React, { useContext,useRef,useState } from "react";
import classNames from "classnames/bind";
import styles from "./Cafe.module.scss";
import { ThemeContext } from "../../App";
import { Tooltip } from "antd";
import sounds from '../../Assets/Sound/talking.mp3'
import day from '../../Assets/Video/lofi-coffee-day.mp4'
import night from '../../Assets/Video/lofi-coffee-night.mp4'
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";

const cx = classNames.bind(styles);

export default function Cafe({afk}) {
  const { theme } = useContext(ThemeContext);
  const myRef = useRef();
  const [city, setCity] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const startAudio = () => {
    myRef.current.play();
  };

  const pauseAudio = () => {
    myRef.current.pause();
  };

  const handleVolumeCity = (e) => {
    myRef.current.volume = e.target.value;
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
            <b style={{ fontSize: 16, fontWeight: 500 }}>Talking People</b>
            {city && <input
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
            setCity(!city);
            if (city) {
              pauseAudio();
            } else startAudio();
          }}
          style={{ top: "50%", left: "10%",opacity: afk }}
          className="choice"
        >
          <span className="choice-hover"></span>
        </span>
      </Tooltip>
      <Tooltip
        placement="right"
        showArrow={false}
        color="rgba(24, 24, 24, 0.6)"
      >
        <Link to='/inside-cafe'>
          <span
            style={{ top: "65%", left: "50%",opacity: afk }}
            className="choice"
          >
            <span className="choice-hover"></span>
          </span>
        </Link>
      </Tooltip>
      <audio loop ref={myRef} src={sounds} />
    </div>
  );
}
