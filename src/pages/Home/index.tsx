import React, { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import style from "./style.module.scss";
import { ReactComponent as IconLogo } from "../../assets/imgs/login2.svg";
import { ReactComponent as IconHoem } from "../../assets/imgs/navHome.svg";
import { ReactComponent as IconUser } from "../../assets/imgs/user.svg";
import { ReactComponent as IconAlert } from '../../assets/imgs/alert2.svg'
import { Avatar, ImageUploader, Skeleton, Popup, TextArea, InfiniteScroll, Toast } from "antd-mobile";
import { BellOutline } from "antd-mobile-icons";
import PostItem from "../../components/PostItem";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CtratePost from "../../components/CreatePost";
import { usePosts } from "../../hooks/post";
import { useUser } from "../../hooks/user";
import { throtten } from "../../utils/throtten";
import myContext from "../../myContext";
import { PostItems } from "../../types";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import { VariableSizeList } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { useRowChange } from "../../hooks/rowChange";
import { shallowEqual, useSelector } from "react-redux";
import { ReactComponent as IconPic } from "../../assets/imgs/pic.svg";
import classNames from "classnames";
import { reqUpLoad, transPost } from "../../api/api";
import useAllPosts from "../../hooks/useAllPosts";
import useFocusList from "../../hooks/useFocusList";
import useFollower from "../../hooks/useFollower";

export default function Home() {
  const { userInfo } = useUser();
  const [visible, setVisible] = useState<boolean>(false);
  const [transVisible, setTransVisible] = useState<boolean>(false);
  //点击评论，点赞按钮刷新首页
  const [fresh, setFresh] = useState(false);
  const [currentPost, setCurrentPost] = useState<PostItems>();
  const [value, setValue] = useState("");
  const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
  const drawList = [
    { name: "个人主页", path: "/main/userpage", icon: <IconHoem></IconHoem> },
    { name: "个人资料", path: "/main/userinfo", icon: <IconUser></IconUser> },
  ];

  // const { loading } = useSelector((state: any) => {
  //   return { loading: state.loading };
  // }, shallowEqual);

  //home页面列表数据，以及滚动时懒加载数据
  let {allPosts,getAuditList,hasMore} = useAllPosts()

  //关注列表相关
  let {focusList} = useFocusList()

  //粉丝列表相关
  let {follower} = useFollower()
  
  //改变状态，强制刷新
  const changeFresh = () => {
    setFresh(!fresh);
  };

  //转发框
  const showTrans = (cur: PostItems) => {
    setTransVisible(!transVisible);
    setCurrentPost(cur);
  };

  const cref = useRef<HTMLDivElement>(null);

  //初次加载定位到context里的位置
  // if(cref.current?.firstChild?.firstChild !== null){
  //   console.log('ddd');
    
  //   (cref.current?.firstChild?.firstChild as HTMLDivElement)?.scrollTo({top:scrollNum})
  // }

  const listRef = useRef<any>(null);
  const rowHeights = useRef<any>({});
  const upload = (file: File): Promise<ImageUploadItem> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      let name = file.name;
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        let base64 = event.target?.result as string;
        let base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
        let res = await reqUpLoad(base64Data,name)
        resolve({
          url:res.data.data
        });
      };
    });
  };
  
  const isItemLoaded = (index: number) => {
    return index < allPosts.length;
  };
  
  const Row = ({ index, style }: any) => {
    delete style.height;
    const rowRef = useRowChange({ index, setRowHeight });
    return (
      <div style={{...style, display:'flex'}} ref={rowRef} >
        <PostItem
          user={false}
          itemInfo={allPosts[index]}
          cite={false}
          // scrollTop = {document.getElementsByClassName('style_mainContent__ylaDx')[0].scrollTop}
          key={allPosts[index].ctime}
          changeFresh={changeFresh}
          showTrans={showTrans}
          posts = {allPosts}
          // setPosts = {setAllPosts}
        ></PostItem>
      </div>
    );
  };

  // const getRowHight = (index: number) => {
  //   // console.log(rowHeights.current[index]);
    
  //   return rowHeights.current[index] || 600;
  // };

  //获取每一条帖子的高度
  const getRowHight = useCallback((index:number) => {
    return rowHeights.current[index] || 600;
  },[])

  //创建rowHeights hash表保存每一条帖子的高度
  const setRowHeight = (index: number, size: any) => {
    listRef.current?.resetAfterIndex(0,true);
    rowHeights.current = { ...rowHeights.current, [index]: size };
  };
  
  // cref.current?.scrollTo({ top: scrollNum });

  const navigate = useNavigate();

  //转发帖子
  const handlePublish = useCallback(async() => {
    const { _id } = userInfo;
    if (value === "") {
      Toast.show({
        icon: "fail",
        content: "内容不能为空",
      });
      return;
    }
    let res = await transPost({
      content:value,
      imgs:fileList,
      currentUser:_id,
      postId:currentPost?._id
    })
    if (res.data.msg === "转发成功") {
      setTransVisible(false)
      setFresh(!fresh)
      setValue('')
      setFileList([])
      Toast.show({
        icon: "success",
        content: res.data.msg,
      });
    }
    // setTransVisible(!transVisible);
  },[currentPost?._id, fileList, fresh, userInfo, value])

  return (
    <>
      <div className={style.header}>
        <span
          className={style.headerItem}
          onClick={() => {
            setVisible(!visible);
          }}
        >
          <Avatar src={userInfo.headimgurl as string}></Avatar>
        </span>
        <span className={style.headerItem}>
          <IconLogo className={style.logo}></IconLogo>
        </span>
        <span className={style.headerItem}>
          <IconAlert className={style.logo} />
        </span>
      </div>
      <div className={style.mainContent} ref={cref}>
        {
          allPosts.map((item) => {
            return (
            <PostItem
              user={false}
              itemInfo = {item}
              cite={false}
              // scrollTop = {document.getElementsByClassName('style_mainContent__ylaDx')[0].scrollTop}
              key={item.ctime}
              changeFresh = {changeFresh}
              showTrans={showTrans}
            ></PostItem>
            )
          })
        }
        <InfiniteScroll loadMore={getAuditList} hasMore={hasMore} /> 
       
        {/* {
          <AutoSizer>
            {({ width, height }) => (
              <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={total}
                loadMoreItems={getAuditList}
                threshold={6}
              >
                {({ onItemsRendered, ref }) => (
                  <VariableSizeList
                    className="777"
                    width={width}
                    height={height}
                    itemData={allPosts}
                    itemCount={total}
                    itemSize={getRowHight}
                    ref={(list) => {
                      ref(list)
                      listRef.current = list
                    }}
                    onItemsRendered={onItemsRendered}
                  >
                    {Row}
                  </VariableSizeList>
                )}
              </InfiniteLoader>
            )}
          </AutoSizer>
        } */}
        {/* <PostItem></PostItem> */}
      </div>
      <CtratePost></CtratePost>
      <Popup
        visible={visible}
        onMaskClick={() => {
          setVisible(!visible);
        }}
        position="left"
        bodyStyle={{ width: "16rem" }}
      >
        <div className={style.drawer}>
          <Avatar src={userInfo.headimgurl as string}></Avatar>
          <span className={style.name}>{userInfo.username}</span>
          <span className={style.nickName}>@{userInfo.nickname}</span>
          <div
            className={style.follow}
            onClick={() => {
              navigate("/main/focuspage");
            }}
          >
            <span>{focusList.length} 正在关注</span>
            <span>{follower.length} 关注者</span>
          </div>
          <div className={style.drawOptions}>
            {drawList.map((item) => {
              return (
                <NavLink to={item.path} state={userInfo} key={item.path}>
                  <div className={style.option}>
                    <span className={style.optionLogo}>{item.icon}</span>
                    <span className={style.optionTitle}>{item.name}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
          <div className={style.logOut}>退出登录</div>
        </div>
      </Popup>
      
      {/*转发框*/}
      <Popup
        visible={transVisible}
        position="bottom"
        bodyStyle={{ height: "100%" }}
      >
        <div className={style.transPop}>
          <div className={style.header}>
            <span
              className={style.cancle}
              onClick={() => {
                setTransVisible(!transVisible);
              }}
            >
              取消
            </span>
            <span
              className={style.publish}
              onClick={() => {
                handlePublish()
              }}
            >
              发布
            </span>
          </div>
          <div className={style.content}>
            <div className={style.contentLeft}>
              <Avatar src={currentPost?.author.headimgurl as string}></Avatar>
            </div>
            <div className={style.contentRight}>
              <TextArea
                placeholder="请输入内容"
                value={value}
                autoSize={true}
                showCount={true}
                maxLength={140}
                style={{ width: "100%" }}
                onChange={(val) => {
                  setValue(val);
                }}
              />
              <ImageUploader
                multiple
                value={fileList}
                onChange={setFileList}
                upload={upload}
                children={
                  <div className={classNames(style.footer)}>
                    <IconPic></IconPic>
                  </div>
                }
              />
              <div className={style.post}>
                <PostItem
                  itemInfo={currentPost as PostItems}
                  cite={true}
                  user={false}
                ></PostItem>
              </div>
            </div>
          </div>
          {/* <div className={style.bottom}>789</div> */}
        </div>
      </Popup>
    </>
  );
}
