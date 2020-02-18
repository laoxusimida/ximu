// 获取所有文章信息
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/category/list',
    type: 'get',
    success: function (response) {

        // 模板与数据拼接
        var html = template('categoryTpl', {
            data: response.data
        })
        $('#categoriesBox').html(html)

    }
})

// 新增分类
$('#xinzengfenlei').on('click', function () {
    // 模态框显示
})

// 表单的提交
$('#addcategoryForm').on('submit', function () {
    // var uname = $('#recipient-name').val()
    // var slug = $('#recipient-slug').val()
    // console.log(uname, slug);

    var formData = $(this).serialize()
    console.log(formData);

    // 发送ajax请求
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/category/add',
        type: 'post',
        data: formData,
        success: function (msg) {
            location.reload()

        },
        error: function (msg) {
            console.log(msg);

            alert('分类列表请求失败')
        }
    })
    return false;
})







// 文章编辑页面
// 事件委托形式
$('#categoriesBox').on('click', '.edit', function () {
    // 获取id
    var id = $(this).attr('data-id')
    // 发送ajax请求
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/category/search',
        type: 'get',
        data: {
            id: id
        },
        success: function (response) {
            $("#addModal").modal().show()
            // 模板与数据拼接
            var html = template('modifyTpl', response.data[0])
            $('#category').html(html)
            // 点击关闭按钮模态框隐藏
            $('#model_shutoff').on('click', function () {
                $('#addModal').modal().hide()
            })

        }
    })
})


// 修改分类功能
$('#category').on('submit', '#modifyForm', function () {
    // 获取表单信息转化为参数
    var formData = $(this).serialize()
    // 发送ajax请求
    $.ajax({
        url: 'http://localhost:8080/api/v1/admin/category/edit',
        type: 'post',
        data: formData,
        success: function (response) {
            console.log(response);
            // 模板与数据拼接
            location.reload()

        }
    })
    // 阻止表单默认提交
    return false;
})

// 删除分类--事件委托
$('#categoriesBox').on('click', '.delete', function () {
    // 获取其id
    var id = $(this).attr('data-id')
    // 发送ajax请求
    $.ajax({
        url: "http://localhost:8080/api/v1/admin/category/delete",
        data: {
            id: id
        },
        type: 'post',
        success: function (msg) {
            console.log(msg);
            location.reload()

        }
    })
})