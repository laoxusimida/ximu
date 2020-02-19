
//获取用户信息 展示在页面上
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/user/detail',
    type: 'get',
    success: function (response) {
        // console.log(response);
        /* 渲染用户信息 */
        if (response.code == 200) {
            // 把用户名称渲染到页面上
            $('input[name="username"]').val(response.data.username)
            $('input[name="nickname"]').val(response.data.nickname)
            $('input[name="email"]').val(response.data.email)
            $('#coverImg').attr('src', response.data.userPic)
            $('input[name="password"]').val(response.data.password)
        }
    }
})
// 用户头像的修改功能
$('#articleForm').on('change', '#exampleInputFile', function () {
    var files = this.files[0];
    // 获取路径
    var url = URL.createObjectURL(files)
    // 图片预览
    $('#coverImg').attr('src', url)
})

// 实现用户信息修改功能
// 给表单添加提交事件
$('#articleForm').on('submit', function () {
    // alert('ok');
    // 用formData收集表单数据
    var formData = new FormData(this);
    // console.log(formData);
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/user/edit',
        contentType: false,
        processData: false,
        data: formData,
        success: function (response) {
            // console.log(response);
            if (response.code == 200) {
                alert('修改成功');
                // 修改成功退出登录 
                window.localStorage.removeItem('token');
                // 跳转回登录页面
                top.location.href = 'login.html'
            }
        }
    })
    // 阻止表单默认提交行为
    return false;
})


