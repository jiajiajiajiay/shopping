// 企业级封装 axious
import axious from 'axios'
import qs from 'qs'

// 设置服务器基本路径
axious.defaults.baseURL='http://127.0.0.1:777'

export default {
    get (url,params={}){
        return new Promise((resolve,reject)=>{
            axious.get(url,{ params })
            .then(response=>{
                resolve(response.data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    },
    post (url,params={}){
        return new Promise((resolve,reject)=>{
            axious.post(url,qs.stringify(params))
            .then(response=>{
                resolve(response.data)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
}