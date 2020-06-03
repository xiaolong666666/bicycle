import React from 'react';
import { Card, Button, message } from 'antd'
import 'defaultStyle/common.less'
import './ui.less'

const showMessage = type => {
    message[type]({
        content: 'Little Dragon'
    })
}

const Messages = () => {
    return (
        <div className="wrapper">
            <Card className="card-wrapper">
                <Button type="primary" onClick={() => showMessage("success")}>Success</Button>
                <Button type="primary" onClick={() => showMessage("info")}>Info</Button>
                <Button type="primary" onClick={() => showMessage("warning")}>Wraning</Button>
                <Button type="primary" onClick={() => showMessage("error")}>Error</Button>
                <Button type="primary" onClick={() => showMessage("loading")}>Loading</Button>
            </Card>
        </div>
    );
};

export default Messages;