import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from './../echartTheme'
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import 'defaultStyle/common.less'

class Bar extends Component {
    UNSAFE_componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme)
    }
    getOption=()=>{
        let option = {
            color: ['#E066FF'],
            title: {
                text: '用户单车骑行'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '订单量',
                    type: 'bar',
                    barWidth: '80%',
                    data: [1000, 1520, 2000, 2464, 2950, 1330, 2240]
                }
            ]
        }
        return option
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '单车比较' 
            },
            legend: {
                data: ['ofo','摩拜','小蓝']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'ofo',
                    type: 'bar',
                    data: [1800, 1520, 2000, 244, 2950, 130, 2240]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [1000, 2520, 200, 1464, 250, 1330, 240]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [100, 152, 200, 24, 250, 630, 3240]
                }
            ]
        }
        return option
    }
    render() {
        return (
            <div className="wrapper">
                <Card title="图标类型一" className="card-wrapper">
                    <ReactEcharts option={this.getOption()} theme='Imooc' style={{height: '500px'}}/>
                </Card>
                <Card title="图标类型二" className="card-wrapper">
                    <ReactEcharts option={this.getOption2()} theme='Imooc' style={{ height: '500px' }} />
                </Card>
            </div>
        );
    }
}

export default Bar;