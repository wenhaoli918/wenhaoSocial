import React, { useEffect } from 'react'
import { useUser } from '../../hooks/user'
import style from './style.module.scss'
import {ReactComponent as IconBack} from '../../assets/imgs/back.svg'
import { Tabs } from 'antd-mobile'
import SearchUserList from '../../components/SearchUserList'
import { Liked } from '../../types'
import { useNavigate } from 'react-router-dom'

export default function FocusPage() {
  const {userInfo ,getUserFocus,focusList,follower,getUserFollower} = useUser()
  const { username } = userInfo
  const navigate = useNavigate()
  useEffect(()=>{
    getUserFollower(userInfo._id as string)
    getUserFocus(userInfo._id as string)
  },[getUserFocus, getUserFollower, userInfo._id])
  console.log(focusList);
  
  const handleChange = (value:string) => {
    if(value === 'focus'){
      console.log(111);
      
      getUserFocus(userInfo._id as string)
    }
    if(value === 'fans') {
      getUserFollower(userInfo._id as string)
    }
  }

  return (
    <div className={style.mainContent}>
      <div className={style.header}>
        <div className={style.back} onClick={() => {navigate(-1)}}><IconBack></IconBack></div>
        <div className={style.name}>{username}</div>
      </div>
      <div className={style.tabs}>
          <Tabs onChange={(value)=>{handleChange(value)}}>
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
