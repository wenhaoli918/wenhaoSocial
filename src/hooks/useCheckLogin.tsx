import { Navigate } from "react-router-dom"
export const UseCheckLogin = (props:any) => {
  let token = localStorage.getItem('login')
  return token ? props.children : <Navigate to='/login'/>
}