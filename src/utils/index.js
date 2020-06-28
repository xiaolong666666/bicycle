import React from 'react'
import { Select } from 'antd'
const { Option } = Select
export default {
    formatDate(time){
        if(!time) return '';
        let mydate = new Date(time);
        let month = mydate.getMonth() > 8 ? (mydate.getMonth() + 1) : '0' + (mydate.getMonth() + 1);
        let date = mydate.getDate() > 9 ? mydate.getDate() : '0' + mydate.getDate();
        let hours = mydate.getHours() > 9 ? mydate.getHours() : '0' + mydate.getHours();
        let minutes = mydate.getMinutes() > 9 ? mydate.getMinutes() : '0' + mydate.getMinutes();
        let seconds = mydate.getSeconds() > 9 ? mydate.getSeconds() : '0' + mydate.getSeconds();
        return mydate.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    },
    pagination(data,callback){
        return {
            onChange: (current) => {
                callback(current)
            },
            current: data.page,
            pageSize: data.page_size,
            total: data.total,
            showTotal: () => {
                return `共${data.total}条`
            },
            showQuickJumper: true
        }
    },
    getOptionList(data){
        if(!data){
            return []
        }
        let options = []
        data.map(item=>{
            options.push(<Option key={item.id} value={item.id}>{item.name}</Option>)
            return true
        })
        return options
    },
    updateRowClick(setSelectedRows, setSelectedRowKeys, record, index, setSelectedIds, ids){
        if(ids){
            setSelectedRows(record)
            setSelectedRowKeys(index)
            setSelectedIds(ids)
        }else{
            setSelectedRows(record)
            setSelectedRowKeys(index)
        }
    }
}