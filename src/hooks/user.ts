import { useCallback, useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getFocus, getUserById, getUserInfo, getWxInfo, reqUserFocus, reqUserFollower, stopFocus } from "../api/api"
import myContext from "../myContext"
import { UserInfo } from "../types"
interface CodeP {
  code:string
}

export const useUser = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {userInfo,setUserInfo} = useContext(myContext)
  const {focusList,setFocusList} = useContext(myContext)
  const [follower,setFollower] = useState<UserInfo[]>([])

  //获取用户微信信息
  const getWxUserInfo = useCallback(async(code:CodeP)=>{
    let res = await getWxInfo(code)
    
    if(res.data.sid){
        navigate('/main')
    } 
    if(res.data.nickname){
      const { nickname,headimgurl,openid } = res.data
      navigate('/registe',{state:{nickname,headimgurl,openid}})
      console.log(res.data.nickname);
    }
  },[navigate])

  //查询是否登录
  const isLogin = useCallback(async() => {
    let res = await getUserInfo()
    if(location.pathname === '/login'){
      if(res.code === 0){navigate('/main')}
    } else if(res.code !== 0 && location.pathname !== '/login' ){navigate('/login')}
    if(location.pathname === '/registe'){
      if(res.code === 0){
        navigate('/main')
      }
    }
  },[location.pathname, navigate])

  //获取系统用户信息
  const getAppUserInfo = useCallback(async()=>{
    let res = await getUserInfo()
    setUserInfo(res.data.data)
  },[setUserInfo])

  //查询用户关注列表
  const getUserFocus = useCallback(async(id:string)=>{
    let res = await reqUserFocus(id as string)
    setFocusList([...res.data.data])
  },[setFocusList])

  //查询用户粉丝列表
  const getUserFollower = useCallback(async(id:string)=>{
    let res = await reqUserFollower(id as string)
    setFollower([...res.data.data])
  },[])

  //关注用户
  const focusUser = useCallback(async(focusid:string,userid:string)=>{
    await getFocus(focusid,userid)
  },[])

  //取关用户
  const stopFocusUser = useCallback(async(focusid:string,userid:string)=>{
    await stopFocus(focusid,userid)
  },[])

  //根据id获取用户信息
  const getUser = useCallback(async(userId:string)=>{
    let res = await getUserById(userId)
    return res
  },[])

  return {
    userInfo,
    focusList,
    follower,
    stopFocusUser,
    setFollower,
    getUserFocus,
    isLogin,
    getWxUserInfo,
    getAppUserInfo,
    focusUser,
    getUserFollower,
    getUser
  }
}