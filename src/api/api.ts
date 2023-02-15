import { CodeP, IdsAcontent, PostP, RegisteP, PostFilter, UserInfo } from "../types";
import requests from "./request";


export const goLogin = () => requests({url:'/api/login',method:'get'})

//获得微信用户的信息
export const getWxInfo = (params:CodeP) => requests({url:'/api/user/wxlogin',params,method:'get'})

//获得系统用户的信息
export const getUserInfo = () => requests({url:'/api/user/userinfo',method:'get'})

export const getRegiste = (data:RegisteP) => requests({url:'/api/user/registe',data,method:'post'})

//创建帖子
export const createPost = (data:PostP) => requests({url:'/api/createpost',data,method:'post'})

//获得总帖子
export const reqPosts = (_id:string,skip:number) => requests({url:'/api/getpost',data:{_id,skip},method:'post'})

//获得每一个帖子的用户信息
export const reqPostUserInfo = (openid:string) => requests({url:'/api/getpostuserinfo',data:{openid},method:'post'})

//获取用户关注列表
export const reqUserFocus = (id:string) => requests({url:'/api/user/userfocus',data:{id},method:'post'})

//获取用户粉丝列表
export const reqUserFollower = (id:string) => requests({url:'/api/user/userfollower',data:{id},method:'post'})

//获取搜索用户信息
export const reqSearchUserInfo = (value:string) => requests({url:'/api/user/searchuser',data:{value},method:'post'})

//关注用户
export const getFocus = (focusid:string,userid:string) => requests({url:'/api/user/focus',data:{focusid,userid},method:'post'})

//取关用户
export const stopFocus = (focusid:string,userid:string) => requests({url:'/api/user/stopfocus',data:{focusid,userid},method:'post'})

//获取搜索帖子
export const reqSearchPost = (value:any) => requests({url:'/api/getsearchpost',data:{value},method:'post'}) 

//评论帖子
export const commentPost = (id:IdsAcontent) => requests({url:'/api/commentpost',data:{id},method:'post'})

//获取评论列表
export const reqCommentList = (id:string) => requests({url:'/api/commentlist',data:{id},method:'post'})

//获取用户自己的帖子
export const reqUserPosts = (data:PostFilter) => requests({url:'/api/userposts',data,method:'post'})

//删除帖子
export const reqDeletPost = (id:string) => requests({url:'/api/deletpost',data:{id},method:'post'})

//获取每一个用户信息
export const reqEachUser = (id:string) => requests({url:'/api/eachuser',data:{id},method:'post'})

//上传图片
export const reqUpLoad = (file:any,name:string) => requests({url:'/api/upload',data:{file,name},method:'post'})

//收藏帖子
export const reqShouCang = (postId:string,userId:string) => requests({url:'/api/shoucang',data:{postId,userId},method:'post'})

//取消收藏帖子
export const reqQxShouCang = (postId:string,userId:string) => requests({url:'/api/qxshoucang',data:{postId,userId},method:'post'})

//获取喜欢帖子
export const reqLikeList = (userId:string) => requests({url:'/api/likelist',data:{userId},method:'post'})

//更新用户信息
export const reqUpdateInfo = (data:UserInfo) => requests({url:'/api/user/updateinfo',data,method:'post'})

//获取通知列表
export const reqInfoList = (id:string) => requests({url:'/api/info/getnotice',data:{id},method:'post'})

//标为已读或者未读
export const reqGetRead = (id:string,isRead:boolean) => requests({url:'/api/info/getread',data:{id,isRead},method:'post'})

//根据id获取用户信息
export const getUserById = (userId:string) => requests({url:'/api/user/userinfobyid',method:'post',data:{userId}})

//删除消息
export const DeletInfo = (_id:string) => requests({url:'/api/info/delete',method:'post',data:{_id}})

//转发帖子
export const transPost = (data:any) => requests({url:'/api/transPost',data,method:'post'})

//查询单条帖子信息
export const reqSinglePost = (postId:string) => requests({url:'/api/reqsinglepost',data:{postId},method:'post'})