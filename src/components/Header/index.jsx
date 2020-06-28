import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Row, Col } from 'antd'
import Utils from './../../utils'
import './index.less'
// import axios from './../../axios'

const Header = ({ menuType, Menu }) => {
    let [sysTem, setSysTem] = useState('')
    let [userName, setUserName] = useState('')
    // let [dayPictureUrl, setDayPictureUrl] = useState('')
    // let [weather, setWeather] = useState('')
    
    // let getDayAPIData = () => {
        // let city = '河北衡水'
        // axios.jsonp({
        //     url: 'http://api.map.baidu.com/weather/v1/?district_id=131121&data_type=all&ak=EhvUNoK2GaR1RY72asRosb2gGVZGlCbS'
        // })
        // .then(res => {
        //     console.log(res)
        //     let dayData = res.results[0].weather_data[0];
        //     setDayPictureUrl(dayData.dayPictureUrl)
        //     setWeather(dayData.weather)
        // })
        // Axios.get('/weather')
        // .then(res=>{
        //     console.log(res)
        // })
    // }

    useEffect(()=>{
        setUserName("小龙")
        setSysTem(Utils.formatDate(new Date().getTime()))
        setInterval(() => {
            setSysTem(Utils.formatDate(new Date().getTime()))
        }, 1000);
        // getDayAPIData();
    },[])

    return (
        <header className="header">
            <Row className="header-top">
                {
                    menuType
                    ? <Col span="6" className='logo'>
                       <img src="/assets/logo-ant.svg" alt=""/>
                       <span>Little Dragon后台管理系统</span>
                    </Col>
                    : null
                }
                <Col span={menuType?"18":"24"}>
                    <span>欢迎：{userName}</span>
                    <a href="/">退出</a>
                </Col>
            </Row>
            {
                menuType ? '' :
                <Row className="breadcrumb">
                    <Col span="4" className="title">{Menu}</Col>
                    <Col span="20" className="day">
                        <span className="date">{sysTem}</span>
                        <span className="weather-img">
                            {/* <img src={dayPictureUrl} alt="loading..." /> */}
                        </span>
                        {/* <span className="weather-detial">{weather}</span> */}
                    </Col>
                </Row>
            }
        </header>
    );
};

const mapStateToProps = (state) => {
    return {
        Menu: state.menu
    }
}
export default connect(mapStateToProps)(Header);