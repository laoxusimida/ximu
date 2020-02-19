// 请求评论列表的相关信息
changePage(1);

// 更换页数要调用的函数
function changePage(page) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: {
            page: page
        },
        success: function (response) {
            console.log(response)
            // 渲染评论列表
            var html = template('commentTpl', response);
            $('#commentBox').html(html);

            var dd = [];
            // console.log(response.data.totalPage);

            // console.log(response.data.page);

            // 把所有的页数存储在dd数组中
            for (var i = 1; i <= response.data.totalPage; i++) {

                dd[i - 1] = i;
            }
            var display = [];
            // 判断要截取的page两边是否为空
            if (response.data.page - 3 >= 0 && response.data.page + 2 <= response.data.totalPage) {

                display = dd.slice(response.data.page - 3, response.data.page + 2);

            } else if (response.data.page == 1) {
                // alert(1)
                display = dd.slice(response.data.page - 1, response.data.page + 4);

            } else if (response.data.page == 2) {

                display = dd.slice(response.data.page - 2, response.data.page + 3);

            } else if (response.data.page == response.data.totalPage) {

                display = dd.slice(response.data.page - 5, response.data.page);

            } else if (response.data.page == response.data.totalPage - 1) {

                display = dd.slice(response.data.page - 4, response.data.page + 1);
            }


            // console.log(display);

            // 给response新增一个display属性
            response.display = display;

            // 渲染分页信息
            var hh = template('pageTpl', response);
            // console.log(hh);
            $('#pageBox').html(hh)
        }
    })
}

// 评论审核通过
$('#commentBox').on('click', '.approve', function () {
    // 获取 当前数据的id 
    var id = $(this).attr('data-id');
    // 获取 当前数据所在的页数
    var page = $(this).attr('data-page');
    // console.log(id);

    if (confirm('评论是否通过')) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/pass',
            data: {
                id: id
            },
            success: function (response) {
                // console.log(response);

                // 评论审核通过后跳转到本页面的跳转前的页数
                changePage(page);
            }
        })
    }

})

// 评论审核不通过
$('#commentBox').on('click', '.refuse', function () {
    // 获取 当前数据的id 
    var id = $(this).attr('data-id');
    // 获取 当前数据所在的页数
    var page = $(this).attr('data-page');
    if (confirm('评论是否拒绝')) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/reject',
            data: {
                id: id
            },
            success: function (response) {
                // console.log(response);
                // 评论审核拒绝后跳转到本页面的跳转前的页数
                changePage(page);
            }
        })
    }
})

// 删除评论
$('#commentBox').on('click', '.delete', function () {
    // 获取 当前数据的id 
    var id = $(this).attr('data-id');
    // 获取 当前数据所在的页数
    var page = $(this).attr('data-page');
    if (confirm('是否删除评论')) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/delete',
            data: {
                id: id
            },
            success: function (response) {
                // console.log(response);

                $.ajax({
                    type: 'get',
                    url: 'http://localhost:8080/api/v1/admin/comment/search',
                    data: {
                        page: page
                    },
                    success: function (response) {
                        // 判断删除后页面上是否还有元素
                        if (response.data.data.length > 0) {
                            // 评论删除后页面上还有元素跳转到本页面的跳转当前的页数
                            changePage(page);
                        } else {
                            // 评论删除后页面上没有元素跳转到本页面的跳转前一个的页数
                            page = response.data.page - 1;
                            changePage(page);
                        }
                    }
                })

            }
        })
    }
})
