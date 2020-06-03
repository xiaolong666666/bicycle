import React, { useState, useEffect } from 'react';
import { Card, Form, Select, DatePicker, Button, Table, Modal, message } from 'antd'
import axios from './../../axios'
import Utils from './../../utils'
import 'defaultStyle/common.less'

// 搜索
const Ordersearch = () => {
    let [order_search] = Form.useForm()
    let { Item } = Form
    let { Option } = Select
    const onFinish = values => {
        console.log(values)
    }
    const resetOrdersearch = () => {
        order_search.resetFields()
    }
    return (
        <Form form={order_search} layout='inline' onFinish={onFinish}>
            <Item label='城市' name='search_city'>
                <Select placeholder='全部'>
                    <Option value=''>全部</Option>
                    <Option value='1'>北京</Option>
                    <Option value='2'>天津</Option>
                    <Option value='3'>上海</Option>
                </Select>
            </Item>
            <Item label='订单时间' name='start_time'>
                <DatePicker placeholder='开始时间' showTime format="YYYY-MM-DD HH:mm:ss"/>
            </Item>
            <Item label='~' colon={false} name='end_time'>
                <DatePicker placeholder='结束时间' showTime format="YYYY-MM-DD HH:mm:ss" />
            </Item>
            <Item label='订单状态' name='search_status'>
                <Select placeholder='全部' style={{ width: 120 }}>
                    <Option value=''>全部</Option>
                    <Option value='1'>进行中</Option>
                    <Option value='2'>结束行程</Option>
                </Select>
            </Item>
            <Item>
                <Button type='primary' htmlType='submit'>查询</Button>
                <Button onClick={resetOrdersearch}>重置</Button>
            </Item>
        </Form>
    )
}

const EndOrder = ({ request, endorder, endorderflag, selectedRows, handleEndOrder_false }) => {
    let { Item } = Form
    let layout = {
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 18
        }
    }
    const onOk = () => {
        handleEndOrder_false()
        axios.ajax({
            url: '/api/finish_order',
            data: {
                params: {
                    orderId: selectedRows.id
                },
                isShowLoading: false
            }
        })
        .then(res => {
            if(res.success){
                message.success(`${selectedRows.order_sn}订单结束成功`)
            }else{
                message.warning(`${selectedRows.order_sn}订单结束错误`)
            }
            request()
        })
    }
    return (
        <Modal title='结束订单' visible={endorderflag} onCancel={handleEndOrder_false} onOk={onOk}>
            <Form style={{width:520,height:272}}>
                <Item label='车辆编号' {...layout}>
                    {endorder.bike_sn}
                </Item>
                <Item label='剩余电量' {...layout}>
                    {endorder.battery + '%'}
                </Item>
                <Item label='行程开始时间' {...layout}>
                    {endorder.start_time}
                </Item>
                <Item label='当前位置' {...layout}>
                    {endorder.location}
                </Item>
            </Form>
        </Modal>
    )
}

const Order = () => {

    const [dataSource, setDataSource] = useState([])
    const [pagination, setPagination] = useState(1)
    const [endorderflag, setEndorderflag] = useState(false)
    const [endorder, setEndorder] = useState({})
    const [selectedRowKeys, setSelectedRowKeys] = useState(null)
    const [selectedRows, setSelectedRows] = useState(null)

    const param = {
        page: 1
    }
    const rowSelection = {
        type: 'radio',
        selectedRowKeys: selectedRowKeys
    }

    const columns = [
        {
            title: '订单编号',
            dataIndex: 'order_sn',
            key: 'order_sn',
        },
        {
            title: '车辆编号',
            dataIndex: 'bike_sn',
            key: 'bike_sn',
        },
        {
            title: '用户名',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: '里程',
            dataIndex: 'distance',
            key: 'distance',
            render: (distance) => {
                return distance/1000 + 'km'
            }
        },
        {
            title: '行驶时长',
            dataIndex: 'total_time',
            key: 'total_time',
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                return status === '1' ? "进行中" : "结束行程"
            }
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time',
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time',
        },
        {
            title: '订单金额',
            dataIndex: 'total_fee',
            key: 'total_fee',
        },
        {
            title: '实付金额',
            dataIndex: 'user_pay',
            key: 'user_pay',
        }
    ];

    const request = () => {
        axios.ajax({
            url: '/api/order',
            data: {
                params: {
                    page: param.page
                }
            }
        })
        .then(res=>{
            setDataSource(res.list)
            setPagination(Utils.pagination(res, current => {
                param.page = current
                request()
            }))
            setSelectedRowKeys(null)
        })
    }

    useEffect(request,[])

    const handleEndOrder = () => {
        if(!selectedRows){
            Modal.info({
                title: '提示',
                content: '请选择一则订单！'
            })
            return ;
        }
        axios.ajax({
            url: '/api/endOrder',
            data: {
                params: {
                    orderId: selectedRows.id
                }
            }
        })
        .then(res=>{
            setEndorder(res.detail)
            setEndorderflag(true)
        })
    }

    const handleEndOrder_false = () => {
        setEndorderflag(false)
    }

    const handleRowClick = (record, index) => {
        setSelectedRows(record)
        setSelectedRowKeys([index])
    }

    const handleOrderDetail = () => {
        if (!selectedRows) {
            Modal.info({
                title: '提示',
                content: '请选择一则订单！'
            })
            return;
        }
        // window.location.href=`/#/common/order/detail/${selectedRows.id}`
        window.open(`/common/order/detail/${selectedRows.id}`,('_blank'))
    }

    return (
        <div className="wrapper">
            <Card className="card-wrapper">
                <Ordersearch />    
            </Card>
            <Card>
                <Button type='primary' style={{ marginRight: '20px' }} onClick={handleOrderDetail}>订单详情</Button>
                <Button type='primary' onClick={handleEndOrder}>结束订单</Button>
            </Card>
            <div className="table-wrapper">
                <Table bordered rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={pagination}
                    onRow={(record, index)=>{
                        return {
                            onClick: () => {handleRowClick(record, index)}
                        }
                    }}
                />
            </div>
            <EndOrder request={request} endorder={endorder} endorderflag={endorderflag} selectedRows={selectedRows} handleEndOrder_false={handleEndOrder_false}/>
        </div>
    );
};

export default Order;