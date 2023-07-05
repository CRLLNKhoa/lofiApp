import React from "react";
import styles from "./TimeOnl.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const handleH = (time) => {
    if(Math.floor(time / 60 / 60)< 10){
        return `0${Math.floor(time / 60 / 60)}`
    }else return Math.floor(time / 60 / 60)
}

const handleM = (time) => {
    if(Math.floor(time / 60 % 60)< 10){
        return `0${Math.floor(time / 60 % 60)}`
    }else return Math.floor(time / 60 % 60)
}

const handleS = (time) => {
    if(Math.floor(time % 60)< 10){
        return `0${Math.floor(time % 60)}`
    }else return Math.floor(time % 60)
}

export default function TimeOnl({ num,afk }) {
  return (
    <div style={{opacity: afk}} className={cx("wrapper")}>
      <span style={{marginRight: 10}}>Time Online:</span>
      <span>
        <span>{handleH(num)}</span>
        <span>:{handleM(num)}</span>
        <span>:{handleS(num)}</span>
      </span>
    </div>
  );
}
