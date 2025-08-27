export function toError({
  error,
  res,
  msg,
  title = '请求失败',
  noToast = false,
}) {
  let message = ''
  if (msg) {
    message = msg
  } else if (res) {
    message = `{${res.code || res.errorCode}}${res.msg}`
  } else {
    message = title
  }
  // console.log('message', message)
  error({
    statusCode: 403,
    title,
    message,
    noToast,
  })
}

/*
 * 判断是涨还是跌
 * */
export const judgeUpDown = (str) => {
  if (!str || str === 0 || str == null) return
  str = str.toString()
  if (str.includes('-')) return 'loss'
  return 'profit'
}

export const judgeUpDownNum = (num) => {
  if (num === null || num === undefined) return '––'
  if (num === 0) return '0.00%'
  num = Number(num)
  return `${num > 0 ? '+' : ''}${(Math.round(num * 10000) / 100).toFixed(2)}%`
}
