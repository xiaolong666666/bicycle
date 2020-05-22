import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd'
import './ui.less'

const Modals = () => {
    let [show1, setShow1] = useState(false)
    let [show2, setShow2] = useState(false)
    let [show3, setShow3] = useState(false)
    let [show4, setShow4] = useState(false)

    let handleMethod = type => {
        Modal[type]({
            title: '确认？',
            content: '你确定你学会了React了吗？',
            onOk: () => { console.log(`${type}Ok`) },
            onCancel: () => { console.log(`${type}Cancel`) },
        })
    }

    return (
        <div className="wrapper">
            <Card title="基础模态框" className="card-wrapper">
                <Button type="primary" onClick={()=>setShow1(true)}>Open</Button>
                <Button type="primary" onClick={()=>setShow2(true)}>自定义页脚</Button>
                <Button type="primary" onClick={()=>setShow3(true)}>顶部20px弹框</Button>
                <Button type="primary" onClick={()=>setShow4(true)}>水平垂直居中</Button>
            </Card>
            <Card title="基础模态框" className="card-wrapper">
                <Button type="primary" onClick={() => handleMethod('confirm')}>Confirm</Button>
                <Button type="primary" onClick={() => handleMethod('info')}>Info</Button>
                <Button type="primary" onClick={() => handleMethod('success')}>Success</Button>
                <Button type="primary" onClick={() => handleMethod('warning')}>Warning</Button>
            </Card>
            <Modal title="React" visible={show1} onCancel={() => setShow1(false)}>
                <p>欢迎来到 LittleDragon 共享单车项目</p>
            </Modal>
            <Modal title="React" visible={show2} onCancel={() => setShow2(false)} okText="好的" cancelText="算了">
                <p>欢迎来到 LittleDragon 共享单车项目</p>
            </Modal>
            <Modal title="React" visible={show3} onCancel={() => setShow3(false)} style={{top:20}}>
                <p>欢迎来到 LittleDragon 共享单车项目</p>
            </Modal>
            <Modal title="React" visible={show4} onCancel={() => setShow4(false)} centered={true}>
                <p>欢迎来到 LittleDragon 共享单车项目</p>
            </Modal>
        </div>
    );
};

export default Modals;