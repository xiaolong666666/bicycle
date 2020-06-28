import React, { Component } from 'react'
import { Card } from 'antd'
import echartTheme from '../echartTheme'
import echarts from 'echarts/lib/echarts'
import ReactEcharts from 'echarts-for-react'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import 'defaultStyle/common.less'

class Pie extends Component {
    UNSAFE_componentWillMount(){
        echarts.registerTheme('Imooc',echartTheme)
    }
    getOption=()=>{
        let option = {
            title: {
                text: '订单数量统计',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: '55%',
                    data: [{
                        value: 1000,
                        name: '周一'
                    },
                        {
                            value: 1000,
                            name: '周二'
                        },
                        {
                            value: 2000,
                            name: '周三'
                        },
                        {
                            value: 1500,
                            name: '周四'
                        },
                        {
                            value: 3000,
                            name: '周五'
                        },
                        {
                            value: 2000,
                            name: '周六'
                        },
                        {
                            value: 1200,
                            name: '周日'
                        },],
                }
            ]
        };
        return option
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '订单数量统计',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['50%', '80%'],
                    data: [{
                        value: 1000,
                        name: '周一'
                    },
                    {
                        value: 1000,
                        name: '周二'
                    },
                    {
                        value: 2000,
                        name: '周三'
                    },
                    {
                        value: 1500,
                        name: '周四'
                    },
                    {
                        value: 3000,
                        name: '周五'
                    },
                    {
                        value: 2000,
                        name: '周六'
                    },
                    {
                        value: 1200,
                        name: '周日'
                    },],
                }
            ]
        };
        return option
    }
    getOption3 = () => {
        let option = {
            title: {
                text: '订单数量统计',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [{
                        value: 1000,
                        name: '周一'
                    },
                    {
                        value: 1000,
                        name: '周二'
                    },
                    {
                        value: 2000,
                        name: '周三'
                    },
                    {
                        value: 1500,
                        name: '周四'
                    },
                    {
                        value: 3000,
                        name: '周五'
                    },
                    {
                        value: 2000,
                        name: '周六'
                    },
                    {
                        value: 1200,
                        name: '周日'
                    }].sort((a,b)=>{
                        return a.value - b.value
                    }),
                    roseType: 'radius',
                }
            ]
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

export default Pie;