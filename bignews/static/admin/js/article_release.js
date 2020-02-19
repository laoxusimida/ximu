// 获取文章分类
var category;
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/category/list',
    type: 'get',
    success: function (response) {
        //拼接模板，显示在页面
        console.log(response)
        var html = template('categoryTpl', { category: response });
        $('#article_category').html(html);
    }
})

// 文章封面缩略图
$('#exampleInputFile').on('change', function () {
    var file = this.files[0]
    var imgURL = URL.createObjectURL(file)
    //设置img的src属性
    $('#preview').prop('src', imgURL)
})

// 添加文章表单提交事件
var flag = 0;
$('#addForm').on('submit', function () {
    var formData = new FormData(this);
    console.log(formData);
    if (flag == 0) {
        formData.append('state', '已发布');
    }
    else {
        formData.append('state', '草稿');
    }
    formData.append("content", tinyMCE.activeEditor.getContent().replace(/<[^<>]+>/g, ""))
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/article/publish',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response)
            location.reload();
            // alert('添加成功')
        },
        error: function (error) {
            // alert('文章创建失败');
            console.log(error);

        }
    })
    //阻止表单默认提交行为
    return false;
})


