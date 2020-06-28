import Mock from 'mockjs'

Mock.mock(/\/api\/user_list*?/, 'get', (options) => {
    const nowpage = options.url.substr(options.url.indexOf('?') + 1).split('=')[1]
    return Mock.mock({
        success: true,
        "list|10-15": [{
            "status|0-1": 0,
            "user_id|+1": 1,
            "user_name": "@cname"
        }],
        page: parseInt(nowpage),
        page_size: 20,
        total: 100
    })
})