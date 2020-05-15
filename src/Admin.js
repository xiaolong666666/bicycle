import React, { Component } from 'react';
import { Row, Col } from 'antd';
import Nav from './components/Nav'
import Header from './components/Header'
// import Home from './pages/home'
import Footer from './components/Footer'
import './style/common.less'

class Admin extends Component {
    render() {
        return (
            <Row className="container">
                <Col span="4" className="nav">
                    <Nav />
                </Col>
                <Col span="20" className="main">
                    <Header />
                    <Row className="content">
                        { this.props.children }
                    </Row>
                    <Footer />
                </Col>
            </Row>
        );
    }
}

export default Admin;