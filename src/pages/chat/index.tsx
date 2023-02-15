import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import style from './style.module.scss'
import {ReactComponent as IconBack} from '../../assets/imgs/back.svg'
import {ReactComponent as IconPic} from '../../assets/imgs/pic.svg'
import { Input, Toast } from 'antd-mobile'
import socket from '../../utils/socket'
import { useUser } from '../../hooks/user'
import { getDateDiff } from '../../utils/clcTime'

export default function ChatPage() {
  const {userInfo} = useUser()
  class Msg {
    userId:string
    receiverId:string
    type:number
    content:string
    time:number
    constructor(userId:string,receiverId:string,type:number,content:string,time:number){
      this.userId = userId
      this.receiverId = receiverId
      this.type = type
      this.content = content
      this.time = time
    }

  }

  const location = useLocation()
  const {receiverId,receiverAvatar,receiverName} = location.state
  const [value, setValue] = useState('')
  const [msgList,setMsgList] = useState<Msg[]>([])

  useEffect(()=>{
    socket.emit('online',userInfo._id)
  },[userInfo._id])
  
  const handleSend = () => {
    if(value.trim() === ''){
      Toast.show({
        icon: 'fail',
        content: '输入内容不能为空',
      })
    } else {
      let msg = new Msg(
        userInfo._id as string,
        receiverId,
        0,
        value,
        new Date().getTime()
      )
      setValue('')
      socket.emit('addChat',msg)
      setMsgList([...msgList,msg])
    }
  }

  return (
    <div className={style.mainContent}>
      <div className={style.chatHeader}>
        <div className={style.back}>
          <IconBack></IconBack>
        </div>
        <div className={style.name}>{receiverName}</div>
      </div>
      <div className={style.chatArea}>
        {
          msgList.map((item:Msg) => {
            return (
              item.userId === userInfo._id ? 
              <div className={style.rightMessage} key={item.time}>
                <span className={style.messageContent}>{item.content}</span>
                <span className={style.rightTime}>{getDateDiff(item.time)}</span>
              </div>
              :
              <div className={style.leftMessage} key={item.time}>
                <span className={style.messageContent}>ssssssssssssssssssssssssssssssssssssssssss11111</span>
                <span className={style.leftTime}>123</span>
              </div>
            )
          })
        }
        {/* <div className={style.leftMessage}>
          <span className={style.messageContent}>ssssssssssssssssssssssssssssssssssssssssss11111</span>
          <span className={style.leftTime}>123</span>
        </div>
        <div className={style.leftMessage}>
          <img src={receiverAvatar} alt="" />
          <span className={style.leftTime}>123</span>
        </div>
        <div className={style.leftMessage}>
          <span className={style.messageContent}>ssssssssssssssssssssssssssssssssssssssssss11111</span>
          <span className={style.leftTime}>123</span>
        </div>
        <div className={style.rightMessage}>
          <span className={style.messageContent}>ssssssssssssssssssssssssssssssssssssssssss11111</span>
          <span className={style.rightTime}>123</span>
        </div>
        <div className={style.rightMessage}>
          <span className={style.messageContent}>1</span>
          <span className={style.rightTime}>123</span>
        </div> */}
      </div>
      <div className={style.inputArea}>
        <div className={style.imgUpload}><IconPic></IconPic></div>
          <Input
            placeholder='开始写私信'
            value={value}
            onChange={val => {
              setValue(val)
            }}
          />
        <div className={style.send} onClick={()=>{handleSend()}}>发送</div>
      </div>
    </div>
  )
}
