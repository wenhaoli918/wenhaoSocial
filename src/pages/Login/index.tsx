import React, { useEffect } from 'react'
import style from './style.module.scss'
import { ReactComponent as IconLogin } from '../../assets/imgs/login.svg'
import { ReactComponent as IconWx } from '../../assets/imgs/wx.svg'
import { Button } from 'antd-mobile'
import { goLogin } from '../../api/api'
import { useUser } from '../../hooks/user'

export default function Login() {
  const{isLogin} = useUser()

  const handleLogin = async() => {
    let res:any = await goLogin()
    console.log(res);
    
    window.location.href = res.data.url   
  }

  //判断是否登录
  useEffect(() => {
    isLogin()
  },[isLogin])
  
  return (
    <div className={style.login}>
      <IconLogin className={style.logo}></IconLogin>
      <div className={style.loginButton}>
        <Button className={style.button} onClick={()=>{handleLogin()}}>
          <IconWx className={style.wxLogo}></IconWx>微信授权登录
        </Button></div>
    </div>
    
  )
}
