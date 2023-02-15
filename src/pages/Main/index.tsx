import { TabBar } from 'antd-mobile'
import React, { useEffect } from 'react'
import { useUser } from '../../hooks/user'
import style from './style.module.scss'
import { ReactComponent as IconHome } from '../../assets/imgs/home.svg'
import { ReactComponent as IconActHome } from '../../assets/imgs/activeHome.svg'
import classNames from 'classnames'
import { BellOutline, MailOutline, SearchOutline } from 'antd-mobile-icons'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function Main() {

  const {getAppUserInfo,isLogin} = useUser()

  useEffect(() => {
      isLogin()
      getAppUserInfo()
  },[getAppUserInfo, isLogin])

  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const setRouteActive = (value: string) => {
    navigate(value)
  }

  const tabs = [
    {
      key: '/main/home',
      // icon: <IconHome />,
      icon:(active:boolean) => {
        return active ? <IconActHome></IconActHome> : <IconHome></IconHome> 
      }
    },
    {
      key: '/main/search',
      icon: <SearchOutline />,
    },
    {
      key: '/main/alert',
      // icon: (active: boolean) =>
      //   active ? <IconAlert /> : <IconAlert />,
      icon:<BellOutline />
    },
    {
      key: '/main/message',
      icon: <MailOutline />,
    },
  ]

  return (
    <div className={style.main}>
      <Outlet></Outlet>
      <div className={pathname === '/main/create'? classNames(style.footer,style.footerHidden): style.footer} >
        <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
          {tabs.map(item => (
            <TabBar.Item className={style.footerIcon} key={item.key} icon={item.icon} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}
