import React, { useState, useEffect } from 'react'
import { Card, Button, Modal, Form, Input, Select, Tree, Transfer } from 'antd'
import ETable from './../../components/ETable'
import axios from './../../axios'
import Utils from './../../utils'
import menuConfig from './../../config/menuConfig'
import 'defaultStyle/common.less'

const treeData = [
    {
        title: '平台权限',
        key: 'right',
        children: menuConfig
    }
]

const columns = [
    {
        title: '角色ID',
        dataIndex: 'id',
        key: 'id'
    }, {
        title: '角色名称',
        dataIndex: 'role_name',
        key: 'role_name'
    }, {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render: Utils.formatTime
    }, {
        title: '使用状态',
        dataIndex: 'status',
        key: 'status',
        render(status) {
            if (status === 1) {
                return "启用"
            } else {
                return "停用"
            }
        }
    }, {
        title: '授权时间',
        dataIndex: 'authorize_time',
        key: 'authorize_time',
        render: Utils.formatTime
    }, {
        title: '授权人',
        dataIndex: 'authorize_user_name',
        key: 'authorize_user_name'
    }
];

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
}
const { Item } = Form
const { Option } = Select

const PermissionUser = () => {
    const [dataSource, setDataSource] = useState([])
    const [pagination, setPagination] = useState(1)
    const [selectedRows, setSelectedRows] = useState(null)
    const [selectedRowKeys, setSelectedRowKeys] = useState(null)
    const [showRoleForm, setShowRoleForm] = useState(false)
    const [showPerForm, setShowPerForm] = useState(false)
    const [showAuthForm, setShowAuthForm] = useState(false)
    const [roleForm] = Form.useForm()
    const [perForm] = Form.useForm()
    const [menus, setMenus] = useState(null)
    const [authForm] = Form.useForm()
    const [mockData, setMockData] = useState([])
    const [targetKeys, setTargetKeys] = useState([])

    const param = {
        page: 1
    }

    const request = () => {
        axios.requestList('/api/role_list', param, setDataSource, setPagination, request, setSelectedRowKeys, true)
    }

    useEffect(request,[])

    // 角色创建
    const RoleForm = () => {
        return (
            <Form form={roleForm}>
                <Item label="用户名" name='role_name' {...layout}>
                    <Input type="text" placeholder='请输入用户名' />
                </Item>
                <Item label="状态" name='status' {...layout} initialValue={1}>
                    <Select>
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                </Item>
            </Form>
        )
    }

    // 权限分配
    const PerForm = ({ userInfo, selectChecked, menus}) => {
        const user_info = userInfo
        if (user_info){
            perForm.setFieldsValue({ per_role_name: user_info.role_name, per_status: user_info.status })
        }
        return (
            showPerForm && user_info  
            ? <Form form={perForm}>
                <Item label="用户名" name='per_role_name' {...layout}>
                    <Input type="text" disabled />
                </Item>
                <Item label="状态" name='per_status' {...layout}>
                    <Select>
                        <Option value={1}>开启</Option>
                        <Option value={0}>关闭</Option>
                    </Select>
                </Item>
                <Tree
                    checkable 
                    defaultExpandAll
                    treeData={treeData}
                    checkedKeys={menus}
                    onCheck={selectChecked}
                />
            </Form>
            : null
        )
    }

    // 用户授权
    const AuthForm = ({ userInfo, mockData, targetKeys, pathUserInfo }) => {
        const user_info = userInfo
        const filterOption = (inputValue, option) => option.title.indexOf(inputValue) > -1;
        return (
            showAuthForm && user_info
            ? <Form form={authForm}>
                <Item label="用户名" name='per_role_name' {...layout}>
                    <Input type="text" disabled placeholder={user_info.role_name}/>
                </Item>
                <Item label="选择用户" {...layout}>
                    <Transfer
                        listStyle={{width: "180px", height: "400px"}}
                        dataSource={mockData}
                        targetKeys={targetKeys}
                        showSearch
                        titles={['待选用户', '已选用户']}
                        searchPlaceholder='输入用户名'
                        filterOption={filterOption}
                        onChange={pathUserInfo}
                        render={item => item.title}
                    />
                </Item>
            </Form>
            : null
        )
    }

    // RoleForm
    const onRoleCancel = () => {
        setShowRoleForm(false)
        roleForm.resetFields()
    }

    const onRoleSubmit = () => {
        roleForm
        .validateFields()
        .then(values => {
            console.log(values)
            setShowRoleForm(false)
            request()
        })
    }

    // PerForm
    const handlePerOpen = () => {
        if (!selectedRows) {
            Modal.confirm({
                title: '提示',
                content: "请选择一名角色"
            })
        } else {
            setShowPerForm(true)
            setMenus(selectedRows.menus)
        }
    }

    const onPerCancel = () => {
        setShowPerForm(false)
    }

    const selectChecked = (menus) => {
        setMenus(menus)
    }

    const onPerSubmit = () => {
        perForm
        .validateFields()
        .then(res=>{
            console.log(res)
            console.log(menus)
            setShowPerForm(false)
            request()
        })
    }

    // AuthForm
    const handleAuthOpen = () => {
        if (!selectedRows) {
            Modal.confirm({
                title: '提示',
                content: "请选择一名角色"
            })
        } else {
            getRoleUserList(selectedRows.id)
            setShowAuthForm(true)
        }
    }

    const getRoleUserList = (id) => {
        axios.ajax({
            url: '/api/user_list',
            data: {
                params: {
                    id
                }
            }
        })
        .then(res=>{
            getAuthUserList(res.list)
        })
    }

    const getAuthUserList = (dataSource) => {
        const mockData = []
        const targetKeys = []
        dataSource.map(item=>{
            const data = {
                key: item.user_id,
                title: item.user_name,
                status: item.status
            }
            mockData.push(data)
            if(item.status===1){
                targetKeys.push(data.key)
            }
            return item
        })
        setMockData(mockData)
        setTargetKeys(targetKeys)
    }

    const onAuthCancel = () => {
        setShowAuthForm(false)
    }

    const onAuthSubmit = () => {
        const data = {}
        data.role_id = selectedRows.id
        data.user_id = targetKeys
        console.log(data)
        setShowAuthForm(false)
    }

    return (
        <div className="wrapper">
            <Card className="button-wrapper">
                <Button type="primary" onClick={() => { setShowRoleForm(true) }}>创建角色</Button>
                <Button type="primary" onClick={handlePerOpen}>设置权限</Button>
                <Button type="primary" onClick={handleAuthOpen}>用户授权</Button>
            </Card>
            <div className="table-wrapper">
                <ETable columns={columns} dataSource={dataSource} rowSelection selectedRows={selectedRows} setSelectedRows={setSelectedRows} selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} updateRowClick={Utils.updateRowClick} pagination={pagination}/>
            </div>
            <Modal title='创建用户' visible={showRoleForm} onCancel={onRoleCancel} onOk={onRoleSubmit} forceRender>
                <RoleForm />
            </Modal>
            <Modal title='权限设置' visible={showPerForm} onCancel={onPerCancel} onOk={onPerSubmit}>
                <PerForm userInfo={selectedRows} selectChecked={selectChecked} menus={menus}/>
            </Modal>
            <Modal title='用户授权' visible={showAuthForm} onCancel={onAuthCancel} onOk={onAuthSubmit} width={666}>
                <AuthForm userInfo={selectedRows} mockData={mockData} targetKeys={targetKeys} pathUserInfo={(targetKeys)=>{setTargetKeys(targetKeys)}}/>
            </Modal>
        </div>
    );
};

export default PermissionUser;