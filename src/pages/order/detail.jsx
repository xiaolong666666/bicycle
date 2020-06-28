import React, { useState, useEffect } from 'react';
import axios from './../../axios'
import 'defaultStyle/common.less'
import './detail.less'

const Detail = props => {

    let orderId = props.match.params.orderId;
    const [detail, setDetail] = useState({})
    
    useEffect(() => {
        const getDetailInfo = orderId => {
            axios.ajax({
                url: '/api/detail',
                data: {
                    params: {
                        orderId: orderId
                    }
                }
            })
            .then(res => {
                console.log(res.result)
                setDetail(res.result)
                renderMap(res.result)
            })
        }
        getDetailInfo(orderId)
    }, [orderId])

    // 绘制地图
    const renderMap = detail => {
        const map = new window.BMap.Map("orderDetailMap");
        const point = new window.BMap.Point(detail.position_list[0].lon, detail.position_list[0].lat);
        map.centerAndZoom(point, 12); 
        map.enableScrollWheelZoom(true);
        // 添加控件
        const addMapControl = () => {
            // 添加比例尺控件
            map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
            // 添加比例尺控件
            map.addControl(new window.BMap.NavigationControl({
                // 靠右上角位置
                anchor: window.BMAP_ANCHOR_TOP_RIGHT,
                // // LARGE类型
                type: window.BMAP_NAVIGATION_CONTROL_LARGE,
                // 启用显示定位
                enableGeolocation: true
            }));
        }

        // 绘制行车路线
        const drawBikeRoute = () => {
            let start_point = detail.position_list[0]
            let end_point = detail.position_list[detail.position_list.length-1]
            var startPoint = new window.BMap.Point(start_point.lon, start_point.lat);
            var endPoint = new window.BMap.Point(end_point.lon, end_point.lat);
            let startIcon = new window.BMap.Icon('/assets/start_point.png',new window.BMap.Size(36,45),{
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42),
            })
            let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 45), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(36, 42),
            })
            var startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });        // 创建起点标注    
            var endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });        // 创建结束标注    
            map.addOverlay(startMarker);
            map.addOverlay(endMarker); 

            const trackPoint = []
            for(let i = 0; i < detail.position_list.length; i++){
                trackPoint.push(new window.BMap.Point(detail.position_list[i].lon, detail.position_list[i].lat))
            }
            let polyline = new window.BMap.Polyline(trackPoint,{
                strokeColor: '#0bf',
                strokeWeight: 3,
                strokeOpacity: 1
            })
            map.addOverlay(polyline)
        }

        // 绘制服务区
        const drawServerArea = () => {
            console.log(detail.area)
            const trackPoint = []
            for (let i = 0; i < detail.area.length; i++) {
                trackPoint.push(new window.BMap.Point(detail.area[i].lon, detail.area[i].lat))
            }
            let polygon = new window.BMap.Polygon(trackPoint, {
                strokeColor: '#cE0000',
                strokeWeight: 4,
                strokeOpacity: 1,
                fillColor: '#ff8605',
                fillOpacity: 0.4
            })
            map.addOverlay(polygon)
        }

        addMapControl()
        drawBikeRoute()
        drawServerArea()

    }

    return (
        <div className='wrapper detail-wrapper'>
            <div id='orderDetailMap' className='order-map'>地图组件</div>
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