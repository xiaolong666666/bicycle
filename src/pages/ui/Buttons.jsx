import React, { useState } from 'react';
import { Card, Button, Radio } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, DownloadOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'defaultStyle/common.less'
import './ui.less'

const Buttons = () => {
    let [loading, setLoading] = useState(true)
    let [size,setSize] = useState("default")
    return (
        <div className="wrapper">
            <Card title="基础按钮" className="card-wrapper">
                <Button type="primary">LittleDragon</Button>
                <Button>LittleDragon</Button>
                <Button type="dashed">LittleDragon</Button>
                <Button type="danger">LittleDragon</Button>
                <Button disabled>LittleDragon</Button>
            </Card>
            <Card title="图形按钮" className="card-wrapper">
                <Button icon={<PlusOutlined />}>创建</Button>
                <Button icon={<EditOutlined />}>编辑</Button>
                <Button icon={<DeleteOutlined />}>删除</Button>
                <Button shape="circle" icon={<SearchOutlined />}></Button>
                <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
            </Card>
            <Card title="Loading按钮" className="card-wrapper">
                <Button type="primary" loading={loading}>确定</Button>
                <Button type="primary" shape="circle" loading={loading}></Button>
                <Button loading={loading} >LittleDragon</Button>
                <Button shape="circle" loading={loading}></Button>
                <Button type="primary" onClick={() => loading?setLoading(false):setLoading(true)}>{loading?"关闭":"开启"}</Button>
            </Card>
            <Card title="按钮组" className="group-wrapper">
                <Button.Group>
                    <Button type="primary" icon={<LeftOutlined />}>返回</Button>
                    <Button type="primary" icon={<RightOutlined />}>前进</Button>
                </Button.Group>
            </Card>
            <Card title="按钮尺寸" className="card-wrapper">
                <Radio.Group onChange={(e)=>setSize(e.target.value)}>
                    <Radio value="small" checked={size === "small" ? true : false}>小</Radio>
                    <Radio value="default" checked={size === "default" ? true : false}>中</Radio>
                    <Radio value="large" checked={size === "large" ? true : false}>大</Radio>
                </Radio.Group>
                <Button type="primary" size={size}>LittleDragon</Button>
                <Button size={size}>LittleDragon</Button>
                <Button type="dashed" size={size}>LittleDragon</Button>
                <Button type="danger" size={size}>LittleDragon</Button>
            </Card>
        </div>
    );
};

export default Buttons;