import Mock from 'mockjs'

Mock.setup({ timeout: 1000 })

Mock.mock('/basic', 'get', {
    success: true,
    // 属性 list 的值是一个数组，其中含有 1 到 5 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'key|+1': 0,
        // 属性 userId 是一个5位的随机码
        'userName|1': '@cname',
        'sex|1': ['男', '女'],
        'age|1': '@integer(18,30)',
        'status|1': ['我在线上', 'Q我吧', '离开', '忙碌', '请勿打扰', '隐身', '离线'],
        'hoddy|1': ['爬山', '旅游', '唱歌', '台球', '网球', '篮球', '足球', '乒乓球', '羽毛球', '游戏'],
        'married|1': ['已婚', '未婚'],
        'birthday|1': '@date(yyyy-MM-dd)',
        'address|1': '@city',
        'time|1': '@date(HH:mm:ss)'
    }]
})