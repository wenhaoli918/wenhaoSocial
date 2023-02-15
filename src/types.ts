interface UserInfo {
  backImgUrl?:string
  username?:string
  openid?: string,
  nickname?: string,
  headimgurl?: string,
  _id?:string
}

interface CodeP {
  code:string
}

interface RegisteP {
  userName:string | number
  openid:string
  nickname:string
  headimgurl:string
}

interface PostP{
  _id?:string,
  openid?:string,
  content?:string,
  imgs?:any
}

interface PostItems{
  author:UserInfo
  content:string,
  //回复的帖子的ID
  commenteId:string | null,
  //转发的帖子的ID
  forwardeId: string | null,
  //帖子被哪些用户喜欢
  likedBy:UserId[],
  //回复帖的数量
  commentNumber:number
  //转发贴的数量
  forwardNumber:number
  //帖子的收藏量：
  liked:number,
  ctime:number
  _id:string
  imgs:any,
}

interface Liked{
  _id?:string,

  // 当前的用户
  currentId?:string,

  // 喜欢的帖子Id，
  followId?:string,
  
  // 喜欢的时间
  createdAt?:number
}

interface IdsAcontent {
  postId:string,
  userId:string,
  content:string
}
interface ImgArr {
  url:string
}

interface PostFilter {
  author:string,
  commenteId?:string
}

interface UserId {
  userId:string
}

interface Notice {
  _id:string,
  currentId:UserInfo,
  noticedId:UserInfo,
  read:boolean,
  type:string,
  createdAt:string
  postId:PostItems
}

export type {
  UserInfo,CodeP,RegisteP,PostP,PostItems,Liked,IdsAcontent,ImgArr,PostFilter,UserId,Notice
}