//防抖 延迟执行
export function debounce(callback, delay) {
  let timer = null;
  return function (e) {
    if (timer) clearTimeout(timer);
    timer = setTimeout( () => {
      callback(e);
    },delay);
  }
}
//防抖 立即执行
export function debounceIIFE(callback, time) {
  let timer = null;
  return function (e) {
    timer === null ? callback(e) : clearTimeout(timer);
    timer = setTimeout( () => {
      timer = null;
    }, time);
  }
}
//音视频时间格式化
export function formatTime(time) {
  let b = "";
  let h = parseInt(time/3600),
    m = parseInt(time%3600/60),
    s = parseInt(time%3600%60);
  if(h>0){
    h = h<10 ? '0'+h : h;
    b += h+":";
  }
  m = m<10 ? '0'+m : m;
  s = s<10 ? '0'+s : s;
  b+=m+":"+s;
  return b;
}
//日期格式化
export function formatDate(time) {
  var date = new Date(time * 1);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
  var D = (date.getDate()< 10 ? '0'+date.getDate():date.getDate())+ ' ';
  return Y+M+D;
}

//数据分页
export function paging(arr, pageCount) {
  const pages = [];
  arr.forEach( (value, index) => {
    const page = Math.floor(index / pageCount);
    if (!pages[page]) {
      pages[page] = [];
    }
    pages[page].push(value);
  })
  return pages;
}

//按播放数数快速排序歌单
export function quickSortPlayLists(data) {
  if (data.length <= 1) {
    return data;
  }
  let left = [];
  let right = [];
  let baseNum = data.splice(0,1)[0];
  for (let val of data) {
    if (val.play_number * 1 > baseNum.play_number * 1) {
      left.push(val);
    }else {
      right.push(val);
    }
  }
  left = quickSortPlayLists(left);
  right = quickSortPlayLists(right);
  return [...left, baseNum, ...right];
}

//全屏滚动
export class PureFullPage {
  //构造函数
  constructor() {

  }

  //原型方法
  methods() {

  }

  //初始化函数
  init() {

  }
}



















