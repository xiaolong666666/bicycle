import Mock from 'mockjs'

Mock.mock(/\/api\/finish_order*?/, 'get', (options) => {
    return Mock.mock({
        success: true,
    })
})