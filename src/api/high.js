import Mock from 'mockjs'

Mock.setup({ timeout: 1000 })

Mock.mock(/\/api\/high*?/, 'get', (options) => {
    const nowpage = options.url.substr(options.url.indexOf('?') + 1).split('=')[1]
    return Mock.mock({
        success: true,
        // 属性 list 的值是一个数组，其中含有 1 到 5 个元素
        'list|10-20': [{
            // 属性 id 是一个自增数，起始值为 1，每次增 1
            'key|+1': 0,
            // 属性 userId 是一个5位的随机码
            'userName|1': '@cname',
            'sex|1': [1, 2],
            'age|1': '@integer(18,30)',
            'status|1': ['1', '2', '3', '4', '5', '6', '7'],
            'hoddy|1': ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            'married|1': [1, 2],
            'birthday|1': '@date(yyyy-MM-dd)',
            'address|1': '@city',
            'time|1': '@date(HH:mm:ss)'
        }],
        page: parseInt(nowpage),
        page_size: 20,
        total: 100
    })
})