// 登录功能的实现
// 给登录按钮绑定点击事件
$('#loginBtn').on('click', function () {
    // 获取表单信息内容
    var username = $('#username').val();
    var password = $('#password').val()
    // 验证用户名和密码是否为空
    if (username.trim().length == 0 || password.trim().length == 0) {
        alert('请输入邮箱和密码')
        // 阻止程序向下执行
        return false
    } else {
        // 发送ajax请求
        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function (response) {
                if (response.code == 200) {
                    // 将token储存到本地当中
                    localStorage.setItem('token', response.token)
                    // 页面跳转到首页
                    location.href = 'index.html'
                }
                else {
                    alert('登陆失败')
                }


            },

        })
    }


    // 阻止默认提交
    return false;
})