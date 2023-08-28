import React, { useContext, useEffect, useState } from 'react'
import myContext from '../myContext'
import { reqUserFollower } from '../api/api'
import { UserInfo } from '../types'

export default function useFollower() {
  const {userInfo} = useContext(myContext)
  const [follower,setFollower] = useState<UserInfo[]>([])
  useEffect(() => {
    reqUserFollower(userInfo as string).then((res:any) => {
      setFollower([...res.data.data])
    })
  },[userInfo._id])
  return {follower,setFollower}
}
