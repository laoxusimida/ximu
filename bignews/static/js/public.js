// 获取焦点关注 （1周）
$.ajax({
    url: 'http://localhost:8080/api/v1/index/attention',

    type: 'get',
    success: function (res) {
        var pupleTpl = `{{each data}}
        <li><a href="article.html?id={{$value.id}}">{{$value.intro}}</a></li>
        {{/each}}`
        // 模板数据拼接渲染模板
        var html = template.render(pupleTpl, {
            data: res.data
        })
        $('#puple').html(html)
    }
})



// 一周文章排行榜
$.ajax({
    url: "http://localhost:8080/api/v1/index/rank",
    type: 'get',
    success: function (res) {
        console.log(res);
        var arr = res.data

        for (var i = 0; i < arr.length; i++) {
            arr[i].num = i
        }


        var hotListTpl = `
        {{each data}}
        {{if $value.num==0}}
            <li><span class="first">1</span><a href="article.html?id={{$value.id}}">{{$value.title}}</a></li>
    
        {{ else if $value.num==1}}
            <li><span class="second">2</span><a href="article.html?id={{$value.id}}">{{$value.title}}</a></li>
       
        {{ else if $value.num==2}}
            <li><span class="third">3</span><a href="article.html?id={{$value.id}}">{{$value.title}}</a></li>
        {{else}}
        <li><span>{{$value.num-0+1}}</span><a href="article.html?id={{$value.id}}">{{$value.title}}</a></li>

        {{/if}}
        
         {{/each}}
         `
        // 数据与模板拼接
        var html = template.render(hotListTpl, {
            data: arr
        })
        $('#hotList').html(html)

    }
})


// 最新评论功能
$.ajax({
    url: "http://localhost:8080/api/v1/index/latest_comment",
    type: 'get',
    success: function (res) {

        // 获取数据结果
        var data = res.data

        // 获取每个评论发表日期date



        var commentTpl = `
        {{each data}}
        <li>
        <span>{{$value.author.substr(0,1)}}</span>
        <b><em>{{$value.author}}</em> {{$imports.getTime($value.date,$value.time).substr(0,8)}}前说:</b>
        <strong>{{$value.intro}}</strong>
        </li>
        {{/each}}
        `
        // 数据模板拼接
        var html = template.render(commentTpl, {
            data: res.data
        })
        $('#commentBox').html(html)

    }
})



// 创建当前时间函数计算发表时间与现在时间的时间差
function getTime(date) {
    // 获取现在时间


    var nowtime = +new Date()
    // 将发布时间转化为时间戳
    var ccx = +new Date(date)
    var times = ccx - nowtime
    month = times / (30 * 24 * 3600 * 1000)
    return Math.floor(month)

}

// 获取文章分类信息
$.ajax({
    url: "http://localhost:8080/api/v1/index/category",
    type: 'get',
    success: function (res) {
        console.log(res);
        var menuTpl = `
        <li class="up"></li>

        {{each data}}
        <li><a href="list.html?id={{$value.id}}">{{$value.name}}</a></li>
        {{/each}}
          
        `
        // 数据与模板拼接
        var html = template.render(menuTpl, {
            data: res.data
        })
        $('#levelFirst').html(html)
        $('#levelTwo').html(html)
    }
})

// 封装一个函数，用于从浏览器的地址栏中获取指定的参数
function getUrlParams(name) {
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



// 处理时间函数

function getTime(date, time) {
    var dates = date + ' ' + time
    var inputtime = +new Date(dates)
    var nowtime = +new Date()
    period = inputtime - nowtime
    return getdate(period)


}


function getdate(period) {
    var yearLevelValue = 365 * 24 * 60 * 60 * 1000;
    var monthLevelValue = 30 * 24 * 60 * 60 * 1000;
    var dayLevelValue = 24 * 60 * 60 * 1000;
    var hourLevelValue = 60 * 60 * 1000;
    var minuteLevelValue = 60 * 1000;
    var secondLevelValue = 1000;

    function getDifference(period) {
        /*******计算出时间差中的年、月、日、天、时、分、秒*******/
        var year = parseInt(getYear(period));
        var month = parseInt(getMonth(period - year * yearLevelValue));
        var day = parseInt(getDay(period - year * yearLevelValue - month * monthLevelValue));
        var hour = parseInt(getHour(period - year * yearLevelValue - month * monthLevelValue - day * dayLevelValue));
        var minute = parseInt(getMinute(period - year * yearLevelValue - month * monthLevelValue - day * dayLevelValue - hour * hourLevelValue));
        var second = parseInt(getSecond(period - year * yearLevelValue - month * monthLevelValue - day * dayLevelValue - hour * hourLevelValue - minute * minuteLevelValue));
        var result = "";
        if (year != 0) result = result + year + "年";
        if (month != 0) result = result + month + "月";
        if (day != 0) result = result + day + "天";
        result = result + hour + "时" + minute + "分" + second + "秒";
        function getYear(period) {
            return parseInt(period) / yearLevelValue;
        }
        function getMonth(period) {
            return parseInt(period) / monthLevelValue;
        }
        function getDay(period) {
            return parseInt(period) / dayLevelValue;
        }
        function getHour(period) {
            return parseInt(period) / hourLevelValue;
        }
        function getMinute(period) {
            return parseInt(period) / minuteLevelValue;
        }
        function getSecond(period) {
            return parseInt(period) / secondLevelValue;
        }
        return result;
    }
    return getDifference(period);
}



// 搜索框搜索功能
$('#searchBtn').on('click', function () {
    // 获取输入内容
    var keys = $('#search').val()

    // 页面跳转
    location.href = 'search.html?key=' + keys

})


$('#search').on('keyup', function (e) {
    if (e.keyCode == 13) {
        var keys = $(this).val()
        location.href = 'search.html?key=' + keys
    }
    // 页面跳转


})

//从浏览器的地址栏中获取指定的参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}
