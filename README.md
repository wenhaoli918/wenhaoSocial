## 用户
interface userInfo{
  _id:ObjectId,

  // 账户
  openid:string
  
  // 用户名
  nickname:string,

  // 创建时间
  createdAt:number,
  
  // 用户头像
  headingurl:string,

  // 背景图
  backImgUrl:string
}

## 帖子

interface Post{
  _id:ObjectId,

  // 创建用户
  openid:string
  
  // 内容
  content:string,

  // 创建时间
  createdAt:number,

  // 图片路径
  imgs:[],

  // 回复的哪个帖子
  commenteId: string | null

  // 转发的哪个帖子
  forwardedI: string | null
}

## 喜欢
interface Focus{
  _id:ObejectId,

  // 当前的用户
  currentId:ObejectId,

  // 喜欢的帖子Id，
  likeId:ObejectId,
  
  // 喜欢的时间
  createdAt:number
}