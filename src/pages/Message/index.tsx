import React from 'react'
import MessageItem from '../../components/MessageItem'
import { useUser } from '../../hooks/user'
import style from './style.module.scss'

export default function Message() {
  const {userInfo} = useUser()
  return (
    <div className={style.mainContent}>
      <div className={style.messageHeader}>
        <div className={style.userLogo}>
          <img src={userInfo.headimgurl} alt="" />
        </div>
        <div className={style.message}>私信</div>
      </div>
      <div className={style.messageArea}>
        <MessageItem></MessageItem>
        <MessageItem></MessageItem>
        <MessageItem></MessageItem>
        <MessageItem></MessageItem>
        <MessageItem></MessageItem>
        <MessageItem></MessageItem>
      </div>
    </div>
  )
}
