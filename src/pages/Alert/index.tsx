import React, { useEffect } from "react";
import style from "./style.module.scss";
import { useInfo } from "../../hooks/info";
import { Notice } from "../../types";

import NoticeItem from "../../components/NoticeItem";

export default function Alert() {
  const { getInfoList, userInfo, noticeList, getRead, setNoticeList } =
    useInfo();

  useEffect(() => {
    if (userInfo.openid) {
      //获取消息列表
      getInfoList();
    }
  }, [getInfoList, userInfo]);
  console.log(noticeList);

  return (
    <>
      <div className={style.alertHeader}>
        <div className={style.userLogo}>
          <img src={userInfo.headimgurl} alt="" />
        </div>
        <div className={style.notice}>通知</div>
      </div>
        <div className={style.alertItem}>
          {noticeList.map((item: Notice) => {
            return (
              <NoticeItem
                itemInfo={item}
                key={item.createdAt}
                getRead={getRead}
                setNoticeLis={setNoticeList}
                noticeList={noticeList}
              ></NoticeItem>
            );
          })}
        </div>
    </>
  );
}
