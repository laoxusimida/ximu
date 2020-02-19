// 请求评论列表的相关信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/comment/search',
    success: function (response) {
        // console.log(response);
        // 渲染评论列表
        var html = template('commentTpl', response);
        $('#commentBox').html(html);
        var dd = [];

        console.log(response.data.page);
        for (var i = 1; i <= response.data.totalPage; i++) {

            dd[i - 1] = i;
        }

        var display = [];

        // 判断要截取的当前页两端是否有值
        if (response.data.page >= 3 && response.data.page + 2 <= response.data.totalPage) {

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

        response.display = display;
        console.log(display);

        // 渲染分页信息
        var hh = template('pageTpl', response);
        // console.log(hh);

        $('#pageBox').html(hh)
    }
})


// 更换页数要调用的函数
function changePage(page) {
    $.ajax({
        type: 'get',
        url: 'http://localhost:8080/api/v1/admin/comment/search',
        data: {
            page: page
        },
        success: function (response) {

            // 渲染评论列表
            var html = template('commentTpl', response);
            $('#commentBox').html(html);

            var dd = [];
            // console.log(response.data.totalPage);

            console.log(response.data.page);

            for (var i = 1; i <= response.data.totalPage; i++) {

                dd[i - 1] = i;
            }
            var display = [];
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


            console.log(display);

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
    var id = $(this).attr('data-id');
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
                location.reload();
            }
        })
    }

})
// 评论审核不通过
$('#commentBox').on('click', '.refuse', function () {
    var id = $(this).attr('data-id');

    if (confirm('评论是否拒绝')) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/reject',
            data: {
                id: id
            },
            success: function (response) {
                // console.log(response);
                location.reload();
            }
        })
    }
})
// 删除评论
$('#commentBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id');

    if (confirm('是否删除评论')) {
        $.ajax({
            type: 'post',
            url: 'http://localhost:8080/api/v1/admin/comment/delete',
            data: {
                id: id
            },
            success: function (response) {
                // console.log(response);
                location.reload();
            }
        })
    }
})
