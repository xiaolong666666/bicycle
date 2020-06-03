import React, { useState } from 'react';
import { Card, Form, Input, Radio, InputNumber, Select, Badge, Switch, DatePicker, TimePicker, Upload, Checkbox, Button, message } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
import 'defaultStyle/common.less'
import './form.less'

const { Item } = Form
const { Password } = Input
const { Group } = Radio
const { Option } = Select
const { TextArea } = Input

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 12 }
}

const offsetLayout = {
    wrapperCol: {
        span: 12,
        offset: 4
    }
}

const dateFormat = 'YYYY-MM-DD HH:mm:ss'
const timeFormat = 'HH:mm:ss'


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

const onFinish = reg => {
    console.log(reg)
}

const FormReg = () => {
 
    let [loading, setLoading] = useState(false)
    let [imageUrl, setImageUrl] = useState(null)

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl)
                setLoading(false)
            })
        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <div className="wrapper">
            <Card title='注册表单'>
                <Form
                    autoComplete = "off"
                    initialValues = {{
                        sex: 0,
                        age: 18,
                        status: '1',
                        hoddy: ['1','3','5','7'],
                        married: true,
                        birthday: moment('2018-06-06 14:30:00',dateFormat),
                        address: '北京市海淀区奥林匹克公园',
                        gettime: moment('06:00:00',timeFormat),
                        protocol: true
                    }}
                    onFinish = { onFinish }
                >

                    {/* 用户名 */}
                    <Item
                        {...layout}
                        label='用户名'
                        name='userName'
                        rules={[{ required: true, message: '用户名不能为空' }]}
                    >
                        <Input placeholder='请输入用户名'/>
                    </Item>

                    {/* 密码 */}
                    <Item
                        {...layout}
                        label='密码'
                        name='userPwd'
                        rules={[{ required: true, message: '密码不能为空' }]}
                    >
                        <Password placeholder='请输入密码' />
                    </Item>

                    {/* 性别 */}
                    <Item
                        {...layout}
                        label='性别'
                        name='sex'
                    >
                        <Group>
                            <Radio value={0}>男</Radio>
                            <Radio value={1}>女</Radio>
                        </Group>
                    </Item>
                    
                    {/* 年龄 */}
                    <Item
                        {...layout}
                        label='年龄'
                        name='age'
                    >
                        <InputNumber min={0} max={60} />
                    </Item>

                    {/* 当前状态 */}
                    <Item
                        {...layout}
                        label='当前状态'
                        name='status'
                    >
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

                    {/* 爱好 */}
                    <Item
                        {...layout}
                        label='爱好'
                        name='hoddy'
                    >
                        <Select mode='multiple' placeholder="Please select">
                            <Option value='1'>爬山</Option>
                            <Option value='2'>旅游</Option>
                            <Option value='3'>唱歌</Option>
                            <Option value='4'>台球</Option>
                            <Option value='5'>网球</Option>
                            <Option value='6'>篮球</Option>
                            <Option value='7'>足球</Option>
                            <Option value='8'>乒乓球</Option>
                            <Option value='9'>羽毛球</Option>
                            <Option value='10'>游戏</Option>
                        </Select>
                    </Item>

                    {/* 是否已婚 */}
                    <Item
                        {...layout}
                        label='是否已婚'
                        name='married'
                        valuePropName="checked"
                    >
                        <Switch defaultChecked checkedChildren="已婚" unCheckedChildren="未婚"/>
                    </Item>

                    {/* 生日 */}
                    <Item
                        {...layout}
                        label='生日'
                        name='birthday'
                    >
                        <DatePicker showTime />
                    </Item>

                    {/* 联系地址 */}
                    <Item
                        {...layout}
                        label='联系地址'
                        name='address'
                    >
                        <TextArea autoSize={{ minRows: 4, maxRows: 6 }}/>
                    </Item>

                    {/* 早起时间 */}
                    <Item
                        {...layout}
                        label='早起时间'
                        name='gettime'
                    >
                        <TimePicker />
                    </Item>

                    {/* 头像 */}
                    <Item
                        {...layout}
                        label='头像'
                        mame='face'
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
                    </Item>

                    {/* 协议 */}
                    <Item
                        {...offsetLayout}
                        name='protocol'
                        valuePropName="checked"
                    >
                        <Checkbox defaultChecked>我已阅读过<a href="/#">小龙协议</a></Checkbox>
                    </Item>

                    {/* 登录 */}
                    <Item
                        {...offsetLayout}
                    >
                        <Button type='primary' htmlType='submit'>登录</Button>
                    </Item>
                </Form>
            </Card>
        </div>
    );
};

export default FormReg;