// 请求评论列表的相关信息
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/comment/search',
    success: function (response) {
        // console.log(response);
        // 渲染评论列表
        var html = template('commentTpl', response);
        $('#commentBox').html(html);

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

            // 渲染分页信息
            var hh = template('pageTpl', response);
            // console.log(hh);
            $('#pageBox').html(hh)
        }
    })
}

// 审核品论是否通过
// $('#commentBox').on('click', '.modify', function () {
//   var id = $(this).attr('data-id');
//   // console.log(id);
//   var Approval = '';
//   if ($(this).text() == '批准') {
//     Approval = '/admin/comment/pass';
//   } else {
//     Approval = '/admin/comment/reject';
//   }
//   console.log(Approval);

//   $.ajax({
//     type: 'post',
//     url: 'http://localhost:8080/api/v1' + Approval,
//     data: {
//       id: id
//     },
//     success: function (response) {
//       // console.log(response);
//       location.reload();
//     }
//   })
//   return false;
// })


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
                // location.reload();
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