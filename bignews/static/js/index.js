// 获取热点图
$.ajax({
    url: "http://localhost:8080/api/v1/index/hotpic",
    type: 'get',
    success: function (res) {
        console.log(res);
        var arr = res.data;
        for (i = 0; i < arr.length; i++) {
            arr[i].num = i
        }
        console.log(arr);
        var html = template('focusTpl', {
            data: arr
        })
        $('#focusBox').html(html)

    }
})


// 获取最新资讯
$.ajax({
    url: 'http://localhost:8080/api/v1/index/latest',
    type: 'get',
    success: function (res) {
        if (res.code == 200) {
            // 模板与内容拼接
            var html = template('newsTpl', {
                data: res.data
            })
            $('#newsBox').html(html)

        }

    }
})