import React, { Suspense, useState } from 'react';
import style from './index.module.scss'
import { useRoutes } from 'react-router-dom';
import routers from './router';
import myContext from './myContext';
import { UserInfo } from './types';
import './utils/rem'

function App() {
  const elements = useRoutes(routers)
  const [userInfo,setUserInfo] = useState({})
  const [focusList,setFocusList] = useState<UserInfo[]>([])
  const [scrollNum,setScrollNum] = useState<number>(0)
  
  return (
    <myContext.Provider value = {{userInfo,setUserInfo,focusList,setFocusList,scrollNum,setScrollNum}}>
      <div className={style.App}>
        <Suspense >
          {elements}
        </Suspense>
      </div>
    </myContext.Provider>
  );
}

export default App;
