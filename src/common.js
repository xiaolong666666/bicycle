import React from 'react';
import { Row } from 'antd';
import Header from './components/Header'
import './style/common.less'

const Common = (props) => {
    return (
        <div className="container">
            <div className='main'>
                <Row className="simple-page">
                    <Header menuType="second" />
                </Row>
                <Row className='content'>
                    {props.children}
                </Row>
            </div>
        </div>
    );
};

export default Common;