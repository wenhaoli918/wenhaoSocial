import React from "react"
import { UserInfo } from "./types"

interface MyContext {
  userInfo:UserInfo,
  focusList:UserInfo[],
  setUserInfo:(userInfo:UserInfo) => void,
  setFocusList:(focusList:UserInfo[]) => void
  setScrollNum: (number:number) => void
  scrollNum:number
}

const myContext = React.createContext<MyContext>({
  userInfo:{},
  focusList:[],
  setUserInfo:() => {},
  setFocusList:() => {},
  setScrollNum:()=>{ },
  scrollNum:0
})

export default myContext