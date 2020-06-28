import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Radio, Select, DatePicker, Input, Badge } from 'antd'
import { PlusOutlined, EditOutlined, UserSwitchOutlined, MinusOutlined } from '@ant-design/icons'
import axios from './../../axios'
import BaseForm from './../../components/BaseForm'
import ETable from './../../components/ETable'
import Utils from './../../utils'
import moment from 'moment'
import 'defaultStyle/common.less'

const { Item } = Form
const { Group } = Radio
const { Option } = Select
const { TextArea } = Input
const formList = [
    {
        type: "INPUT",
        label: "用户名",
        field: "user_name",
        placeholder: "请输入用户名",
        width: 100
    },
    {
        type: "INPUT",
        label: "密码",
        field: "user_pwd",
        placeholder: "请输入用户名",
        width: 100
    },
    {
        type: "DATE",
        label: "日期",
        field: "date",
        placeholder: "请输入日期",
        width: 100
    }
]

const params = {
    page: 1
}

const columns = [
    {
        title: 'id',
        dataIndex: 'key',
        key: 'key'
    },
    {
        title: '用户名',
        dataIndex: 'userName',
        key: 'key'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'key',
        render(sex) {
            return sex === 1 ? '男' : '女'
        }
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'key',
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
        key: 'key',
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
        key: 'key',
        render(married) {
            return married === 1 ? '已婚' : '未婚'
        }
    },
    {
        title: '生日',
        dataIndex: 'birthday',
        key: 'key'
    },
    {
        title: '联系地址',
        dataIndex: 'address',
        key: 'key'
    },
    {
        title: '早起时间',
        dataIndex: 'time',
        key: 'key'
    }
]

const getStatus = (status) => {
    switch(status){
        case '1': return "我在线上";
        case '2': return "Q我吧";
        case '3': return "离开";
        case '4': return "忙碌";
        case '5': return "请勿打扰";
        case '6': return "隐身";
        case '7': return "离线";
        default: return "我在线上"
    }
}

const User = () => {
    const [dataSource, setDataSource] = useState([])
    const [selectedRows, setSelectedRows] = useState(null)
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [title, setTitle] = useState(null)
    const [visible, setVisible] = useState(false)
    const [userForm] = Form.useForm()
    let footer = {}
    if(title==='员工详情'){
        footer = {
            footer: null
        }
    }
    useEffect(()=>{
        request()
    },[])
    const CreateUser = () => {
        const item = selectedRows || {}
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
        }
        const detailFlag = (title === '员工详情')
        return (
            detailFlag
            ? <Form
                form={userForm}
            >
                <Item label="姓名" {...layout} initialValue={item.userName}>
                    {item.userName}
                </Item>
                <Item label="性别" {...layout} initialValue={item.sex}>
                    {item.sex === "1" ? "男" : "女"}
                </Item>
                <Item label="状态" {...layout} initialValue={item.status}>
                    {getStatus(item.status)}
                </Item>
                <Item label="生日" {...layout} initialValue={moment(item.birthday)}>
                    {item.birthday}
                </Item>
                <Item label="联系地址" {...layout} initialValue={item.address}>
                    {item.address}
                </Item>
            </Form>
            : <Form
                form={userForm}
            >
                <Item label="姓名" name='userName' {...layout} initialValue={item.userName}>
                    <Input placeholder="请输入姓名" />
                </Item>
                <Item label="性别" name="sex" {...layout} initialValue={item.sex}>
                    <Group>
                        <Radio value={1}>男</Radio>
                        <Radio value={2}>女</Radio>
                    </Group>
                </Item>
                <Item label="状态" name="status" {...layout} initialValue={item.status}>
                    <Select>
                        <Option value='1'><Badge status="success" />我在线上</Option>
                        <Option value='2'><Badge status="processing" />Q我吧</Option>
                        <Option value='3'><Badge status="default" />离开</Option>
                        <Option value='4'><Badge status="error" />忙碌</Option>
                        <Option value='5'><Badge status="pink" />请勿打扰</Option>
                        <Option value='6'><Badge status="warning" />隐身</Option>
                        <Option value='7'><Badge status="default" />离线</Option>
                    </Select>
                </Item>
                <Item label="生日" name="birthday" {...layout} initialValue={moment(item.birthday)}>
                    <DatePicker showTime format="YYYY-MM-DD HH-mm-ss" />
                </Item>
                <Item label="联系地址" name="address" {...layout} initialValue={item.address}>
                    <TextArea />
                </Item>
            </Form>
        )
    }
    const rowSelection = {
        type: 'radio',
        selectedRowKeys: selectedRowKeys
    }
    const searchResult = value => {
        console.log(value)
    }
    const request = () => {
        axios.ajax({
            url: '/api/basic',
            data: {
                params: params
            }
        })
        .then(res => {
            setDataSource(res.list)
        })
    }
    const handleOperate = (type) => {
        console.log(selectedRows)
        if (type === "create") {
            if (selectedRows) {
                Modal.info({
                    title: '提示',
                    content: '取消选择员工'
                })
                return;
            }
            setTitle('创建员工')
            setVisible(true)
        }
        if (type === 'edit') {
            if (!selectedRows) {
                Modal.info({
                    title: '提示',
                    content: '请选择一名员工'
                })
                return;
            }
            userForm.resetFields()
            setTitle('编辑员工')
            setVisible(true)
        }if (type === 'detail') {
            if (!selectedRows) {
                Modal.info({
                    title: '提示',
                    content: '请选择一名员工'
                })
                return;
            }
            setTitle('员工详情')
            setVisible(true)
        }if (type === 'delete') {
            if (!selectedRows) {
                Modal.info({
                    title: '提示',
                    content: '请选择一名员工'
                })
                return;
            }
            Modal.confirm({
                title: '删除',
                content: '确认删除此员工吗？',
                onOk(){
                    console.log(selectedRows.key)
                    setVisible(false)
                }
            })
        }
    }
    const handleModalOk = () => {
        if(title==='创建员工'){
            userForm.validateFields()
            .then(res=>{
                console.log(res)
                setVisible(false)
            })
        }
        if(title==='编辑员工'){
            userForm.validateFields()
            .then(res=>{
                console.log(res)
                setVisible(false)
            })
        }
        request()
    }
    const handleModalCancel = () => {
        setVisible(false)
    }
    return (
        <div className="wrapper">
            <Card className="card-wrapper">
                <BaseForm formList={formList} searchResult={searchResult}/>
            </Card>
            <Card className="button-wrapper">
                <Button type="primary" icon={<PlusOutlined />} onClick={()=>handleOperate('create')}>创建员工</Button>
                <Button type="primary" icon={<EditOutlined />} onClick={()=>handleOperate('edit')}>编辑员工</Button>
                <Button type="primary" icon={<UserSwitchOutlined />} onClick={()=>handleOperate('detail')}>员工详情</Button>
                <Button type="primary" icon={<MinusOutlined />} onClick={()=>handleOperate('delete')}>删除员工</Button>
            </Card>
            <div className="table-wrapper">
                <ETable columns={columns} dataSource={dataSource} rowSelection={rowSelection} setSelectedRows={setSelectedRows} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} updateRowClick={Utils.updateRowClick} pagination={false}/>
            </div>
            {
                visible
                    ? <Modal
                        width={600}
                        title={title}
                        visible={visible}
                        onOk={handleModalOk}
                        onCancel={handleModalCancel}
                        { ...footer }
                    >
                        <CreateUser handleModalOk={handleModalOk} /> 
                    </Modal>
                    : null
            }
        </div>
    );
};

export default User;