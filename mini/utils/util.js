const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

function formatDate(date, fmt) {
  const weekMap = { 0: '周日', 1: '周一', 2: '周二', 3: '周三', 4: '周四', 5: '周五', 6: '周六' };
  const day = date.getDay();
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  if (/(w+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, weekMap[day]);
  if (/(W+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, day === 0 || day === 6 ? `(${weekMap[day]})` : '');
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length));
    }
  }
  return fmt;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const openidData = async () => {
  const openid = wx.getStorageSync('userOpenid')
  const res = await getApp().call({
    // 云函数名称
    name: 'wishes-520',
    // 传给云函数的参数
    data: {
      type: 'getMyInvite',
    }
  })
  // that.setData({
  //     datalist:res.result.data,
  //     day:that.timesize(that.data.newtime,res.result.data.memorialDayTime)||0
  // })
  try {
    wx.setStorageSync('recipientId', res.data.inviter == openid ? res.data.recipient : res.data.inviter)
  } catch (error) {
    wx.removeStorageSync('recipientId');
  }
}

module.exports = {
  formatTime,
  openidData,
  formatDate
}