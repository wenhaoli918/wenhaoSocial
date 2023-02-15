import React from 'react'
import style from './style.module.scss'
import {ReactComponent as IconUp} from '../../assets/imgs/up.svg'

interface Props {
  item:string | number
  goRecent:(item:string | number)=>void
}

export default function RecentItem({item,goRecent}:Props) {
  return (
    <div className={style.item}>
      <span className={style.name}>{item}</span>
      <span onClick={()=>{goRecent(item)}}><IconUp></IconUp></span>
    </div>
  )
}
