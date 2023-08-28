import React, { useContext, useEffect, useState } from 'react'
import { reqUserFocus } from '../api/api'
import myContext from '../myContext'

export default function useFocusList() {
  const {focusList,setFocusList,userInfo} = useContext(myContext)
  const [forceFresh,setForceFresh] = useState(false)
  useEffect(() => {
    reqUserFocus(userInfo._id as string).then((res:any) => {
      setFocusList([...res.data.data])
    })
  },[userInfo._id,forceFresh])
  return {focusList,setFocusList,forceFresh,setForceFresh}
}
