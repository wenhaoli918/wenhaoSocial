import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/user';

export default function Auth() {
  const {search} = useLocation()
  const {getWxUserInfo} = useUser()
  const query = search.split('=',2)[1]
  const code = query.split('&',2)[0]
  useEffect(() => {
    getWxUserInfo({code})
  },[code, getWxUserInfo])
  return (
    <div>授权中：</div>
  )
}
