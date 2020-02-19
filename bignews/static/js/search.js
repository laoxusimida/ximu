// 搜索文章--根据id
var key = GetQueryString('key')
console.log(key)
if (key != -1) {
    $.ajax({
        url: "http://localhost:8080/api/v1/index/search",
        type: 'get',
        data: {
            key: key
        },
        success: function (res) {
            console.log(res);
            // 模板数据拼接
            if (res.code == 200) {
                var html = template('categoryTpl', {
                    data: res.data.data
                })
                if (res.data.data.length > 0) {
                    $('#categoryBox').html(html)
                    $('#titleList').html(`<h3>${res.data.data[0].category}</h3>`)
                    var pagecount = res.data.pages;
                    var count = res.data.totalCount

                    $('#pagination').pagination({
                        totalPage: pagecount - 1,
                        pageCount: pagecount,
                        totalCount: count,
                        jump: true,
                        coping: false,
                        count: 3,
                        prevContent: '<上一页',
                        nextContent: '<下一页>',
                        homePage: '首页',
                        endPage: '末页',
                        jumpBtn: '确定',
                        callback: function (index) {
                            page = index
                            exchangePage(page)

                        }
                    });
                } else {
                    $('#categoryBox').html('没有搜索结果')

                }
            } else {
                $('#categoryBox').html('没有搜索结果')

            }
        }
    })
}


// 分页数据函数

function exchangePage(page) {
    // 获取分页信息--ajax
    $.ajax({
        url: "http://localhost:8080/api/v1/index/search",
        data: {
            key: key,
            page: page
        },
        success: function (res) {
            // 模板与数据拼接
            if (res.code == 200) {
                var html = template('categoryTpl', {
                    data: res.data.data
                })
                $('#categoryBox').html(html)
                $('#titleList').html(`<h3>${res.data.data[0].category}</h3>`)
            }
        }
    })
}










