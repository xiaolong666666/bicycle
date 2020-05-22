import React from 'react';
import { Row, Col } from 'antd';
import Nav from './components/Nav'
import Header from './components/Header'
import Footer from './components/Footer'
import './style/common.less'

const Admin = (props) => {
    return (
        <Row className="container">
            <Col span="4" className="nav">
                <Nav />
            </Col>
            <Col span="20" className="main">
                <Header />
                <Row className="content">
                    {props.children}
                </Row>
                <Footer />
            </Col>
        </Row>
    );
};

export default Admin;