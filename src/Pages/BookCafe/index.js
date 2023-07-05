import React, { useContext,useRef,useState } from "react";
import classNames from "classnames/bind";
import styles from "./BookCafe.module.scss";
import { ThemeContext } from "../../App";
import { Tooltip } from "antd";
import sounds from '../../Assets/Sound/city-traffic.mp3'
import Loading from "../../Components/Loading";

const cx = classNames.bind(styles);

export default function BookCafe({afk}) {
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
            ? "https://user-images.githubusercontent.com/107914230/215252509-5cb9e479-eb03-482c-b47d-cdfd74c52936.mp4"
            : "https://user-images.githubusercontent.com/107914230/215252496-7940a1e9-cb85-4372-9221-7064e3b8bbb0.mp4"
        }
      ></video>
      <Tooltip
        title={
          <div className="volumm">
            <b style={{ fontSize: 16, fontWeight: 500 }}>City Traffic</b>
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
      <audio loop ref={myRef} src={sounds} />
    </div>
  );
}
