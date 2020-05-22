import React, { useState } from 'react';
import { Card, Row, Col, Modal } from 'antd'
import './ui.less'

const { Meta } = Card
// 图片数据准备
const number = [1,2,3,4]
const imgs = []
for (let i = 0; i < (24 / 4); i++) {
    imgs.push(number.map(num => num + (i * 4)))
}

const Gallery = () => {
    let [show, setShow] = useState(false)
    let [title, setTitle] = useState(null)
    let [current, setCurrent] = useState(null)

    const imgList = imgs.map(list => list.map((item) =>
        <Card key={item} cover={<img alt="example" src={'/gallery/' + item + '.png'} />} style={{ marginBottom: 10 }} onClick={() => { setShow(true); setTitle(item); setCurrent('/gallery/' + item + '.png') }}>
            <Meta title={"Little Gragon " + item} description={"小 龙 " + item} />
        </Card>
    ))
    const imgShow = imgList.map((item, index) => <Col md={4} key={index}>{item}</Col>)

    return (
        <div className="wrapper">
            <Row gutter={10}>
                { imgShow }
            </Row>
            <Modal width={400} title={"小龙画廊 "+title} visible={show} footer={null} onCancel={() => setShow(false)}>
                <img src={current} alt="Loading..." style={{width: '100%'}}/>
            </Modal>
        </div>
    );
};

export default Gallery;