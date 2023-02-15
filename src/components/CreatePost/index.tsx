import React from 'react'
import style from './style.module.scss'
import { ReactComponent as IconAdd } from "../../assets/imgs/add.svg";
import { useNavigate } from 'react-router-dom';

export default function CtratePost() {
  const navigate = useNavigate()
  return (
    <div className={style.create}>
      <IconAdd onClick={() => {navigate('/main/create',{state:{type:'create'}})}}/>
    </div>
  )
}