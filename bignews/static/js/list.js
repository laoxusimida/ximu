// 搜索文章--根据id
var type = getUrlParams('id')
$.ajax({
    url: "http://localhost:8080/api/v1/index/search",
    type: 'get',
    data: {
        type: type
    },
    success: function (res) {
        console.log(res);
        // 模板数据拼接
        if (res.code == 200) {
            var html = template('categoryTpl', {
                data: res.data.data
            })
            $('#categoryBox').html(html)
            $('#titleList').html(`<h3>${res.data.data[0] && res.data.data[0].category}</h3>`)
            var pagecount = res.data.pages;
            console.log(pagecount)
            var count = res.data.totalCount
            $('#pagination').pagination({
                totalPage: pagecount - 1,
                totalCount: count,
                jump: true,
                coping: false,
                count: 3,
                prevContent: '<上一页',
                nextContent: '<下一页>',
                homePage: '首页',
                endPage: '末页',

                callback: function (index) {
                    page = index
                    exchangePage(page)

                }
            });
        }
    }
})


// 分页数据函数

function exchangePage(page) {
    // 获取分页信息--ajax
    $.ajax({
        url: "http://localhost:8080/api/v1/index/search",
        data: {
            type: type,
            page: page
        },
        success: function (res) {
            // 模板与数据拼接

            if (res.code == 200) {
                var html = template('categoryTpl', {
                    data: res.data.data
                })
                $('#categoryBox').html(html)
                $('#titleList').html(`<h3>${res.data.data[0] && res.data.data[0].category}</h3>`)
            }
        }
    })
}