import React, { Component } from 'react';
import { Card } from 'antd'
import QueryForm from './../../components/BaseForm'
import axios from './../../axios'
import 'defaultStyle/common.less'

class bikeMap extends Component {

    state = {
        bikeInfo: {}
    }
    
    formList = [
        {
            type: 'SELECT',
            label: '城市',
            field: 'city',
            placeholder: '全部',
            initialValue: '1',
            width: 80,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
        },
        {
            type: '订单时间'
        },
        {
            type: 'SELECT',
            label: '状态',
            field: 'status',
            placeholder: '全部',
            initialValue: '0',
            width: 120,
            list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
        },
    ]

    request = () => {
        axios.ajax({
            url: '/api/bike_list'
        })
        .then(res=>{
            this.setState({ bikeInfo: res.result })
            this.renderMap(res)
        })
    }

    componentDidMount(){
        this.request()
    }

    renderMap = (res) => {
        let routeList = res.result.route_list
        let routeStart = routeList[0].split(",")
        let routeEnd = routeList[routeList.length-1].split(",") 
        this.map = new window.BMap.Map('container')
        let startPoint = new window.BMap.Point(routeStart[0], routeStart[1])
        let endPoint = new window.BMap.Point(routeEnd[0], routeEnd[1])
        this.map.centerAndZoom(endPoint,11)
        this.map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));

        // 起点终点绘制
        let startPointIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })
        let bikeMarkeStart = new window.BMap.Marker(startPoint, { icon: startPointIcon })
        this.map.addOverlay(bikeMarkeStart)
        let endPointIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        })  
        let bikeMarkeEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon })
        this.map.addOverlay(bikeMarkeEnd)

        // 行车路线绘制
        let list = []
        routeList.forEach(item=>{
            let p = item.split(',')
            list.push(new window.BMap.Point(p[0],p[1]))
        })
        let polyLine = new window.BMap.Polyline(list, {
            strokeColor: '#ef4136',
            strokeWeight: 2,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyLine)

        // 服务区绘制
        let serverPointList = []
        let service_list = res.result.service_list
        service_list.forEach(item=>{
            serverPointList.push(new window.BMap.Point(item.lon, item.lat))
        })
        let polyServerLine = new window.BMap.Polyline(serverPointList, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        this.map.addOverlay(polyServerLine)

        // 单车位置绘制
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg',new window.BMap.Size(36,42),{
            imageSize: new window.BMap.Size(36,42),
            anthor: new window.BMap.Size(18,42)
        })
        let bike_list = res.result.bike_list
        bike_list.forEach(item=>{
            let p = item.split(',')
            let point = new window.BMap.Point(p[0],p[1])
            let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon })
            this.map.addOverlay(bikeMarker)
        })
    }

    searchResult = value => {
        console.log(value)
        this.request()
    }

    render() {
        const { bikeInfo } = this.state
        return (
            <div className="wrapper">
                <Card className="card-wrapper">
                    <QueryForm formList={this.formList} searchResult={this.searchResult} />
                </Card>
                <Card>
                    <div className="title">共{bikeInfo.total_count}辆车</div>
                    <div id="container" style={{height: "500px"}}></div>
                </Card>
            </div>
        );
    }
}

export default bikeMap;