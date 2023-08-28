import React, { useContext, useEffect, useMemo, useState } from 'react'
import { reqPosts } from '../api/api'
import myContext from '../myContext'
import { PostItems } from '../types'

export default function useAllPosts() {
  const {userInfo} = useContext(myContext)
  let [allPosts,setAllPosts] = useState<PostItems[]>([])
  const [skip, setSkip] = useState(0)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    reqPosts(userInfo._id as string,0).then((res) => {
      setAllPosts([...res.data.data])
      setSkip(res.data.data.length)
      setTotal(res.data.total)
    }) 
  },[userInfo._id])

  const getAuditList = async() => {
    let res = await reqPosts(userInfo._id as string,skip)
    let num = Math.floor(skip/10)
    let res2:any = []
    if(num){
      for(let i = 1;i<num + 1;i++){
        let res3 = await reqPosts(userInfo._id as string,(i - 1)*10)
        res2 = res2.concat(res3.data.data)
      }
  }
  setAllPosts([...res2.concat(res.data.data)])
  setSkip(skip + res.data.data.length) 
  }

  const hasMore = useMemo(() => {
    return skip < total
  }, [skip, total])
  return {allPosts,setAllPosts,getAuditList,hasMore}
}

