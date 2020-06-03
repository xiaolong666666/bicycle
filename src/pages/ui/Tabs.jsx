import React, { Component } from 'react'
import { Card, Tabs, message } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import 'defaultStyle/common.less'
import './ui.less'

const { TabPane } = Tabs 

class index extends Component {

    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
            {
                title: 'Tab 3',
                content: 'Content of Tab 3',
                key: '3',
                closable: false,
            },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    handleClick = key => {
        message.info(`你选择了页签${key}`)
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    
    render() {
        return (
            <div className="wrapper">
                <Card title="Tab页签" className="card-wrapper">
                    <Tabs defaultActiveKey="1" onChange={this.handleClick}>
                        <TabPane tab="Tab 1" key="1">Little Dragon 1</TabPane>
                        <TabPane tab="Tab 2" key="2" disabled>Little Dragon 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Little Dragon 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab带图的页签" className="card-wrapper">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab={<span><PlusOutlined />Plus</span>} key="1">Little Dragon 1</TabPane>
                        <TabPane tab={<span><EditOutlined />Edit</span>} key="2">Little Dragon 2</TabPane>
                        <TabPane tab={<span><DeleteOutlined />Delete</span>} key="3">Little Dragon 3</TabPane>
                    </Tabs>
                </Card>
                <Card title="Tab可添加删除页签" className="card-wrapper">
                    <Tabs
                        onChange={this.onChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {this.state.panes.map(pane => (
                            <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                                {pane.content}
                            </TabPane>
                        ))}
                    </Tabs>
                </Card>
            </div>
        );
    }
}

export default index;