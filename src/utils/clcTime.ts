export const getDateDiff = (dateTimeStamp:number) => {
  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - dateTimeStamp;
  if(diffValue < 0){return;}
  var monthC =diffValue/month;
  var weekC =diffValue/(7*day);
  var dayC =diffValue/day;
  var hourC =diffValue/hour;
  var minC =diffValue/minute;
  let result = ''
  if(monthC>=1){
    result="" + parseInt(monthC.toString()) + "月前";
  }
  else if(weekC>=1){
    result="" + parseInt(weekC.toString()) + "周前";
  }
  else if(dayC>=1){
    result=""+ parseInt(dayC.toString()) +"天前";
  }
  else if(hourC>=1){
    result=""+ parseInt(hourC.toString()) +"小时前";
  }
  else if(minC>=1){
    result=""+ parseInt(minC.toString()) +"分钟前";
  }else
  {result="刚刚";}
  return result;
}

export const formatDate = (value:string) => {
  if (typeof (value) == 'undefined') {
      return ''
  } else {
      let date = new Date(parseInt(value))
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? parseInt(('0' + MM)) : MM
      let d = date.getDate()
      d = d < 10 ? parseInt(('0' + d)) : d
      let h = date.getHours()
      h = h < 10 ? parseInt(('0' + h)) : h
      let m = date.getMinutes()
      m = m < 10 ? parseInt(('0' + m)) : m
      return y + '/' + MM + '/' + d + ' ' + h + ':' + m 
  }
}