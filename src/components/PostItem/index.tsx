import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import style from "./style.module.scss";
import { Avatar } from "antd-mobile";
import { ReactComponent as IconXinxi } from "../../assets/imgs/xinxi.svg";
import { ReactComponent as IconZhuanfa } from "../../assets/imgs/zhuanfa.svg";
import { ReactComponent as IconQxShoucang } from "../../assets/imgs/shoucang.svg";
import { ReactComponent as IconShoucang } from "../../assets/imgs/qxshoucang.svg";
import { ReactComponent as IconElip } from "../../assets/imgs/elips.svg";
import { PostItems } from "../../types";
import { getDateDiff } from "../../utils/clcTime";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import { useUser } from "../../hooks/user";
import Imgs from "../Imgs";
import { usePosts } from "../../hooks/post";
import { reqSinglePost } from "../../api/api";

interface ItemInfo {
  itemInfo: PostItems;
  cite: boolean;
  user: boolean;
  scrollTop?:number;
  showDrawer?: (id: string) => void;
  changeFresh?:()=>void,
  showTrans?:(cur:PostItems)=>void,
  setPosts? :(posts:PostItems[])=>void,
  posts? :PostItems[],
  transP? :boolean,
}

enum Type {
  QuXiao='取消',
  ShouCang='收藏'
}

export default function PostItem({
  scrollTop,
  itemInfo,
  cite,
  user,
  showDrawer,
  changeFresh,
  showTrans,
  posts,
  setPosts,
  transP,
}: ItemInfo) {

  const { userInfo } = useUser();
  const { shouCangPost, qxShouCang } = usePosts()
  const navigate = useNavigate();
  const { author, imgs, likedBy, liked } = itemInfo;
  const { headimgurl, username, nickname, _id } = itemInfo.author;
  const [iniLike,setIniLike] = useState<boolean>(false)
  const [likes,setLikes] = useState<number>(liked)
  // console.log(userInfo._id);
  useEffect(() =>{
    setIniLike(likedBy.some((item)=>{
      return item.userId === userInfo._id
    }))
    setLikes(liked)
  },[liked, likedBy, userInfo._id])

  //被转发贴的信息
  const [transPost,setTransPost] = useState<PostItems>()
  
  const goUserPage = () => {
    navigate("/main/userpage", { state: { ...author } });
  };
  
  const handleShouCang = (e:any,id:string,type:string) => {
    if(iniLike === true){
      qxShouCang(id,userInfo._id as string)
      setIniLike(false)
      setLikes(likes-1)
    } else {
      shouCangPost(id,userInfo._id as string)
      setIniLike(true)
      setLikes(likes+1)
    }  
  }
  
  useEffect(() => {
    let { forwardeId }= itemInfo
    if( forwardeId !== ''){
      reqSinglePost( forwardeId as string).then((res) => {
        setTransPost(res.data.data[0])
      })
    }
  },[itemInfo])
  
  return (
    <div className={transP ? classNames(style.itemCard,style.transP) : classNames(style.itemCard)}>
      <div className={style.cardLeft} onClick={() => goUserPage()}>
        <Avatar src={headimgurl as string}></Avatar>
      </div>
      <div className={style.cardRight}>
        <div className={style.cardRightTop}>
          <div>
            {username}
            <span>
              @{nickname} · {getDateDiff(itemInfo.ctime)}
            </span>
          </div>
          <div
            style={{ display: user && _id === userInfo._id ? "block" : "none" }}
            onClick={() => {
              if (showDrawer) {
                showDrawer(itemInfo._id);
              }
            }}
          >
            <IconElip></IconElip>
          </div>
        </div>
        {itemInfo.commenteId === "" ? (
          ""
        ) : (
          <div className={style.reply}>回复 @{username}</div>
        )}
        <div className={style.cardRightMid}>
          <div
            className={style.midContent}
            onClick={() =>
              navigate("/main/postdetail", { state: { itemInfo, scrollTop} })
            }
          >
            {itemInfo.content}
          </div>
          {imgs.length === 0 ? (
            ""
          ) : (
            <Imgs imgs = {imgs} className={
              imgs.length === 1
                ? style.midImg1
                : imgs.length === 2
                ? style.midImg2
                : classNames(style.midImg2, style.midImg3)
            }
            />
          )}
          {itemInfo.forwardeId && transPost?
              <PostItem
                itemInfo={transPost as PostItems}
                cite={true}
                user={false}
                transP={true}
              ></PostItem>
            :
            itemInfo.forwardeId && !transPost?._id ?
            <div className={style.deleteP}>该贴已被删除</div>
            :''
          }
        </div>
        <div
          className={
            cite
              ? classNames(style.cardRightBottom, style.hidden)
              : style.cardRightBottom
          }
        >
          <div className={style.bottomItem}>
            <span
              className={style.leftSpan}
              onClick={() => {
                navigate("/main/create", {
                  state: { itemInfo, type: "comment" },
                });
              }}
            >
              <IconXinxi></IconXinxi>
            </span>
            <span className={style.rightSpan}>{itemInfo.commentNumber}</span>
          </div>
          <div className={style.bottomItem} onClick={()=>{if(showTrans){showTrans(itemInfo)}}}>
            <span className={style.leftSpan}>
              <IconZhuanfa></IconZhuanfa>
            </span>
            <span className={style.rightSpan}>{itemInfo.forwardNumber}</span>
          </div>
          <div className={style.bottomItem}>
            {/* {
              likedBy.some((item)=>{
                return item.userId === userInfo._id
              }) ?
              <span className={style.leftSpan} onClick={()=>{handleShouCang(itemInfo._id,Type.QuXiao)}}>
              <IconShoucang></IconShoucang>
              </span> 
            :
            <span className={style.leftSpan} onClick={()=>{handleShouCang(itemInfo._id,Type.ShouCang)}}>
              <IconQxShoucang></IconQxShoucang>
            </span>
            } */}
            <span className={style.leftSpan} onClick={(e)=>{handleShouCang(e,itemInfo._id,Type.ShouCang)}}>
              {
                iniLike ?
                <IconShoucang></IconShoucang>
                :
                <IconQxShoucang></IconQxShoucang>
              }
            </span>
            <span className={style.rightSpan}>{likes}</span>
          </div>
        </div>
        {/* <div
          className={
            cite ? classNames(style.reply, style.marginTop) : style.hidden
          }
        >
          回复 @{username}
        </div> */}
      </div>
    </div>
  );
}
