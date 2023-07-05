import React from 'react'
import styles from './loading.module.scss'
import classNames from 'classnames/bind'
import logo from '../../Assets/Imgs/logo.gif'

const cx = classNames.bind(styles)

export default function Loading() {
  return (
    <div className={cx('wrapper')}>
        <img alt='logo' src={logo} />
        <span>Turn on full screen for better experience!</span>
        <span>Website is under construction. Sorry if any bugs bother you!</span>
    </div>
  )
}
