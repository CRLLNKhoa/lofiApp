import React, { useState } from "react";
import styles from "./ButtonLogin.module.scss";
import classNames from "classnames/bind";
import { Modal } from "antd";
import { FaUserAlt, FaTransgender } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiRename } from "react-icons/bi";
import { Select } from "antd";

const cx = classNames.bind(styles);

export default function ButtonLogin({afk}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenR, setIsModalOpenR] = useState(false);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // Login
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //   Register

  const handleCancelR = () => {
    setIsModalOpenR(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div style={{opacity: afk}} className={cx("wrapper")}>
      <button className={cx("btn")} onClick={showModal}>
        Login
      </button>
      <Modal
        className={cx("modal")}
        footer={false}
        open={isModalOpen}
        onCancel={handleCancel}
        style={{
          top: 20,
        }}
      >
        <div className={cx("content")}>
          <h2>Welcome back to lofi with Carol!</h2>
          <form onSubmit={handleSubmit} className={cx("form")}>
            <div className={cx("input")}>
              <FaUserAlt />
              <input type="email" placeholder="Email" />
            </div>
            <div className={cx("input")}>
              <RiLockPasswordFill />
              <input type="password" placeholder="Password" />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "10px 0 20px 0",
                width: "100%",
              }}
            >
              <span className={cx("remenber")}>
                <input type="checkbox" />
                <label>Remember password</label>
              </span>
              <span
                onClick={() => {
                  setIsModalOpen(false);
                  setIsModalOpenR(true);
                }}
                style={{
                  color: "white",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "right",
                }}
              >
                Do not have an account ?
              </span>
            </div>
            <button className={cx("btn-login")}>LOGIN</button>
          </form>
        </div>
      </Modal>
      <Modal
        className={cx("modal")}
        footer={false}
        onCancel={handleCancelR}
        open={isModalOpenR}
        style={{
          top: 20,
        }}
      >
        <div className={cx("content")}>
          <h2>Join in Lofi with Carol :3</h2>
          <form onSubmit={handleSubmit} className={cx("form")}>
            <div className={cx("input")}>
              <FaUserAlt />
              <input type="email" placeholder="Email" />
            </div>
            <div className={cx("input")}>
              <RiLockPasswordFill />
              <input type="password" placeholder="Password" />
            </div>
            <div className={cx("input")}>
              <RiLockPasswordFill />
              <input type="password" placeholder="Confirm Password" />
            </div>
            <div className={cx("input")}>
              <BiRename />
              <input type="text" placeholder="Display name" />
            </div>
            <div className={cx("input")}>
              <FaTransgender />
              <Select
                defaultValue="male"
                style={{
                  width: '90%',
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "female",
                    label: "Female",
                  }
                ]}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 0",
                width: "100%",
              }}
            >
              <span onClick={() => {
                  setIsModalOpenR(false);
                  setIsModalOpen(true);
                }} style={{ color: "white", cursor: "pointer" }}>
                Already have an account
              </span>
            </div>
            <button className={cx("btn-login")}>REGISTER</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
