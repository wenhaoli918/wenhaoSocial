import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import {ReactComponent as IconBack} from '../../assets/imgs/back.svg'
import { Avatar } from 'antd-mobile'
import { ReactComponent as IconXinxi } from '../../assets/imgs/xinxi.svg'
import { ReactComponent as IconZhuanfa } from '../../assets/imgs/zhuanfa.svg'
import { ReactComponent as IconShoucang } from '../../assets/imgs/shoucang.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import PostItem from '../../components/PostItem'
import { formatDate } from '../../utils/clcTime'
import { usePosts } from '../../hooks/post'
import { PostItems } from '../../types'
import Imgs from '../../components/Imgs'
import classNames from 'classnames'
import { reqSinglePost } from '../../api/api'

export default function PostDetail() {
  const {state} = useLocation()
  const{itemInfo,scrollTop} = state
  const {getCommentList,commentList,getTransPost,transP} = usePosts()
  const [postDt,setPostDt] = useState<PostItems>()
  const navigate = useNavigate()

  //查询帖子有无评论帖
  useEffect(() => {
    getCommentList(itemInfo._id)
    if(itemInfo.forwardeId){
      getTransPost(state.itemInfo.forwardeId)
    }
    reqSinglePost(itemInfo._id).then((res:any) => {
      setPostDt(res.data.data[0])
    })
  },[getCommentList, getTransPost, itemInfo._id, itemInfo.forwardeId, state.itemInfo.forwardeId])
  
  //判断帖子类型，获取评论区
  return (
    <>
      <div className={style.header}>
        <div className={style.back} onClick={()=>{navigate('/main/home',{state:scrollTop})}}><IconBack></IconBack></div>
        <div className={style.title}>主题帖</div>
      </div>
      <div className={style.content}>
        <div className={style.contentHeader}>
          <Avatar src={postDt?.author.headimgurl as string}></Avatar>
          <div className={style.contentHeaderName}>
            <span className={style.name}>{postDt?.author.username}</span>
            <span className={style.nickName}>@{postDt?.author.nickname}</span>
          </div>
        </div>
        <div className={style.cardMid}>
          <div
            className={style.midContent}
          >
            {itemInfo.content}
          </div>
          {itemInfo.imgs.length === 0 ? (
            ""
          ) : (
            <Imgs imgs = {itemInfo.imgs} className={
              itemInfo.imgs.length === 1
                ? style.midImg1
                : (itemInfo.imgs.length === 2
                ? style.midImg2
                : classNames(style.midImg2, style.midImg3))
            }/>
          )}
          {
            transP?._id ?
            <PostItem
              itemInfo = {transP as PostItems}
              cite = {true}
              user = {false}
            ></PostItem>
            : itemInfo.forwardeId && !transP?._id ?
            <div className={style.deleteP}>已被删除</div>
            :''
          }
        </div>
        <div className={style.createTime}>{formatDate(itemInfo.ctime)}</div>
        <div className={style.forwordAlike}>
          <div className={style.item}>
            <span className={style.number}>{itemInfo.forwardNumber}</span>
            <span className={style.text}>转发</span>
          </div>
          <div className={style.item}>
            <span className={style.number}>{itemInfo.liked}</span>
            <span className={style.text}>喜欢</span>
          </div>
        </div>
        <div className={style.icons}>
          <IconXinxi></IconXinxi>
          <IconZhuanfa></IconZhuanfa>
          <IconShoucang></IconShoucang>
        </div>
        <div className={style.comment}>
          {
            commentList.length === 0?
            <div>暂无评论</div>
            :
            commentList.map((item:PostItems)=>{
              return (
                <PostItem
                user={false}
                itemInfo = {item}
                cite = {false}
                key = {item._id}
                ></PostItem>
              )
            })
          }
        </div>
      </div>
    </>
    
  )
}
