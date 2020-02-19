
function getUrlParams(name) {
    var params = location.search.substr(1).split('&');
    for (var i = 0; i < params.length; i++) {
        if (params[i].split('=')[0] == name) {
            return params[i].split('=')[1];
        }
    }
    return -1;
}


//保留筛选条件
var categoryId;
var state;
var key = decodeURI(getUrlParams('key')) == -1 ? '' : decodeURI(getUrlParams('key'));


//获取分类信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/category/list',
    success: function (res) {
        var data = res.data;
        var html = template('categoryTpl', {
            data: data
        });
        $('#selCategory').html(html);
    }
})

//获取文章列表信息及分页信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/article/query',
    data: {
        key: key
    },
    success: function (res) {
        var result = res.data;
        var data = result.data;
        console.log(res);

        var html = template('articleTpl', {
            data: data
        });
        $('#articleBox').html(html);
        $('#pageBox').twbsPagination({
            totalPages: result.pages == 0 ? 1 : result.pages,
            visiblePages: 5,
            first: '首页',
            last: '末页',
            prev: '上一页',
            next: '下一页',
            onPageClick: function (event, page) {
                changePage(page);
            }
        });
    }
})

//分页功能
function changePage(page) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: {
            key: key,
            type: categoryId,
            state: state,
            page: page
        },
        success: function (res) {
            console.log(res);

            var result = res.data;
            var data = result.data;
            var html = template('articleTpl', {
                data: data
            });
            $('#articleBox').html(html);
        }
    })
}

//文章筛选
$('#filterForm').on('submit', function () {
    var formData = $(this).serialize();
    categoryId = $('#selCategory').val();
    state = $('#selStatus').val();
    formData += `&key=${key}`;
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/article/query',
        data: formData,
        success: function (res) {
            var result = res.data;
            var data = result.data;
            var html = template('articleTpl', {
                data: data
            });
            $('#articleBox').html(html);
            //清空分页设置
            $('#pageBox').removeData("twbs-pagination");
            //重新设置分页
            $('#pageBox').twbsPagination({
                totalPages: result.pages == 0 ? 1 : result.pages,
                visiblePages: 5,
                startPage: 1,
                first: '首页',
                last: '末页',
                prev: '上一页',
                next: '下一页',
                onPageClick: function (event, page) {
                    changePage(page);
                }
            });
        }
    })
    return false;
})




