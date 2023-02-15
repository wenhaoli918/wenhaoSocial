import React, { useEffect, useState } from "react";
import { useUser } from "../../../hooks/user";
import style from "./style.module.scss";
import { Avatar, Image, Tabs, Toast } from "antd-mobile";
import { ReactComponent as IconLeft } from "../../../assets/imgs/leftArr.svg";
import { ReactComponent as IconMsg } from "../../../assets/imgs/msg.svg";
import PostItem from "../../../components/PostItem";
import { usePosts } from "../../../hooks/post";
import { Liked, PostItems } from "../../../types";
import Drawer from "../../../components/Drawer";
import { useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/clcTime";
import classNames from "classnames";

export default function UserPage() {
  const location = useLocation()
  const {_id,headimgurl,backImgUrl,username,nickname,ctime} = location.state
  const { getUserFocus, getUserFollower, focusList, follower, focusUser, stopFocusUser, userInfo } =
    useUser();
  const { getUserPost, userPosts, deletPost, userPicpostList, getLikeList, likeList } = usePosts();
  const [fresh,setFresh] = useState<boolean>(false)
  const navigate = useNavigate()
  
  //获得帖子，粉丝，关注
  useEffect(() => {
    getUserPost({author:_id,commenteId:''})
    getUserFocus(_id);
    getUserFollower(_id);
    getLikeList(_id)
  }, [_id, getUserFocus, getUserFollower, getUserPost, fresh, getLikeList]);

  const [visible, setVisible] = useState<boolean>(false)
  const [currentPostId, setCurrentPostId] = useState<string>('')
  const showDrawer = (id:string) => {
    setVisible(!visible)
    setCurrentPostId(id)
  };

  const changeFresh = () => {
    setFresh(!fresh)
  }

  //删除帖子
  const handleDelete = (id:string) => {
    deletPost(id)
    getUserPost({author:_id,commenteId:''})
    Toast.show({
      icon:'success',
      content:'删除成功'
    })
  }

  //关注用户
  const handleFocus = (focusid:string) => {
    const userid = userInfo._id
    focusUser(focusid,userid as string);
    setFresh(!fresh)
  }

  //取消关注用户
  const handleStopFocus = (focusid:string) => {
    const userid = userInfo._id
    stopFocusUser(focusid,userid as string)
    setFresh(!fresh)
  }

  //改变Tabs切换不同列表
  const handleChange = (key: string) => {
    if (key === "1") {
      getUserPost({author:_id,commenteId:''})
    }
    if (key === "2") {
      getUserPost({author:_id,commenteId:''})
    }
    if (key === "3") {
      getLikeList(_id)
    }
  };
  
  return (
    <div className={style.mainPage}>
      <div className={style.header}>
        <div className={style.options}>
          <div className={style.headerButton} onClick={()=>{navigate(-1)}}>
            <IconLeft></IconLeft>
          </div>
          <div className={style.headerButton} onClick={()=>{navigate('/main/chat',{ state: { receiverId:_id, receiverAvatar:headimgurl,receiverName:username} })}}>
            <IconMsg></IconMsg>
          </div>
        </div>
        <Image src={backImgUrl} />
        <Avatar src={headimgurl as string}></Avatar>
      </div>
      <div className={style.mid}>
          {
            follower.some((item:Liked)=>
              item.followId === _id
            ) ?
            <div className={classNames(style.button,style.focusing)} onClick={()=>{handleStopFocus(_id as string)}}
            style={{visibility:_id === userInfo._id?'hidden':'visible'}}>取消关注</div>
            :
            <div className={style.button} onClick={()=>{handleFocus(_id as string)}}
            style={{visibility:_id === userInfo._id?'hidden':'visible'}}>关注</div>
          }
      </div>
      <div className={style.user}>
        <span className={style.userNames}>{username}</span>
        <div className={style.time}>@{nickname} {formatDate(ctime)} 加入</div>
        <div className={style.introduce}>
          这里是我的个人介绍这里是我的个人介绍这里是我的个人介绍这里是我的个人介绍
        </div>
        <div className={style.follow}>
          <span>{focusList.length} 正在关注</span>
          <span>{follower.length} 关注者</span>
        </div>
      </div>
      <div className={style.post}>
        <Tabs
          onChange={(key) => {
            handleChange(key);
          }}
        >
          <Tabs.Tab title="帖子" key="1">
            {userPosts.map((item: PostItems) => {
              return (
                <PostItem
                  itemInfo={item}
                  cite={false}
                  user={true}
                  key={item._id}
                  changeFresh={changeFresh}
                  showDrawer={showDrawer}
                ></PostItem>
              );
            })}
          </Tabs.Tab>
          <Tabs.Tab title="照片" key="2">
            {
              userPicpostList.map((item: PostItems) => {
                return (
                  <PostItem
                    itemInfo={item}
                    cite={false}
                    user={true}
                    key={item._id}
                    changeFresh={changeFresh}
                    showDrawer={showDrawer}
                  ></PostItem>
                );
              })
            }
          </Tabs.Tab>
          <Tabs.Tab title="喜欢" key="3">
            {
              likeList.map((item: PostItems) => {
                return (
                  <PostItem
                    itemInfo={item}
                    cite={false}
                    user={true}
                    key={item._id}
                    changeFresh={changeFresh}
                    showDrawer={showDrawer}
                  ></PostItem>
                );
              })
            }
          </Tabs.Tab>
        </Tabs>
        <Drawer visible={visible} showDrawer={showDrawer} currentPostId={currentPostId} handleDelete={handleDelete}></Drawer>
      </div>
    </div>
  );
}
