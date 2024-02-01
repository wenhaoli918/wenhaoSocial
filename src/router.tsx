import { lazy } from "react"
import { Navigate, useLocation } from "react-router-dom"
// import Alert from "./pages/Alert"
// import Auth from "./pages/Auth"
// import ChatPage from "./pages/chat"
// import Ctrate from "./pages/Create"
// import FocusPage from "./pages/focusPage"
// import Home from "./pages/Home"
// import Login from "./pages/Login"
// import Main from "./pages/Main"
// import Message from "./pages/Message"
// import NotFound from "./pages/NotFound"
// import PostDetail from "./pages/PostDetail"
// import Regiset from "./pages/Registe"
// import Search from "./pages/Search"
// import SearchResult from "./pages/SearchResult"
// import UserInfo from "./pages/User/UserInfo"
// import UserPage from "./pages/User/UserPage"
import { UseCheckLogin } from "./hooks/useCheckLogin"

const Login = lazy(() => import('./pages/Login'))
const Regiset = lazy(() => import('./pages/Registe'))
const Main = lazy(() => import('./pages/Main'))
const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search'))
const SearchResult = lazy(() => import('./pages/SearchResult'))
const Alert = lazy(() => import('./pages/Alert'))
const Message = lazy(() => import('./pages/Message'))
const ChatPage = lazy(() => import('./pages/chat'))
const UserPage = lazy(() => import('./pages/User/UserPage'))
const UserInfo = lazy(() => import('./pages/User/UserInfo'))
const Ctrate = lazy(() => import('./pages/Create'))
const PostDetail = lazy(() => import('./pages/PostDetail'))
const FocusPage = lazy(() => import('./pages/focusPage'))
const Auth = lazy(() => import('./pages/Auth'))
const NotFound = lazy(() => import('./pages/NotFound'))

const routers = [
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/registe',
    element:<Regiset/>
  },
  {
    path:'/main',
    element:<UseCheckLogin><Main/></UseCheckLogin>,
    // element:<Main></Main>,
    children: [
      { path: "home", element: <Home></Home> },
      { path: "search", element: <Search></Search> },
      { path: "searchresult", element: <SearchResult></SearchResult> },
      { path: "alert", element: <Alert></Alert> },
      { path: "message", element: <Message></Message> },
      { path: "chat", element: <ChatPage></ChatPage> },
      { path: "userpage", element: <UserPage></UserPage> },
      { path: "userinfo", element: <UserInfo></UserInfo> },
      { path: "create", element: <Ctrate></Ctrate> },
      { path: "postdetail", element: <PostDetail></PostDetail> },
      { path: "focuspage", element: <FocusPage></FocusPage> },
      { path: "", element: <Navigate to='home'/> }
    ]
  },
  {
    path:'/auth',
    element:<Auth/>
  },
  {
    path:'/',
    element:<Navigate to='/login'/>
  },
  {
    path:'*',
    element:<NotFound/>
  }
]

export default routers