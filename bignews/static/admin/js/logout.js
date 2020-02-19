// 退出功能
$('#logout').on('click', function () {
    if (confirm('您确定要退出么？')) {
        window.localStorage.removeItem('token');
        location.href = '/admin/login.html';
    }

})

// 页面头像渲染功能
$.ajax({
    url: "http://localhost:8080/api/v1/admin/user/info",
    type: 'get',
    success: function (res) {
        console.log(res);
        var html = template('userTpl', res.data)
        $('#userInfo').html(html)
        $('#preview').attr('src', res.data.userPic)
    }
})
