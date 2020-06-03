import Mock from 'mockjs'

Mock.setup({ timeout: 1000 })

Mock.mock(/\/api\/order*?/, 'get', (options) => {
    const nowpage = options.url.substr(options.url.indexOf('?') + 1).split('=')[1]
    return Mock.mock({
        success: true,
        // 属性 list 的值是一个数组，其中含有 1 到 5 个元素
        'list|8-10': [{
            'key|+1': 0,
            'id|+1': 10001,
            'order_sn': /T180[0-9]{6}/,
            'bike_sn': /冀T[0-9]{5}/ ,
            'user_id|+1': 2001,
            'user_name': '@cname',
            'mobile': /1[0-9]{10}/,
            'distance|1': [1000,1500,2000,2500],
            'total_time|1': [1000,2000,3000,4000],
            'status|1': ['1','2'],
            'start_time': "@datetime",
            'end_time': "@datetime",
            'total_fee|1': [10,8,9,7,6],
            'user_pay|1': [3,2,2.5,3.5]
        }],
        page: parseInt(nowpage),
        page_size: 20,
        total: 100
    })
})