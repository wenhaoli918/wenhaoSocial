import { ImageViewer } from "antd-mobile";
import React, { useEffect, useState } from "react";
import { ImgArr } from "../../types";

interface Props{
  imgs:ImgArr[],
  className:string
}

export default function Imgs({imgs,className}:Props) {
  //控制查看图片组件显示与隐藏
  const [visible, setVisible] = useState<boolean>(false);

  //当前展示图片
  const [imgUrl, setImgUrl] = useState<string>('');


  //图片懒加载
  useEffect(() => {
    let imges = document.getElementsByClassName(className)
    if(imges.length !== 0){ 
      const callBack = (entries:any) => {
        entries.forEach((entry:any) => {
          //拿到每张图片的dom元素
          // let item = entry.target
          // let data_src = item.getAttribute('data-src')
          // item.setAttribute('src',data_src)
          // observer.unobserve(item)
          if(entry.isIntersecting){
            let item = entry.target
            let data_src = item.getAttribute('data-src')
            item.setAttribute('src',data_src)
            observer.unobserve(item)
          }
        }) 
      }
      const observer = new IntersectionObserver(callBack)
      for(let i = 0;i<imges.length;i++){
        imges[i].childNodes.forEach((item) => {
          observer.observe(item as Element)
        })
      }
    }
  },[className])
  
  return (
    <div
      className={className}
    >
      {imgs.map((item: any) => {
        return (
          <img
            data-src={item.url}
            alt=""
            key={item.url}
            onClick={() => {
              setVisible(true);
              setImgUrl(item.url);
            }}
          />
        );
      })}
      <ImageViewer
        maxZoom={1}
        image={imgUrl}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}
