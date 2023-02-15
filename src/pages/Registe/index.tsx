import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import style from './style.module.scss'
import { ReactComponent as IconLogin } from '../../assets/imgs/login.svg'
import { ReactComponent as IconInput } from '../../assets/imgs/input.svg'
import { Avatar,Input, Toast } from 'antd-mobile'
import classNames from 'classnames'
import { getRegiste } from '../../api/api'

export default function Regiset() {
  const { state } = useLocation()
  const [ userName,setUserName ] = useState('')
  const navigate = useNavigate()
  const handleRegist = async() => {
    if(userName === ''){
      Toast.show({
        icon: 'fail',
        content: '用户名不能为空',
      })
      return
    }
      await getRegiste({
      userName,
      openid:state.openid,
      nickname:state.nickname,
      headimgurl:state.headimgurl
    })
    navigate('/login')
  }

  return (
    <div className={style.registe}>
      <IconLogin className={style.logo}></IconLogin>
      <div className={style.content}><Avatar src={state.headimgurl}></Avatar></div>
      <div className={style.content}><span>{state.nickname}</span></div>
      <div className={classNames(style.content,style.addStyle)}>
        <span className={style.logoSpan}><IconInput></IconInput></span>
        <Input
          placeholder='用户名'
          style={{ '--text-align': 'center' }}
          clearable
          onChange={(value)=>{setUserName(value)}}
        /></div>
        <div className={classNames(style.content,style.addStyle)}
        onClick={()=>{handleRegist()}}
        >注册</div>
    </div>
  )
}