import Mock from 'mockjs'

Mock.setup({ timeout: 1000 })

Mock.mock(/\/api\/city*?/,'get',options=>{
    const nowpage = options.url.substr(options.url.indexOf('?') + 1).split('=')[1]
    return Mock.mock({
        success: true,
        'city_list|10': [{
            "id|+1": 1,
            "name": "@city",
            "mode|1-2": 1,
            "open_mode|1-2": 1,
            "franchisee_id": 77,
            "franchisee_name": "松果自营",
            "city_admin|1-2": [{
                "user_id|+1": 1,
                "user_name": "@cname"
            }],
            "open_time": "@datetime",
            "update_time": 1520476737000,
            "sys_user_name": "@cname"
        }],
        page: parseInt(nowpage),
        page_size: 10,
        total: 100
    })
})