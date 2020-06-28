import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Modal, message } from 'antd'
import axios from './../../axios'
import Utils from './../../utils'
import FilterForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
import 'defaultStyle/common.less'

const formList = [
    {
        type: 'SELECT',
        label: '城市',
        field: 'city',
        placeholder: '全部',
        initialValue: '1',
        width: 80,
        list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
    },
    {
        type: '订单时间',
    },
    {
        type: 'SELECT',
        label: '订单状态',
        field: 'status',
        placeholder: '全部',
        initialValue: '1',
        width: 120,
        list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
    }
]

// 结束订单
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
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [selectedRows, setSelectedRows] = useState(null)
    const [selectedIds, setSelectedIds] = useState([])

    const param = {
        page: 1
    }
    const rowSelection = {
        type: 'checkbox',
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
        axios.requestList('/api/order', param, setDataSource, setPagination, request, setSelectedRowKeys, true)
    }

    useEffect(request,[])

    const searchResult = (value) => {
        console.log(value)
    }

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

    const handleOrderDetail = () => {
        if (!selectedRows) {
            Modal.info({
                title: '提示',
                content: '请选择一则订单！'
            })
            return;
        }
        window.open(`/common/order/detail/${selectedRows.id}`,('_blank'))
    }
    
    return (
        <div className="wrapper">
            <Card className="card-wrapper">
                <FilterForm formList={formList} searchResult={searchResult}/>
            </Card>
            <Card>
                <Button type='primary' style={{ marginRight: '20px' }} onClick={handleOrderDetail}>订单详情</Button>
                <Button type='primary' onClick={handleEndOrder}>结束订单</Button>
            </Card>
            <div className="table-wrapper">
                <ETable
                    columns={columns}
                    dataSource={dataSource}
                    pagination={pagination}
                    rowSelection={rowSelection}
                    updateRowClick={Utils.updateRowClick} 
                    selectedRows={selectedRows}
                    setSelectedRows={setSelectedRows}
                    selectedRowKeys={selectedRowKeys}
                    setSelectedRowKeys={setSelectedRowKeys}
                    selectedIds={selectedIds}
                    setSelectedIds={setSelectedIds}
                />
            </div>
            <EndOrder request={request} endorder={endorder} endorderflag={endorderflag} selectedRows={selectedRows} handleEndOrder_false={handleEndOrder_false}/>
        </div>
    );
};

export default Order;