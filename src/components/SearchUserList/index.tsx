import { Avatar } from "antd-mobile";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useUser } from "../../hooks/user";
import { Liked, UserInfo } from "../../types";
import style from "./style.module.scss";
interface Props {
  info?: UserInfo;
  user_Id?:string
}

export default function SearchUserList({ info,user_Id }: Props) {
  const { focusUser, userInfo, focusList, stopFocusUser, getUserFocus,getUser } =
    useUser();
  const [currentUser,setCurrentUser] = useState<UserInfo>({})
  useEffect(() => {
    if(user_Id){
      getUser(user_Id).then((res)=>{
        setCurrentUser(res.data.data[0])
      })
    }
    getUserFocus(userInfo._id as string);
  }, [getUser, getUserFocus, userInfo._id, user_Id]);
  console.log(focusList);
  
  //关注用户
  // const handleFocus = (focusid: string) => {
  //   const userid = userInfo._id;
  //   focusUser(focusid, userid as string);
  // };

  //取消关注用户
  const handleStopFocus = (e: any, focusid: string) => {
    if(e.target.innerHTML === "关注"){
      const userid = userInfo._id;
      focusUser(focusid, userid as string);
      e.target.className = classNames(style.button,style.focusing);
      e.target.innerHTML = "取消关注";
    } else {
      const userid = userInfo._id;
      stopFocusUser(focusid, userid as string);
      e.target.className = classNames(style.button);
      e.target.innerHTML = "关注";
    }
  };

  return (
    <div className={style.userItem}>
      <div>
        <Avatar src={info?.headimgurl as string || currentUser.headimgurl as string}></Avatar>
      </div>
      <div className={style.right}>
        <div className={style.rightTop}>
          <div className={style.user}>
            <div className={style.userName}>{info? info.username : currentUser.username}</div>
            <div className={style.nickName}>{info? info.nickname : currentUser.nickname}</div>
          </div>
          {/* {
            focusList.some((item:Liked)=>
              item.followId === info._id
            ) ?
            <div className={userInfo.username === info.username ? style.displayNone : classNames(style.button,style.focusing)} onClick={(e)=>{handleStopFocus(e,info._id as string)}}>取消关注</div>
            :
            <div className={userInfo.username === info.username ? style.displayNone : style.button} onClick={()=>{handleFocus(info._id as string)}}>关注</div>
          } */}
          <div
            className={
              userInfo.username === info?.username || userInfo.username === currentUser.username
                ? style.displayNone
                : focusList.some((item: Liked) => item.followId === info?._id || item.followId === currentUser._id)
                ? classNames(style.button, style.focusing)
                : classNames(style.button)
            }
            onClick={(e) => {
              handleStopFocus(e, (info? info._id : currentUser._id) as string);
            }}
          >
            {focusList.some((item: Liked) => item.followId === info?._id ) ? '取消关注' : '关注'}
          </div>
        </div>
        <div className={style.userInfo}>1111111111</div>
      </div>
    </div>
  );
}
