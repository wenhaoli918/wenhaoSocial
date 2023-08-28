import React, { useEffect } from 'react'
import { useUser } from '../../hooks/user'
import style from './style.module.scss'
import {ReactComponent as IconBack} from '../../assets/imgs/back.svg'
import { Tabs } from 'antd-mobile'
import SearchUserList from '../../components/SearchUserList'
import { Liked } from '../../types'
import { useNavigate } from 'react-router-dom'
import useFocusList from '../../hooks/useFocusList'
import useFollower from '../../hooks/useFollower'

export default function FocusPage() {
  const {userInfo } = useUser()
  const { username } = userInfo
    //关注列表相关
    let {focusList,setFocusList,setForceFresh,forceFresh} = useFocusList()

    //粉丝列表相关
    let {follower,setFollower} = useFollower()
    const navigate = useNavigate()

    const handleClick = () => {
      setForceFresh(!forceFresh)
    }
    
  return (
    <div className={style.mainContent}>
      <div className={style.header}>
        <div className={style.back} onClick={() => {navigate(-1)}}><IconBack></IconBack></div>
        <div className={style.name}>{username}</div>
      </div>
      <div className={style.tabs}>
          <Tabs onChange={() => {handleClick()}}>
            <Tabs.Tab title='关注者' key='fans'>
              {
                follower.map((item:Liked)=>{
                  return (
                    <SearchUserList
                      key = {item._id}
                      user_Id = {item.currentId}
                    ></SearchUserList>
                  )
                })
              }
            </Tabs.Tab>
            <Tabs.Tab title='正在关注' key='focus'>
            {
                focusList.map((item:Liked)=>{
                  return (
                    <SearchUserList
                      key = {item._id}
                      user_Id = {item.followId}
                    ></SearchUserList>
                  )
                })
              }
            </Tabs.Tab>
          </Tabs>
        </div>
    </div>
  )
}
