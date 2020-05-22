import React from 'react';
import { Card, Spin, Alert } from 'antd'
import { SlackOutlined, LoadingOutlined } from '@ant-design/icons'
import './ui.less'

const antIcon = <SlackOutlined style={{ fontSize: 24 }} spin />
const antLoading = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Loadings = () => {
    return (
        <div className="wrapper">
            <Card title="Spin用法">
                <Spin size="small"/>
                <Spin style={{margin: '0 10px'}}/>
                <Spin size="large"/>
                <Spin indicator={antIcon} style={{marginLeft: 10}}/>
            </Card>
            <Card title="内容遮罩">
                <Alert message="React" description="欢迎来到 LittleDragon 共享单车项目" type="success" showIcon className="mask-wrapper"/>
                <Spin>
                    <Alert message="React" description="欢迎来到 LittleDragon 共享单车项目" type="info" showIcon className="mask-wrapper"/>
                </Spin>
                <Spin tip="加载中...">
                    <Alert message="React" description="欢迎来到 LittleDragon 共享单车项目" type="warning" showIcon className="mask-wrapper" />
                </Spin>
                <Spin indicator={antLoading}>
                    <Alert message="React" description="欢迎来到 LittleDragon 共享单车项目" type="error" showIcon className="mask-wrapper" />
                </Spin>
            </Card>
        </div>
    );
};

export default Loadings;