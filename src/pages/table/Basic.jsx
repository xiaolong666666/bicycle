import React, { Component } from 'react';
import { Card, Table, Modal, Button, message } from 'antd'
import axios from './../../axios'
import Utils from './../../utils'
import 'defaultStyle/common.less'

const columns = [
    {
        title: 'id',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render(sex) {
            return sex === 1 ? '男' : '女'
        }
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render(status) {
            let config = {
                '1': '我在线上',
                '2': 'Q我吧',
                '3': '离开',
                '4': '忙碌',
                '5': '请勿打扰',
                '6': '隐身',
                '7': '离线'
            }
            return config[status]
        }
    },
    {
        title: '爱好',
        dataIndex: 'hoddy',
        key: 'hoddy',
        render(hoddy) {
            let config = {
                '1': '爬山',
                '2': '旅游',
                '3': '唱歌',
                '4': '台球',
                '5': '网球',
                '6': '篮球',
                '7': '足球',
                '8': '乒乓球',
                '9': '羽毛球',
                '10': '游戏'
            }
            return config[hoddy]
        }
    },
    {
        title: '是否已婚',
        dataIndex: 'married',
        key: 'married',
        render(married) {
            return married === 1 ? '已婚' : '未婚'
        }
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

const dataSource1 = [
    {
        key: '0',
        userName: 'Tom',
        sex: 1,
        age: 19,
        status: '1',
        hoddy: '2',
        married: 1,
        birthday: '2016-06-08',
        address: '北京市海淀区奥林匹克公园',
        time: '06:00:00'
    },
    {
        key: '1',
        userName: 'Jarry',
        sex: 1,
        age: 21,
        status: '3',
        hoddy: '3',
        married: 1,
        birthday: '2014-06-08',
        address: '北京市海淀区奥林匹克公园',
        time: '06:30:00'
    },
    {
        key: '2',
        userName: 'Susan',
        sex: 2,
        age: 18,
        status: '5',
        hoddy: '4',
        married: 2,
        birthday: '2003-04-08',
        address: '北京市海淀区奥林匹克公园',
        time: '05:30:00'
    }
]

class Basic extends Component {

    state = {
        dataSource2: [],
        selectedRadioRowKeys: null,
        selectedItem: null,
        selectedCheckRowKeys: null,
        selectedRows: null
    }

    params = {
        page: 1
    }

    componentDidMount () {
        this.request()
    }

    request = () => {
        let _this = this
        axios.ajax({
            url: '/api/basic',
            data: {
                params: {
                    page: this.params.page
                },
                isShowLoading: true
            }
        })
        .then(res => {
            this.setState({
                dataSource2: res.list,
                selectedCheckRowKeys: [],
                selectedRows: null,
                pagination: Utils.pagination(res, (current) => {
                    _this.params.page = current
                    this.request()
                })
            })
        })
    }

    handleRowClick = (record, index) => {
        Modal.info({
            title: '用户姓名',
            content: record.userName
        })
        this.setState({
            selectedRadioRowKeys: [index],
            selectedItem: record
        })
        // 修改数据操作
        setTimeout(()=>{
            this.edit()
        },10)
    }

    handleDelete = () => {
        let { selectedRows } = this.state;
        let ids = selectedRows.map(item => {
            return item.key
        })
        Modal.confirm({
            title: '删除提示：',
            content: `你确定要删除这些数据吗？${ids.join(',')}`,
            onOk: () => {
                message.success('删除成功！')
                this.request()
            }
        })
    }

    edit = () => {
        let { selectedItem } = this.state 
        console.log(selectedItem)
    }

    render() {

        const { dataSource2, selectedRadioRowKeys, selectedCheckRowKeys, pagination } = this.state

        const rowSelection = {
            type: 'radio',
            selectedRowKeys: selectedRadioRowKeys
        }

        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys: selectedCheckRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedCheckRowKeys: selectedRowKeys,
                    selectedRows
                })
            }
        }

        return (
            <div className='wrapper'>
                <Card title='基础表格' className='card-wrapper'>
                    <Table bordered columns={columns} dataSource={dataSource1} pagination={false} />
                </Card>

                <Card title='动态数据渲染表格-Mock' className='card-wrapper'>
                    <Table bordered columns={columns} dataSource={dataSource2} pagination={false} />
                </Card>

                <Card title='单选-Mock' className='card-wrapper'>
                    <Table bordered rowSelection={rowSelection} columns={columns} dataSource={dataSource2} pagination={false}
                        onRow={(record, index) => {
                            return {
                                onClick: () => this.handleRowClick(record, index) // 点击行\
                            };
                        }}
                    />
                </Card>

                <Card title='多选-Mock' className='card-wrapper'>
                    <Button onClick={this.handleDelete} style={{ marginBottom: '10px' }}>删除</Button>
                    <Table bordered rowSelection={rowCheckSelection} columns={columns} dataSource={dataSource2} pagination={false} />
                </Card>

                <Card title='分页-Mock' className='card-wrapper'>
                    <Table bordered columns={columns} dataSource={dataSource2} pagination={pagination} />
                </Card>
            </div>
        );
    }
}

export default Basic;