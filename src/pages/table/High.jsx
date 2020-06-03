import React, { Component } from 'react';
import { Card, Table, Badge, Button, Modal, message } from 'antd'
import axios from './../../axios'
import 'defaultStyle/common.less'

class High extends Component {

    state = {
        dataSource: [],
        sortOrder: null
    }

    params = {
        page: 1
    }

    columns = [
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

    columns2 = [
        {
            title: 'id',
            dataIndex: 'key',
            key: 'key',
            width: 120,
            fixed: 'left'
        },
        {
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            width: 120,
            fixed: 'left'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            width: 120,
            render(sex) {
                return sex === 1 ? '男' : '女'
            }
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            width: 120
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 120,
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
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            key: 'hoddy',
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            key: 'hoddy',
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            key: 'hoddy',
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            key: 'hoddy',
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            key: 'hoddy',
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            key: 'hoddy',
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            key: 'hoddy',
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            key: 'hoddy',
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            width: 120,
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
            title: '爱好',
            dataIndex: 'hoddy',
            key: 'hoddy',
            width: 120,
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
            width: 120,
            render(married) {
                return married === 1 ? '已婚' : '未婚'
            }
        },
        {
            title: '生日',
            dataIndex: 'birthday',
            key: 'birthday',
            width: 120
        },
        {
            title: '联系地址',
            dataIndex: 'address',
            key: 'address',
            width: 120,
            fixed: 'right'
        },
        {
            title: '早起时间',
            dataIndex: 'time',
            key: 'time',
            width: 120,
            fixed: 'right'
        },
    ]

    columns3 = [
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
            key: 'age',
            sorter: (a, b) => (a.age - b.age),
            sortDirections: this.state.sortOrder
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

    columns4 = [
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
                    '1': <Badge status="success" text="我在线上"/>,
                    '2': <Badge status="processing" text="Q我吧"/>,
                    '3': <Badge status="default" text="离开"/>,
                    '4': <Badge status="error" text="忙碌"/>,
                    '5': <Badge status="pink" text="请勿打扰"/>,
                    '6': <Badge status="warning" text="隐身"/>,
                    '7': <Badge status="default" text="离线"/>
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
            title: '操作',
            render: (text,item) => {
                return <Button onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
            }
        },
    ]

    componentDidMount() {
        this.request()
    }

    request = () => {
        axios.ajax({
            url: '/api/high',
            data: {
                params: {
                    page: this.params.page
                },
                isShowLoading: true
            }
        })
        .then(res => {
            this.setState({
                dataSource: res.list
            })
        })
    }

    handleSort = (pagination, filters, sorter,) => {
        this.setState({
            sortOrder: sorter.order
        })
    }

    handleDelete = (item) => {
        Modal.confirm({
            title: '确定',
            content: '你确定要删除此条数据吗？',
            onOk: () => {
                message.success('删除成功！')
                this.request()
            }
        })
    }

    render() {

        const { columns, columns2, columns3, columns4 } = this
        const { dataSource } = this.state

        return (
            <div className='wrapper'>
                <Card title='头部固定-Mock' className='card-wrapper'>
                    <Table bordered columns={columns} dataSource={dataSource} pagination={false} scroll={{y:218}} />
                </Card>

                <Card title='左侧-Mock-右侧' className='card-wrapper'>
                    <Table bordered columns={columns2} dataSource={dataSource} pagination={false} scroll={{ x: 2410, y: 218 }}
                    />
                </Card>

                <Card title='排序-Mock' className='card-wrapper'>
                    <Table bordered columns={columns3} dataSource={dataSource} pagination={false} scroll={{ y: 218 }}
                        onChange = {this.handleSort}
                    />
                </Card>

                <Card title='操作-Mock' className='card-wrapper'>
                    <Table bordered columns={columns4} dataSource={dataSource} pagination={false} />
                </Card>
            </div>
        );
    }
}

export default High;