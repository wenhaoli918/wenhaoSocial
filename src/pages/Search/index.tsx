import { SearchBar, Toast } from 'antd-mobile'
import { CloseOutline } from 'antd-mobile-icons'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CreatePost from '../../components/CreatePost'
import RecentItem from '../../components/RecentItem'
import { gRecent, rRecent, sRecent } from '../../utils/recent'
import style from './style.module.scss'

export default function Search() {
  const navigate = useNavigate()
  const [recent,setRecent] = useState<any>([])
  useEffect(()=>{
    setRecent(gRecent())
  },[])
  
  //前往最近搜索
  const goRecent = (item:string | number) => {
    navigate(`/main/searchresult?value=${item}`)
  }

  const deletRecent =() => {
    rRecent()
    setRecent(gRecent())
  }

  return (
    <>
      <div className={style.header}>
        <SearchBar 
          placeholder='请输入内容'
          showCancelButton={() => true} 
          onSearch = {(value)=>{value === '' ? 
            Toast.show({
              icon:'fail',
              content:'不能为空'
            })
            :
            sRecent([value,...recent])
            navigate(`/main/searchresult?value=${value}`)
          }}
          />
      </div>
      <div className={style.main}>
        <div className={style.mainHeader}>
          <span className={style.recentSearch}>最近搜索</span>
          <CloseOutline fontSize={15} color='#666666' onClick={()=>{deletRecent()}}/>
        </div>
        <div className={style.recentItem}>
          {
            recent.map((item:string | number)=>{
              return (
                <RecentItem key={item} item={item} goRecent={goRecent}></RecentItem>
              )
            })
          }
        </div>
      </div>
      <CreatePost></CreatePost>
    </>
  )
}
