import { Popup } from "antd-mobile";
import classNames from "classnames";
import React from "react";
import style from './style.module.scss'

interface Props {
  currentPostId:any
  visible:boolean
  handleDelete:(id:string) => void
  showDrawer:(id:string) => void
}

export default function Drawer({visible,showDrawer,currentPostId,handleDelete}:Props) {
  return (
    <>
      <Popup
        visible={visible}
        onMaskClick={() => {
          showDrawer(currentPostId)
        }}
        bodyStyle={{ height: "164px" }}
      >
        <div className={style.options}>请选择要执行的操作</div>
        <div
          className={classNames(style.options, style.delet)}
          onClick={() => {
            handleDelete(currentPostId);
            showDrawer(currentPostId)
          }}
        >
          删除帖子
        </div>
        <div
          className={style.cancel}
          onClick={() => {
          }}
        >
          取消
        </div>
      </Popup>
    </>
  );
}

