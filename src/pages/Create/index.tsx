import React, { useCallback, useContext, useState } from "react";
import style from "./style.module.scss";
import { ReactComponent as IconPic } from "../../assets/imgs/pic.svg";
import { Avatar, ImageUploader, TextArea, Toast } from "antd-mobile";
import myContext from "../../myContext";
import { useLocation, useNavigate } from "react-router-dom";
import { commentPost, createPost, reqUpLoad } from "../../api/api";
import { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import PostItem from "../../components/PostItem";
import classNames from "classnames";

export default function Ctrate() {
  enum Type {
    create = "create",
    comment = "comment",
    forward = "forward",
  }

  const maxCount = 4
  const [fileList, setFileList] = useState<ImageUploadItem[]>([])
  console.log(fileList);
  
  const upload = (file: File):Promise<ImageUploadItem> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      let name = file.name
      reader.readAsDataURL(file);
      reader.onload = async(event) => {
        let base64 = event.target?.result as string
        let base64Data = base64.replace(/^data:image\/\w+;base64,/, '')
        let res = await reqUpLoad(base64Data,name)
        resolve({
          url:res.data.data
        })
      }
    })
  }

  const { userInfo } = useContext(myContext);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { type, itemInfo } = state;

  const handleCreate = useCallback(async () => {
    const { _id } = userInfo;
    if (value === "") {
      Toast.show({
        icon: "fail",
        content: "内容不能为空",
      });
      return;
    }
    //判断从哪点进的帖子，是创建还是评论还是转发
    //新建帖子
    if (type === Type.create) {
      let res = await createPost({ _id: _id as string, content: value, imgs:fileList });
      navigate("/main/home");
      Toast.show({
        icon: "success",
        content: res.data.msg,
      });
    }

    //评论帖子
    if (type === Type.comment) {
      const { _id } = state.itemInfo;
      let res = await commentPost({
        postId: _id,
        userId: userInfo._id as string,
        content: value,
      });
      if (res.data.msg === "评论成功") {
        navigate("/main/postdetail", { state: { itemInfo } });
        Toast.show({
          icon: "success",
          content: res.data.msg,
        });
      }
    }
  }, [Type.comment, Type.create, fileList, itemInfo, navigate, state.itemInfo, type, userInfo, value]);

  return (
    <>
      <div className={style.header}>
        <span
          className={style.cancel}
          onClick={() => {
            navigate(-1);
          }}
        >
          取消
        </span>
        <span
          className={style.publish}
          onClick={() => {
            handleCreate();
          }}
        >
          发布
        </span>
      </div>
      <div className={style.main}>
        {type === Type.create ? (
          <div className={style.post}>
            <div className={style.postLeft}>
              <Avatar src={userInfo.headimgurl as string}></Avatar>
            </div>
            <div className={style.postRight}>
              <TextArea
                placeholder="请输入内容"
                value={value}
                autoSize={true}
                maxLength={150}
                onChange={(val) => {
                  setValue(val);
                }}
              />
              <ImageUploader
                style={{'--cell-size':'130px'}}
                value={fileList}
                onChange={setFileList}
                upload={upload}
                multiple
                children={
                  <div className={classNames(style.footer)}>
                    <IconPic></IconPic>
                  </div>
                }
                maxCount={maxCount}
                showUpload={fileList.length < maxCount}
                onCountExceed={exceed => {
                  Toast.show(`最多选择 ${maxCount} 张图片，你多选了 ${exceed} 张`)
                }}
              />
            </div>
          </div>
        ) : type === Type.comment ? (
          <div className={style.comment}>
            <PostItem itemInfo={state.itemInfo} cite={true} user={false}></PostItem>
            <div className={style.post}>
              <div className={style.postLeft}>
                <Avatar src={userInfo.headimgurl as string}></Avatar>
              </div>
              <div className={style.postRight}>
                <TextArea
                  placeholder="请输入内容"
                  value={value}
                  autoSize={{ minRows: 3, maxRows: 10 }}
                  onChange={(val) => {
                    setValue(val);
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div>789</div>
        )}
      </div>
      {/* <div className={style.footer}>
        <IconPic></IconPic>
      </div> */}
    </>
  );
}
