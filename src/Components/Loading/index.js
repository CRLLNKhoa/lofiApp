import React from 'react'
import classNames from "classnames/bind";
import styles from "./Loading.module.scss";

const cx = classNames.bind(styles);

function Loading() {
  return (
    <div style={{display: "flex",justifyContent: "center",alignItems: "center",position: "fixed",top: 0,left:  0,right:  0,bottom: 0,backgroundColor:  "black",zIndex: 90}}>
      <div className={cx("lds-spinner")}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}

export default Loading