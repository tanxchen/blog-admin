import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 60000
})
// if (process.env.NODE_ENV === 'production') {
//   axiosInstance.defaults.baseURL = 'http://127.0.0.1:3333'
// }
// 统一处理ajax失败
axiosInstance.interceptors.response.use(function (res) {
  const response = res.data
  // if (!response.success) {
  //   alert(JSON.stringify(response))
  //   return
  // }
  return response
}, function (error) {
  alert('网络中断了，请重试')
  return Promise.reject(error)
})

window.$http = axiosInstance
