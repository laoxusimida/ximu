// 封装一个函数，用于从浏览器的地址栏中获取指定的参数
function getUrlParams(name) {
    console.log(location.href)
    var paramsAry = location.search.substr(1).split('&');
    // 循环数据
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name) {
            return tmp[1];
        }
    }
    // 参数不存在，则返回-1
    return -1;
}
var id = getUrlParams('id');
console.log(id);

$.ajax({
    url: 'http://localhost:8080/api/v1/admin/article/search?id=' + id,
    success: function (res) {
        console.log(res)
        var categoryId = res.data.categoryId
        // console.log(categoryId)
        $('input[name="title"]').val(res.data.title);
        $('#coverImg').prop('src', res.data.cover);
        $('input[name="date"]').val(res.data.date);
        $('#rich_content').val(res.data.content)
        $.ajax({
            url: 'http://localhost:8080/api/v1/admin/category/list',
            type: 'get',
            success: function (response) {
                //拼接模板，显示在页面
                response.categoryId = categoryId
                console.log(response)
                var html = template('categoryTpl', { category: response });
                $('#categoryBox').html(html);
            }
        })
    }
})
$('#exampleInputFile').on('change', function () {
    var file = this.files[0]
    var imgURL = URL.createObjectURL(file)
    //设置img的src属性
    $('#coverImg').prop('src', imgURL)
})


$('#editForm').on('submit', function () {
    var formData = new FormData(this); id
    formData.append("state", "已发布");
    formData.append("id", id);
    formData.append("content", tinyMCE.activeEditor.getContent().replace(/<[^<>]+>/g, ""))
    $.ajax({
        type: 'post',
        url: 'http://localhost:8080/api/v1/admin/article/edit',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // console.log(response)
            alert('修改成功')
            location.href = 'article_list.html'

        },
        error: function (error) {
            // alert('文章创建失败');
            console.log(error);

        }
    })
    //阻止表单默认提交行为
    return false;
})