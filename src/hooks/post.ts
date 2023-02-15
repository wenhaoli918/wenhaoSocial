import { useCallback, useContext, useMemo, useState } from "react"
import { reqCommentList, reqDeletPost, reqLikeList, reqPosts,reqQxShouCang,reqShouCang,reqSinglePost,reqUserPosts } from "../api/api"
import myContext from "../myContext"
import { PostItems, PostFilter } from "../types"
export const usePosts = () => {
  
  const {userInfo} = useContext(myContext)
  const [posts,setPosts] = useState<PostItems[] | []>([])
  const [userPosts,setUserPosts] = useState<PostItems[]>([])
  const [commentList,setCommentList] = useState<PostItems[]>([])
  const [likeList,setLikeList] = useState<PostItems[]>([])
  const [transP,setTransP] = useState<PostItems>()
  //跳过的数目
  const [skip, setSkip] = useState(0)
  //总数
  const [total, setTotal] = useState(0)

  //计算什么时候还能再加载
  const hasMore = useMemo(() => {
    return skip < total
  }, [skip, total])

  //获取总的帖子
  const getPosts = useCallback(async()=>{
    let res = await reqPosts(userInfo._id as string,0)
    setSkip(res.data.data.length) 
    setPosts([...res.data.data])
    setTotal(res.data.total)
  },[userInfo._id])

  const getAuditList = async () => {
    let res = await reqPosts(userInfo._id as string,skip)
    let num = Math.floor(skip/10)
    let res2:any = []
    if(num){
      for(let i = 1;i<num + 1;i++){
        let res3 = await reqPosts(userInfo._id as string,(i - 1)*10)
        res2 = res2.concat(res3.data.data)
      }
    }
    setPosts(res2.concat(res.data.data))
    setSkip(skip + res.data.data.length) 
  }

  //获取帖子的评论
  const getCommentList = useCallback(async(id:string)=>{
    let res = await reqCommentList(id)
    setCommentList([...res.data.data])
  },[])

  //删除帖子
  const deletPost = useCallback(async(id:string)=>{
    await reqDeletPost(id)
  },[])

  //收藏帖子
  const shouCangPost = useCallback(async(postId:string,userId:string)=>{
    await reqShouCang(postId,userId)
  },[])

  //取消收藏
  const qxShouCang = useCallback(async(postId:string,userId:string)=>{
    await reqQxShouCang(postId,userId)
  },[])

  //获得用户自己的图像贴
  const userPicpostList = useMemo(()=>{
    return userPosts.filter((item:PostItems)=>{
      return item.imgs.length !== 0
    })
    },[userPosts])

  //获得用户自己发的主题帖，转发贴
  const getUserPost = useCallback(async(data:PostFilter)=>{
    let res = await reqUserPosts(data)
    setUserPosts([...res.data.data])
  },[])

  //获取用户喜欢帖子列表
  const getLikeList = useCallback(async(userId:string)=>{
    let res = await reqLikeList(userId)
    setLikeList([...res.data.data])
  },[])

  //获取转发贴的信息
  const getTransPost = useCallback(async(id:string) => {
    let res = await reqSinglePost(id)
    setTransP(res.data.data[0])
  },[])
  return {
    posts,
    commentList,
    userPosts,
    userPicpostList,
    hasMore,
    likeList,
    total,
    transP,
    setPosts,
    getAuditList,
    getPosts,
    getCommentList,
    getUserPost,
    deletPost,
    shouCangPost,
    qxShouCang,
    getLikeList,
    getTransPost
  }
}