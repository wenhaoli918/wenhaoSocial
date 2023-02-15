import React, { useState } from 'react'
import style from './style.module.scss'
import { ReactComponent as IconBack } from '../../../assets/imgs/back.svg'
import { ReactComponent as IconCamera } from '../../../assets/imgs/camera.svg'
import { useUser } from '../../../hooks/user'
import { Avatar, Toast } from 'antd-mobile'
import { reqUpdateInfo, reqUpLoad } from '../../../api/api'

export default function UserInfo() {
  const {userInfo} = useUser()
  const [info,setInfo] = useState({...userInfo})
  const handleUpload = (e:any) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    let name = file.name
    reader.readAsDataURL(file);
    reader.onload = async(event) => {
      let base64 = event.target?.result as string
      let base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
      let res = await reqUpLoad(base64Data,name)
      setInfo({...userInfo,backImgUrl:res.data.data})
    }
  }

  //修改信息
  const handleSave = async() =>{
    let res = await reqUpdateInfo(info)
    if(res.data.msg){
      Toast.show({
        icon: "success",
        content: "修改成功",
      });
    }
  }
console.log(info);

  return (
    <div className={style.changeInfo}>
      <div className={style.header}>
        <div><IconBack/></div>
        <div className={style.title}>编辑个人资料</div>
        <div className={style.save} onClick={()=>{handleSave()}}>保存</div>
      </div>
      <div className={style.backImg}>
        <input className={style.file} type="file" name="img" onChange={handleUpload}/>
        <img src={info.backImgUrl?info.backImgUrl:userInfo.backImgUrl} alt="" />
        <div className={style.camera}><IconCamera></IconCamera></div>
      </div>
      <div className={style.logo}>
        <div className={style.camera2}><IconCamera></IconCamera></div>
        <Avatar src={userInfo.headimgurl as string}></Avatar>
      </div>
      <div className={style.name}>
        姓名：<span className={style.userName}>{userInfo.username}</span>
      </div>
      <div className={style.introduce}>
        个人简介: <span className={style.userName}>111111111111111111111</span>
      </div>
    </div>
  )
}
