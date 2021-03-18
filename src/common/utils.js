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

//歌词格式化
export function formatLrc(lrc) {
  let lyrics = lrc.split("\n");//lrc代表歌词文件内容的引用
  let lrcObj = {};
  for(let i = 0; i < lyrics.length; i++ ){
    let lyric = decodeURIComponent(lyrics[i]);
    let timeReg = /\[\d*:\d*(([.:])\d*)*]/g;
    let timeRegExpArr = lyric.match(timeReg);
    if(!timeRegExpArr)continue;
    let clause = lyric.replace(timeReg,'');
    for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
      let t = timeRegExpArr[k];
      let min = Number(String(t.match(/\[\d*/i)).slice(1)),
        sec = Number(String(t.match(/:\d*/i)).slice(1));
      let time = min * 60 + sec;
      lrcObj[time] = clause;
    }
  }
  return lrcObj;
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

//快速排序歌单
export function quickSortPlayLists(data, attribute) {
  if (data.length <= 1) {
    return data;
  }
  let left = [];
  let right = [];
  let baseNum = data.splice(0,1)[0];
  for (let val of data) {
    if (parseInt(val[attribute]) > parseInt(baseNum[attribute])) {
      left.push(val);
    }else {
      right.push(val);
    }
  }
  left = quickSortPlayLists(left, attribute);
  right = quickSortPlayLists(right, attribute);
  return [...left, baseNum, ...right];
}




















