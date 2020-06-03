import React, { useState, useEffect } from 'react';
import axios from './../../axios'
// import Utils from './../../utils'
import 'defaultStyle/common.less'
import './detail.less'

const Detail = props => {

    let orderId = props.match.params.orderId;
    const [detail, setDetail] = useState({})

    const getDetailInfo = orderId => {
        axios.ajax({
            url: '/api/detail',
            data: {
                params: {
                    orderId: orderId
                }
            }
        })
        .then(res=>{
            console.log(res.result)
            setDetail(res.result)
        })
    }

    useEffect(()=>{
        getDetailInfo(orderId)
    }, [orderId])

    return (
        <div className='wrapper detail-wrapper'>
            <div className='order-map'>地图组件</div>
            <div className="detail-items">
                <div className="item-title">基础信息</div>
                <ul className="detail-form">
                    <li className="detail-form-title">用车模式</li>
                    <li className="detail-form-content">{detail.mode === '1' ? '服务区' : '停车点' }</li>
                </ul>
                <ul className="detail-form">
                    <li className="detail-form-title">订单编号</li>
                    <li className="detail-form-content">{detail.order_sn}</li>
                </ul>
                <ul className="detail-form">
                    <li className="detail-form-title">车辆编号</li>
                    <li className="detail-form-content">{detail.bike_sn}</li>
                </ul>
                <ul className="detail-form">
                    <li className="detail-form-title">用户姓名</li>
                    <li className="detail-form-content">{detail.user_name}</li>
                </ul>
                <ul className="detail-form">
                    <li className="detail-form-title">手机号码</li>
                    <li className="detail-form-content">{detail.mobile}</li>
                </ul>
            </div>
            <div className="detail-items">
                <div className="items-title">行车轨迹</div>
                <ul className="detail-form">
                    <li className="detail-form-title">行车起点</li>
                    <li className="detail-form-content">{detail.start_location}</li>
                </ul>
                <ul className="detail-form">
                    <li className="detail-form-title">行车终点</li>
                    <li className="detail-form-content">{detail.end_location}</li>
                </ul>
                <ul className="detail-form">
                    <li className="detail-form-title">行驶里程</li>
                    <li className="detail-form-content">{detail.distance/1000}公里</li>
                </ul>
            </div>
        </div>
    )
}

export default Detail