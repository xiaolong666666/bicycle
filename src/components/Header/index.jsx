import React, { Component } from 'react';
import { Row, Col } from 'antd'
import Until from './../../until'
import './index.less'
import axios from './../../axios'

class Header extends Component {

    state = {
        sysTem: ''
    }

    getDayAPIData = () => {
        let city = '河北衡水'
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        })
        .then(res=>{
            let dayData = res.results[0].weather_data[0];
            this.setState({ dayPictureUrl: dayData.dayPictureUrl, weather: dayData.weather })
        })
    }

    UNSAFE_componentWillMount(){
        this.setState({ userName: "小龙" });
        this.setState({ sysTem: Until.formatDate(new Date().getTime()) });
        setInterval(()=>{
            this.setState({ sysTem: Until.formatDate(new Date().getTime()) });
        },1000);
        this.getDayAPIData();
    }

    render() {
        let { userName, sysTem, dayPictureUrl, weather } = this.state;
        return (
            <header className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎： {userName}</span>
                        <a href="/">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="title">首页</Col>
                    <Col span="20" className="day">
                        <span className="date">{sysTem}</span>
                        <span className="weather-img">
                            <img src={dayPictureUrl} alt="loading..."/>
                        </span>
                        <span className="weather-detial">{weather}</span>
                    </Col>
                </Row>
            </header>
        )
    }
}

export default Header;