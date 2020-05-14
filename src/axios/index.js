import JsonP from 'jsonp'

export default {
    jsonp(params){
        return new Promise((resolve,reject)=>{
            JsonP(params.url,{
                param: 'callback'
            },(err,response)=>{
                if(response.status === "success"){
                    resolve(response)
                }else{
                    reject(response.message)
                }
            })
        })
    }
}