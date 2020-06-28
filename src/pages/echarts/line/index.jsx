import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from '../echartTheme'
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import 'defaultStyle/common.less'

class Line extends Component {
    UNSAFE_componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme)
    }
    getOption=()=>{
        let option = {
            color: ['#E066FF'],
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line'
            }]
        };
        return option
    }
    getOption2 = () => {
        let option = {
            color: ['#E066FF'],
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    stack: '总量',
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    stack: '总量',
                    data: [220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410]
                },]
        };
        return option
    }
    getOption3 = () => {
        let option = {
            color: ['#E066FF'],
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    stack: '总量',
                    data: [150, 232, 201, 154, 190, 330, 410],
                    areaStyle: {}
                },]
        };
        return option
    }
    render() {
        return (
            <div className="wrapper">
                <Card title="图标类型一" className="card-wrapper">
                    <ReactEcharts option={this.getOption()} theme='Imooc' style={{height: '300px'}}/>
                </Card>
                <Card title="图标类型二" className="card-wrapper">
                    <ReactEcharts option={this.getOption2()} theme='Imooc' style={{ height: '300px' }} />
                </Card>
                <Card title="图标类型三" className="card-wrapper">
                    <ReactEcharts option={this.getOption3()} theme='Imooc' style={{ height: '300px' }} />
                </Card>
            </div>
        );
    }
}

export default Line;