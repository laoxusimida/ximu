var id = getUrlParams('id')
console.log(id);

// 发送ajax请求获取文章详细信息

$.ajax({
    url: "http://localhost:8080/api/v1/index/article",
    type: 'get',
    data: {
        id: id
    },
    success: function (res) {
        console.log(res);
        if (res.code == 200) {
            // 数据模板拼接
            var html = template('articleTpl', res.data)
            $('#detailArticle').html(html)
        }

    }
})


// 评论功能
$('#commentForm').on('submit', function () {
    // 获取表单信息
    var username = $('.comment_name').val()
    var comment = $('.comment_input').val()
    $.ajax({
        url: "http://localhost:8080/api/v1/index/post_comment",
        type: 'post',
        data: {
            author: username,
            content: comment,
            articleId: id
        },
        success: function (res) {
            if (res.code == 201) {
                alert('评论成功')
                location.reload()
            }

        }
    })
    // 阻止表单默认提交
    return false;
})


// 获取评论数据
$.ajax({
    url: "http://localhost:8080/api/v1/index/get_comment",
    type: 'get',
    data: {
        articleId: id
    },
    success: function (res) {
        console.log(res);
        var length = res.data.length
        var timeList = res.data;


        // 数据模板拼接
        var html = template('listTpl', {
            data: res.data
        })


        $('#listBox').html(html)
        $('#commentCount').html(length + '条评论')
    }
})








