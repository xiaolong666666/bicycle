import React from 'react';
import { Card, Form, Input, Button, Checkbox, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'defaultStyle/common.less'
import './form.less'

const FormLogin = () => {
    const onFinish = ({ userName, userPwd}) => {
        message.success(`恭喜 ${userName} 完成表单登录`)
        console.log(`密码为${userPwd}`)
    };
    return (
        <div className="wrapper">
            <Card title="行内登录表单" className="card-wrapper">
                <Form layout='inline'>
                    <Form.Item>
                        <Input placeholder='请输入用户名' />
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder='请输入密码' />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">登录</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title="水平登录表单" className="card-wrapper">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="userName"
                        rules={
                            [
                                { required: true, message: '用户名不为空' },
                                { min: 5, max: 10, message: '用户名长度不在范围内' },
                                { pattern: new RegExp('^\\w+$','g'), message: '用户名为字母或数字' }
                            ]
                        }
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item
                        name="userPwd"
                        rules={[{ required: true, message: '密码不为空' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="请输入密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>记住我</Checkbox>
                        </Form.Item>
                        <a className="login-form-forgot" href='/#'>忘记密码？</a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default FormLogin;