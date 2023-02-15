import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import style from "./style.module.scss";
import { ReactComponent as IconBack } from "../../assets/imgs/back.svg";
import { SearchBar, Tabs, Toast } from "antd-mobile";
import PostItem from "../../components/PostItem";
import SearchUserList from "../../components/SearchUserList";
import { PostItems, UserInfo } from "../../types";
import { reqSearchPost, reqSearchUserInfo } from "../../api/api";

export default function SearchResult() {
  const navigate = useNavigate()
  const [search] = useSearchParams();
  const value = search.get("value");
  const [searchUserInfo,setSearchUserInfo] = useState<UserInfo[]>([])
  const [postList,setPostList] = useState<PostItems[]>([])
  const [imgPost,setImgPost] = useState<PostItems[]>([])
  const [fresh, setFresh] = useState(false)
  const [activeIndex, setActiveIndex] = useState('1')
  
  useEffect(()=>{
    if(!value){
      navigate(-1)
    }
    reqSearchPost(value as string).then((res)=>{
    setPostList([...res.data.data]) 
    })
  },[value, navigate, activeIndex])

  useEffect(()=>{
    setActiveIndex('1')
  },[value])

  //看当前activeIndex，因为当修改Tabs的数据时，组件会重新获取数据，但activeIndex不会变，setImgPost就不会执行
  useEffect(()=>{
    if(activeIndex === '3'){
      let list = postList.filter((item)=>{
        return item.imgs.length !== 0
      }) 
      setImgPost([...list])
    }
  },[activeIndex, postList])

  const handleChange = async(key:string) => {
    if(key === '1'){
      setActiveIndex('1')
      let res = await reqSearchPost(value)
      setPostList([...res.data.data])
    }
    if(key === '2'){
      setActiveIndex('2')
      let res = await reqSearchUserInfo(value as string)
      setSearchUserInfo([...res.data.data])
    }
    if(key === '3'){
      setActiveIndex('3')
      let list = postList.filter((item)=>{
        return item.imgs.length !== 0
      }) 
      setImgPost([...list])
    }
  }

  const changeFresh = () => {
    setFresh(!fresh)
  }

  return (
    <>
      <div className={style.header}>
        <div className={style.back} onClick={()=>{navigate(-1)}}>
          <IconBack></IconBack>
        </div>
        <SearchBar defaultValue={value as string} 
          onSearch = {(value)=>{value === '' ? 
          Toast.show({
            icon:'fail',
            content:'不能为空'
          })
          :
          navigate(`/main/searchresult?value=${value}`)
        }}  
        />
      </div>
      <div className={style.main}>
        <Tabs
          activeKey={activeIndex}
          onChange={(key) => {
            handleChange(key)
          }}
        >
          <Tabs.Tab title="帖子" key="1">
            {
              postList.map((item:PostItems)=>{
                return (
                  <PostItem
                    itemInfo={item}
                    cite = {false}
                    user={false}
                    key = {item._id}
                    changeFresh={changeFresh}
                  ></PostItem>
                )
              })
            }
          </Tabs.Tab>
          <Tabs.Tab title="用户" key="2">
            {
              searchUserInfo.length === 0 ?
              '用户不存在'
              :searchUserInfo.map((item:UserInfo)=>{
                return (
                  <SearchUserList info = {item} key={item._id}></SearchUserList>
                )
              })
            }
          </Tabs.Tab>
          <Tabs.Tab title="照片" key="3">
            {
              imgPost.map((item)=>{
                return (
                  <PostItem
                    itemInfo={item}
                    cite = {false}
                    key = {item._id}
                    user={false}
                    changeFresh={changeFresh}
                  ></PostItem>
                )
              })
            }
          </Tabs.Tab>
        </Tabs>
      </div>
    </>
  );
}
