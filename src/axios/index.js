// import JsonP from 'jsonp'
import axios from 'axios'
import { Modal } from 'antd'
import Utils from './../utils'

export default {
    requestList(url, param, setDataSource, setPagination, request, setSelectedRowKeys, isMock) {
        var data = {
            params: param,
            isMock
        }
        this.ajax({
            url,
            data
        }).then(res=>{
            if(res && res.success){
                setDataSource(res.list)
                setPagination(Utils.pagination(res, current => {
                    param.page = current
                    request()
                }))
                setSelectedRowKeys(null)
            }
        })
    },
    // jsonp(params){
    //     return new Promise((resolve,reject)=>{
    //         JsonP(params.url,{
    //             param: 'callback'
    //         },(err,response)=>{
    //             if(response.status === 200){
    //                 resolve(response)
    //             }else{
    //                 reject(response.message)
    //             }
    //         })
    //     })
    // },
    ajax(options) {
        let loading;
        if (options.data && options.data.isShowLoading !== false) {
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve, reject) => {
            axios({
                url: options.url,
                method: 'get',
                timeout: 5000,
                params: (options.data && options.data.params) || ''
            }).then((response) => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status === 200) {
                    let res = response.data;
                    if (!!res.success) {
                        resolve(res);
                    } else {
                        Modal.info({
                            title: "提示",
                            content: res.msg
                        })
                    }
                } else {
                    reject(response.data);
                }
            })
        });
    }
}