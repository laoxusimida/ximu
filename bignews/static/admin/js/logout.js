// 退出功能
$('#logout').on('click', function () {
    if (confirm('您确定要退出么？')) {
        window.localStorage.removeItem('token');
        location.href = '/admin/login.html';
    }

})