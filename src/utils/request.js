// axios封装
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 实例化
// 1. baseURL
// 2. 超时时间
// 3. 大数处理
const request = axios.create({
    // baseURL: '/api', // 默认的 接口根地址
    timeout: 5000 // 超时时间
})

// 拦截器

// 1.请求拦截器  全局注入token
request.interceptors.request.use((config) => {
    // 在发送请求之前做些什么

    // 从sessionStorage的缓存中获取用户信息
    let userJson = sessionStorage.getItem("user")
    if (!userJson) {
        router.push("/login")
    }

    // 从store里面拿到当前的用户token 放到请求headers中
    // 1. 获取token
    // const token = store.state.user.token
    // 2. 请求头设置token
    // if (token) config.headers.Authorization = `Bearer ${token}`

    config.headers['Content-Type'] = 'application/json;charset=utf-8';


    return config
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
})

// 2.响应拦截器
//   1. token失效 401 跳转到登录页
//   2. 当后端接口不是以http 200 - 300 而是通过自定义字段展示一个接口的成功状态
//      success -> true

// 添加响应拦截器
request.interceptors.response.use((response) => {
    // 对响应数据做点什么 200 -300
    let res = response.data
    // 加载的是文件
    if (response.config.responseType === 'blob') {
        return res
    }
    // 加载的是字符串数据
    if (typeof res === 'string') {
        res = res ? JSON.parse(res) : res
    }
    return res
}, (e) => {
    // 对响应错误做点什么 除了200 - 300
    // console.log('err' + e) // for debug
    // 如果是401 token失效  跳回到登录页
    // if (e.response && e.response.status === 401) {
    //     // route 内置了转码操作
    //     const redirectUrl = encodeURIComponent(router.currentRoute.value.fullPath)
    //     router.push('/login?redirectUrl=' + redirectUrl)
    // }
    return Promise.reject(e)
})

export default request

// 封装一个通用的函数 帮助用户解决get post 传参形式的不一样
// axios get  -> params  post -> data

/**
 * @description: 请求函数
 * @param {*} url  请求地址
 * @param {*} method  请求方法 GET/POST
 * @param {*} reqData  请求参数 Object
 * @return {*} Promise
 */
// export default function request (url, method, reqData) {
//     return instance({
//         url,
//         method,
//         [method.toLowerCase() === 'get' ? 'params' : 'data']: reqData
//     })
// }
