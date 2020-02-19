// 发送ajax请求，获取用户名和头像
// alert('ok')
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/user/info',
    type: 'get',
    success: function (response) {
        console.log(response);
        var html = template('userinfoTpl', response);
        $('#userinfoBox').html(html)
    }
})