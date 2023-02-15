import { Avatar } from 'antd-mobile'
import React from 'react'
import { useUser } from '../../hooks/user'
import style from './style.module.scss'

export default function MessageItem() {
  const {userInfo} = useUser()
  return (
    <div className={style.messageItem}>
      <div className={style.lefttArea}>
        <Avatar src={userInfo.headimgurl as string}></Avatar>
      </div>
      <div className={style.rightArea}>
        <div className={style.rightTop}>老王</div>
        <div className={style.rightbottom}>ccccccccccccccccccccccxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
      </div>
      <div className={style.time}>五分钟前</div>
      <div className={style.unchecked}>3</div>
    </div>
  )
}
