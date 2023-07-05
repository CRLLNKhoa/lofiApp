import React, { useState, useRef, useEffect, useContext } from "react";
import styles from "./Timer.module.scss";
import classNames from "classnames/bind";
import Draggable from "react-draggable";
import { FaRegQuestionCircle } from "react-icons/fa";
import { TbReport, TbResize } from "react-icons/tb";
import { AiTwotoneSetting } from "react-icons/ai";
import bell from "../../Assets/Sound/bell.mp3";
import { MdClose } from "react-icons/md";
import { CloseContext } from "../Menu";
import { RiTimerFill } from "react-icons/ri";
import { Tooltip } from "antd";

const cx = classNames.bind(styles);

export default function Timer() {
  const [tab, setTab] = useState(1);
  const [time, setTime] = useState(1500);
  const [timer, setTimer] = useState(time);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [finish, setFinish] = useState(true);
  const countRef = useRef(null);
  const { setOpenTimer } = useContext(CloseContext);
  const [openAbout, setOpenAbout] = useState(false);
  const [resize, setResize] = useState(false);

  const playAudio = () => {
    new Audio(bell).play();
  };

  const handleStart = () => {
    // start button logic here
    setIsPaused(true);
    setFinish(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  const handlePause = () => {
    // Pause button logic here
    clearInterval(countRef.current);
    setIsPaused(false);
    setIsActive(true);
  };

  const handleResume = () => {
    // Resume button logic here
    setIsPaused(true);
    setIsActive(false);
    countRef.current = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);
  };

  const handleReset = () => {
    // Reset button logic here
    clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTimer(time);
    setFinish(true);
  };

  useEffect(() => {
    if (timer === 0) {
      clearInterval(countRef.current);
      playAudio();
      setIsPaused(false);
    }
  }, [timer]);

  useEffect(() => {
    setTimer(time);
  }, [time]);

  return (
    <Draggable >
      <div>
      <Tooltip title={<b>Double Click to open</b>}>
          <div
            style={{
              display: resize ? "block" : "none",
              opacity: resize ? 1 : 0,
            }}
            onDoubleClick={() => setResize(false)}
            className={cx("resize")}
          >
            <RiTimerFill />
          </div>
      </Tooltip>
        <div style={ {visibility: resize ? 'hidden' : ''}} className={cx("wrapper")}>
          <div onClick={() => setOpenAbout(!openAbout)} className={cx("about")}>
            <FaRegQuestionCircle />
          </div>
          <div className={cx("report")}>
            <TbReport />
          </div>
          <div className={cx("setting")}>
            <AiTwotoneSetting />
          </div>
          <div onClick={() => setResize(true)} className={cx("resize-icon")}>
            <TbResize />
          </div>
          <div onClick={() => setOpenTimer(false)} className={cx("close")}>
            <MdClose />
          </div>
          {openAbout && (
            <div className={cx("content-about")}>
              <h3>Pomodoro là gì?</h3>
              <p>
                Pomodoro là gì? Pomodoro theo tên tiếng anh đầy đủ của nó là
                Pomodoro Technique. Đây là một phương pháp dùng để quản trị thời
                gian nâng cấp tối đa được một sự tập trung nhất định trong công
                việc và nó được giới thiệu bởi Francesco Cirillo – CEO và
                Pomodoro được cho là của 1 công ty phần mềm người Ý vào những
                năm 1980.
              </p>
              <p>
                Năm 1980, khi còn là sinh viên, Francesco Cirillo – CEO của 1
                công ty phần mềm người Italia đã nhận thấy sự tập trung của mình
                thường giảm mạnh sau 1 khoảng thời gian và khi đó ông rất khó để
                giải quyết các bài tập. Sau đó Francesco Cirillo đưa ra giải
                pháp nghỉ ngắn giữa các phiên làm việc thay vì làm việc 1 thời
                gian dài liên tục.
              </p>
              <p>
                Ông đưa ra cách thức làm việc (học tập) tập trung cao trong thời
                gian 25 phút sau đó nghỉ ngắn 5 phút và lại bắt đầu 1 phiên làm
                việc 25 phút mới. Mỗi phiên làm việc 25 phút này, Francesco
                Cirillo gọi là 1 Pomodoro.
              </p>
              <p>
                Và ở trong tiếng Ý thì Pomodoro có nghĩa là cà chua, nguyên nhân
                tạo ra phần mềm này là do Francesco Cirillo ông đã sử dụng một
                chiếc đồng hồ có hình quả cà chua để theo dõi thời gian của mình
                khi sáng tạo ra phương pháp này.
              </p>
              <p>
                Trên một thực tế thì hầu như tất cả mọi người đề làm việc kém
                hiệu quả vì mất đi sự tập trung của bản thân. Theo một nghiên
                cứu thì khi chúng ta đang rất tập trung để làm một điều gì đó mà
                có một việc khác xem vào (ví dụ: Đang tập trung viết content mà
                lại đi nghe điên thoại) thì cần ít nhất phải 15 phút để lấy lại
                được sự tập trung ban đầu cho công việc.
              </p>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://trungthanh.net/pomodoro-la-gi/#ftoc-heading-1"
              >
                {" "}
                xem chi tiết
              </a>
            </div>
          )}
          <div className={cx("header")}>
            <span
              onClick={() => {
                setTime(1500);
                setTab(1);
              }}
              className={cx("tab", tab === 1 && "active")}
            >
              Pomodoro
            </span>
            <span
              onClick={() => {
                setTime(300);
                setTab(2);
              }}
              className={cx("tab", tab === 2 && "active")}
            >
              Short Break
            </span>
            <span
              onClick={() => {
                setTime(600);
                setTab(3);
              }}
              className={cx("tab", tab === 3 && "active")}
            >
              Long Break
            </span>
          </div>
          <div className={cx("total")}>
            <div
              style={{ width: `${100 - (timer / time) * 100}%` }}
              className={cx("line")}
            ></div>
          </div>
          <div className={cx("cd")}>
            <span className={cx("m")}>{`${
              Math.floor(timer / 60) < 10 ? "0" : ""
            }${Math.floor(timer / 60)}`}</span>
            <span className={cx("m-s")}>:</span>
            <span className={cx("s")}>{`${(timer % 60) % 60 < 10 ? "0" : ""}${
              (timer % 60) % 60
            }`}</span>
          </div>
          <div className={cx("cd")}>
            {finish && (
              <button onClick={() => handleStart()} className={cx("button-30")}>
                START
              </button>
            )}
            {isPaused && (
              <button onClick={() => handlePause()} className={cx("button-30")}>
                PAUSE
              </button>
            )}
            {isActive && (
              <button
                onClick={() => handleResume()}
                className={cx("button-30")}
              >
                RESUME
              </button>
            )}
            <button
              style={{ width: 30, height: 10, marginLeft: 10 }}
              onClick={() => handleReset()}
              className={cx("button-30")}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
