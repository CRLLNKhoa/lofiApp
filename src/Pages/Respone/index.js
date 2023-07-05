import React from 'react'
import styles from './loading.module.scss'
import classNames from 'classnames/bind'
import logo from '../../Assets/Imgs/logo.gif'

const cx = classNames.bind(styles)

export default function Respone() {
  return (
    <div className={cx('wrapper')}>
        <img alt='logo' src={logo} />
        <span>Coming soon! Currently only available for PC</span>
    </div>
  )
}
