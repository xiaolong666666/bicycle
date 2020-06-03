import Mock from 'mockjs'

Mock.mock(/\/api\/endOrder*?/, 'get', (options) => {
    return Mock.mock({
        success: true,
        // 属性 list 的值是一个数组，其中含有 1 到 5 个元素
        'detail': {
            'bike_sn': /冀T[0-9]{5}/,
            'battery': /[10-99]{1}/,
            'start_time': "@datetime",
            'location': '北京市海淀区奥林匹克公园' 
        },
    })
})