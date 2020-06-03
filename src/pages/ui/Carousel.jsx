import React from 'react';
import { Card, Carousel } from 'antd';
import 'defaultStyle/common.less'
import './ui.less'

let onChange = (a, b, c) => {
    console.log(a, b, c)
}

const index = () => {
    return (
        <div className="wrapper">
            <Card title="文字轮播" className="card-wrapper">
                <Carousel afterChange={onChange} effect="fade" autoplay>
                    <div><h3>1</h3></div>
                    <div><h3>2</h3></div>
                    <div><h3>3</h3></div>
                </Carousel>
            </Card>
            <Card title="图片轮播" className="card-wrapper slide-wrapper">
                <Carousel afterChange={onChange} effect="fade" autoplay>
                    <div><img src="/carousel-img/carousel-1.jpg" alt="图片1"/></div>
                    <div><img src="/carousel-img/carousel-2.jpg" alt="图片2"/></div>
                    <div><img src="/carousel-img/carousel-3.jpg" alt="图片3"/></div>
                </Carousel>
            </Card>
        </div>
    );
};

export default index;