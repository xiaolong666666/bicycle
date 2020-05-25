import React, { useState, useEffect } from 'react';
import { Card, Table } from 'antd'
import axios from 'axios'
import './table.less'

const columns = [
    {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex'
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: '爱好',
        dataIndex: 'hoddy',
        key: 'hoddy'
    },
    {
        title: '是否已婚',
        dataIndex: 'married',
        key: 'married'
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        key: 'birthday'
    },
    {
        title: '联系地址',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: '早起时间',
        dataIndex: 'time',
        key: 'time'
    },
]

const dataSource = [
    {
        key: '0',
        userName: 'Tom',
        sex: '男',
        age: 19,
        status: '我在线上',
        hoddy: '乒乓球',
        married: '未婚',
        birthday: '2016-06-08',
        address: '北京市海淀区奥林匹克公园',
        time: '06:00:00'
    },
    {
        key: '1',
        userName: 'Jarry',
        sex: '男',
        age: 21,
        status: '离开一会',
        hoddy: '游戏',
        married: '已婚',
        birthday: '2014-06-08',
        address: '北京市海淀区奥林匹克公园',
        time: '06:30:00'
    },
    {
        key: '2',
        userName: 'Tom',
        sex: '女',
        age: 18,
        status: '忙碌',
        hoddy: '羽毛球',
        married: '未婚',
        birthday: '2003-04-08',
        address: '北京市海淀区奥林匹克公园',
        time: '05:30:00'
    }
]

const Basic = () => {

    let [dataSource1] = useState(dataSource)
    let [dataSource2, setDataSource2] = useState([])

    useEffect(()=>{
        axios.get('/basic')
        .then(res=>{
            setDataSource2(res.data.list)
        })
    },[])

    return (
        <div className='wrapper'>
            <Card title='基础表格' className='card-wrapper'>
                <Table bordered columns={columns} dataSource={dataSource1} pagination={false}/>
            </Card>
            <Card title='动态数据渲染表格-Mock' className='card-wrapper'>
                <Table bordered columns={columns} dataSource={dataSource2} pagination={false} />
            </Card>
        </div>
    );
};

export default Basic;