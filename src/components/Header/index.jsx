import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd'
import Utils from './../../utils'
import './index.less'
import axios from './../../axios'

const Header = () => {
    let [sysTem, setSysTem] = useState('')
    let [userName, setUserName] = useState('')
    let [dayPictureUrl, setDayPictureUrl] = useState('')
    let [weather, setWeather] = useState('')
    
    let getDayAPIData = () => {
        let city = '河北衡水'
        axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        })
        .then(res => {
            let dayData = res.results[0].weather_data[0];
            setDayPictureUrl(dayData.dayPictureUrl)
            setWeather(dayData.weather)
        })
    }

    useEffect(()=>{
        setUserName("小龙")
        setSysTem(Utils.formatDate(new Date().getTime()))
        setInterval(() => {
            setSysTem(Utils.formatDate(new Date().getTime()))
        }, 1000);
        getDayAPIData();
    },[])

    return (
        <header className="header">
            <Row className="header-top">
                <Col span="24">
                    <span>欢迎：{userName}</span>
                    <a href="/">退出</a>
                </Col>
            </Row>
            <Row className="breadcrumb">
                <Col span="4" className="title">首页</Col>
                <Col span="20" className="day">
                    <span className="date">{sysTem}</span>
                    <span className="weather-img">
                        <img src={dayPictureUrl} alt="loading..." />
                    </span>
                    <span className="weather-detial">{weather}</span>
                </Col>
            </Row>
        </header>
    );
};

export default Header;