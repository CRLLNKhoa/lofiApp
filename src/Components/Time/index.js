import React, { useEffect, useState } from "react";
import styles from "./Time.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function Time({afk}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date());
    }, 1000);
  }, [currentTime]);

  const handleH = () => {
    if (currentTime.getHours() < 10) {
      return `0${currentTime.getHours()}`;
    }else return `${currentTime.getHours()}`
  };

  const handleM = () => {
    if (currentTime.getMinutes() < 10) {
      return `0${currentTime.getMinutes()}`;
    }else return `${currentTime.getMinutes()}`
  };

  return (
    <div style={{opacity: afk}} className={cx("wrapper")}>
      <span>{handleH()}</span>
      <span>:{handleM()}</span>
    </div>
  );
}
