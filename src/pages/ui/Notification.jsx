import React from 'react';
import { Card, Button, notification } from 'antd'
import './ui.less'

const openNotificationWithIcon = (type,direction) => {
    if (direction){
        notification.config({
            placement: direction
        })
    }
    notification[type]({
        message: '发工资咯',
        description:
            '上月考勤22天，迟到12天，实发工资16K，请笑纳！',
    });
};

const Notification = () => {
    return (
        <div className="wrapper">
            <Card title="通知提醒框" className="card-wrapper">
                <Button type="primary" onClick={() => openNotificationWithIcon('success')}>Success</Button>
                <Button type="primary" onClick={() => openNotificationWithIcon('info')}>Info</Button>
                <Button type="primary" onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
                <Button type="primary" onClick={() => openNotificationWithIcon('error')}>Error</Button>
            </Card>
            <Card title="通知提醒框" className="card-wrapper">
                <Button type="primary" onClick={() => openNotificationWithIcon('success', 'topLeft')}>Success</Button>
                <Button type="primary" onClick={() => openNotificationWithIcon('info', 'topRight')}>Info</Button>
                <Button type="primary" onClick={() => openNotificationWithIcon('warning', 'bottomLeft')}>Warning</Button>
                <Button type="primary" onClick={() => openNotificationWithIcon('error', 'bottomRight')}>Error</Button>
            </Card>
        </div>
    );
};

export default Notification;