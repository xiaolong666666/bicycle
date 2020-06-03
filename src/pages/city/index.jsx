import React, { useState, useEffect } from 'react';
import { Card, Form, Select, Badge, Button, Table, Modal } from 'antd'
import axios from './../../axios'
import Utils from './../../utils'
import 'defaultStyle/common.less'

// 选择表单
const FilterForm = () => {
    const [city_select] = Form.useForm();
    const { Item } = Form
    const { Option } = Select
    const onFinish = values => {
        console.log(values)
    }
    const resetForm = () => {
        city_select
        .resetFields()
    }
    return (
        <Form form={city_select} layout='inline' onFinish={onFinish}>
            <Item label='城市' name='select_city'>
                <Select placeholder='全部'>
                    <Option value='0'><Badge status='default' />全部</Option>
                    <Option value='1'><Badge status='success' />北京</Option>
                    <Option value='2'><Badge status='warning' />天津</Option>
                    <Option value='3'><Badge status='error' />深圳</Option>
                </Select>
            </Item>
            <Item label='用车模式' name='select_mode'>
                <Select placeholder='全部' style={{ width: '120px' }}>
                    <Option value='0'><Badge status='default' />全部</Option>
                    <Option value='1'><Badge status='success' />指定停车点模式</Option>
                    <Option value='2'><Badge status='error' />禁停区模式</Option>
                </Select>
            </Item>
            <Item label='运营模式' name='select_open_mode'>
                <Select placeholder='全部'>
                    <Option value='0'><Badge status='default' />全部</Option>
                    <Option value='1'><Badge status='success' />自营</Option>
                    <Option value='2'><Badge status='warning' />加盟</Option>
                </Select>
            </Item>
            <Item label='加盟商授权状态' name='status'>
                <Select placeholder='全部' style={{ width: '100px' }}>
                    <Option value='0'><Badge status='default' />全部</Option>
                    <Option value='1'><Badge status='success' />已授权</Option>
                    <Option value='2'><Badge status='warning' />未授权</Option>
                </Select>
            </Item>
            <Item>
                <Button type='primary' style={{ margin: '0 20px' }} htmlType='submit'>查询</Button>
                <Button htmlType='reset' onClick={resetForm}>重置</Button>
            </Item>
        </Form>
    )
}

// 城市开通表单
const OpenForm = ({ visible, submitMap, onCancel }) => {
    const [ open_city ] = Form.useForm();
    const { Item } = Form
    const { Option } = Select
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
    }
    let initValues = {
        city: '2',
        open_mode: '1',
        mode: '1'
    }
    open_city.setFieldsValue(initValues)

    const open_city_ok = () => {
        open_city
        .validateFields()
        .then(values => {
            submitMap(values);
        })
        .catch(info => {
            console.log('校验失败:', info);
        });
    }

    return (
        <Modal title='开通城市' visible={visible} onOk={open_city_ok} onCancel={onCancel} forceRender>
            <Form form={open_city} layout="horizontal" >
                <Item label='选择城市' {...layout} name='city'>
                    <Select>
                        <Option value=''>全部</Option>
                        <Option value='1'>北京</Option>
                        <Option value='2'>天津</Option>
                    </Select>
                </Item>
                <Item label='运营模式' {...layout} name='open_mode'>
                    <Select>
                        <Option value='1'>自营</Option>
                        <Option value='2'>加盟</Option>
                    </Select>
                </Item>
                <Item label='用车模式' {...layout} name='mode'>
                    <Select>
                        <Option value='1'>指定点停车</Option>
                        <Option value='2'>禁停区</Option>
                    </Select>
                </Item>
            </Form>
        </Modal>
    )
}

const City = () => {
    let [dataSource, setDataSource] = useState([])
    let [pagination, setPagination] = useState(1)
    let [visible, setVisible] = useState(false)

    const columns = [
        {
            title: '城市ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '城市名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '用车模式',
            dataIndex: 'mode',
            key: 'mode',
        },
        {
            title: '运营模式',
            dataIndex: 'open_mode',
            key: 'open_mode',
        },
        {
            title: '授权加盟商',
            dataIndex: 'franchisee_name',
            key: 'franchisee_name',
        },
        {
            title: '城市管理员',
            dataIndex: 'city_admin',
            key: 'city_admin',
            render: (arr) => {
                return arr.map((item, index) => {
                    return item.user_name
                }).join('、')
            }
        },
        {
            title: '城市开通时间',
            dataIndex: 'open_time',
            key: 'open_time',
        },
        {
            title: '操作时间',
            dataIndex: 'update_time',
            key: 'update_time',
            render: (data) => {
                let time = new Date(data)
                return `${time.getFullYear()}年${time.getMonth() + 1}月${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
            }
        },
        {
            title: '操作人',
            dataIndex: 'sys_user_name',
            key: 'sys_user_name',
        }
    ]
    const param = {
        page: 1
    }

    const request = () => {
        axios.ajax({
            url: '/api/city',
            data: {
                params: {
                    page: param.page
                }
            }
        })
        .then(res => {
            setDataSource(res.city_list.map(item => {
                item.key = item.id
                return item
            }))
            setPagination(Utils.pagination(res, (current) => {
                param.page = current
                request()
            }))
        })
    }

    useEffect(request,[])

    // 处理开通城市
    const handleOpen_city = () => {
        setVisible(true)
    }

    const onCreate = values => {
        console.log('开通城市表单数据: ', values);
        setVisible(false);
    };

    return (
        <div className="wrapper">
            <Card className="card-wrapper">
                <FilterForm />
            </Card>
            <Card>
                <Button type='primary' onClick={handleOpen_city}>开通城市</Button>
            </Card>
            <div className="table-wrapper">
                <Table bordered columns={columns} dataSource={dataSource} pagination={pagination} />
            </div>
            <OpenForm visible={visible}
                submitMap={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default City;