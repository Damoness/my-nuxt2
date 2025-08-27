export default function (app) {
  const axios = app.$axios

  axios.defaults.timeout = 60000

  // 请求回调
  axios.onRequest((config) => {
    if (process.server) {
      config.baseURL = 'https://yx.fullgoalservice.com.cn'
    }
    return config
  })

  // 返回回调
  axios.onResponse((res) => {
    return res.data
  })
}
