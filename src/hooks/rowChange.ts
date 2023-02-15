import {useRef,useEffect} from 'react'

interface Props{
  index:number,
  setRowHeight:(index:number,c:any)=>void
}

export const useRowChange = ({index,setRowHeight}:Props) => {
  const rowRef = useRef<any>(null)
  useEffect(()=>{
    if(rowRef.current){
      // console.log(rowRef.current.firstChild as HTMLDivElement);
      // console.log((rowRef.current.firstChild as HTMLDivElement).clientHeight)
      setRowHeight(index,rowRef.current?.offsetHeight)
    }
  },[index, setRowHeight])
  return rowRef
}