import { useCallback, useContext, useState } from "react";
import { reqInfoList ,reqGetRead} from "../api/api";
import myContext from "../myContext";
import { Notice } from "../types";

export const useInfo = () => {
  const {userInfo} = useContext(myContext)
  const {_id} = userInfo
  const [noticeList,setNoticeList] = useState<Notice[]>([])

  //获取通知列表
  const getInfoList = useCallback(async() => {
    let res = await reqInfoList(_id as string)
    setNoticeList([...res.data.data])
  },[_id])

  //标为已读或者未读
  const getRead = useCallback(async(id:string,isRead:boolean)=>{
    let res = await reqGetRead(id,isRead)
    return res.data.msg
  },[])

  return {
    noticeList,
    userInfo,
    getInfoList,
    getRead,
    setNoticeList
  }
}