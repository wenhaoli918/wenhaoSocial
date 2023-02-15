import { Avatar, SwipeAction } from 'antd-mobile'
import { Action, SwipeActionRef } from 'antd-mobile/es/components/swipe-action';
import classNames from 'classnames';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { DeletInfo } from '../../api/api';
import {ReactComponent as IconDot} from '../../assets/imgs/dot.svg'
import { Notice } from '../../types';
import { formatDate } from '../../utils/clcTime';
import style from './style.module.scss'

interface Props {
  itemInfo:Notice,
  getRead:(id:string,isRead:boolean)=>Promise<string>
  setNoticeLis:(noticeList:Notice[]) => void
  noticeList:Notice[]
}

enum Type  {
  FOCUS = 'focus',
  COMMENT = 'comment',
  Trans = 'trans'
}

export default function NoticeItem({itemInfo,getRead,noticeList,setNoticeLis}:Props) {
  const ref = useRef<SwipeActionRef>(null)
  const navigate = useNavigate()
  const [isRead,setIsRead] = useState(itemInfo.read)
  const rightActions: Action[] = [
    {
      key: "mute",
      text: "设为已读",
      color: "warning",
      onClick: async () => {
        let res = await getRead(itemInfo._id, !isRead)
        if(res === 'ok'){
          setIsRead(!isRead)
        }
        ref.current?.close()
      }
    },
    {
      key: "delete",
      text: "删除",
      color: "danger",
      onClick :async() => {
        setNoticeLis(noticeList.filter((item:Notice)=>{
          return item._id !== itemInfo._id
        }))
        await DeletInfo(itemInfo._id)
      }
    },
  ]

  //跳转详情页
  const handleSkip = (type:string) => {
    getRead(itemInfo._id, !isRead)
    if(type === Type.FOCUS){
      navigate('/main/focuspage')
    }
    if(type === Type.COMMENT || type === Type.Trans){
      navigate('/main/postdetail',{ state: { itemInfo:itemInfo.postId } })
    }
  }

  return (
    <SwipeAction key={itemInfo.createdAt} rightActions={rightActions} ref={ref}
            >
              <div className={style.noticeItem}
                onClick={()=>{handleSkip(itemInfo.type)}}>
                <div className={style.itemLogo}>
                  <Avatar src={itemInfo.currentId.headimgurl as string}></Avatar>
                </div>
                <div className={style.itemContent}>
                  <div className={isRead === true ? classNames(style.state,style.hide) : style.state}><IconDot></IconDot></div>
                  <div className={style.contentTop}>
                    <span className={style.name}>{itemInfo.currentId.username}</span>
                    <span className={style.content}>{
                      itemInfo.type === 'comment'?
                      '回复了你的帖子'
                      : itemInfo.type === 'focus' ?
                      '关注了你' 
                      : itemInfo.type === 'trans' ?
                      '转发了你的帖子' : ''
                    }</span>
                  </div>
                  <div className={style.contentBottom}>{formatDate(itemInfo.createdAt)}</div>
                </div>
              </div>
    </SwipeAction>
  )
}
