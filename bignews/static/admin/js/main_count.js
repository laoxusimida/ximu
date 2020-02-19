// 获取文章总数 日新增文章数 评论总数 日新增评论数
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/data/info',
    type: 'get',
    success: function (res) {
        $('#article').prepend(`<em>${res.totalArticle}</em>`)
        $('#dayArticle').prepend(`<em>${res.dayArticle}</em>`)
        $('#totalComment').prepend(`<em>${res.totalComment}</em>`)
        $('#dayComment').prepend(` <em>${res.dayComment}</em>`)
    }
})


var oChart = echarts.init(document.getElementById('curve_show'));
//页面一进来就发送ajax请求,获取真实的月新增文章数
$.ajax({
    type: 'get',
    url: 'http://localhost:8080/api/v1/admin/data/article',
    success: function (backData) {

        if (backData.code == 200) {
            let aCount = [];
            let aDate = [];

            for (var i = 0; i < backData.date.length; i++) {
                aCount.push(backData.date[i].count);
                aDate.push(backData.date[i].date);
            }

            //设置配置项, 调用方法
            var chartopt = {
                title: {
                    text: '月新增文章数',
                    left: 'center',
                    top: '10'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['新增文章'],
                    top: '40'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    name: '日',
                    type: 'category',
                    boundaryGap: false,
                    data: aDate
                }],
                yAxis: [{
                    name: '月新增文章数',
                    type: 'value'
                }],
                series: [{
                    name: '新增文章',
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            areaStyle: {
                                type: 'default'
                            },
                            color: '#f80'
                        },
                        lineStyle: {
                            color: '#f80'
                        }
                    },
                    data: aCount
                }],
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(255,136,0,0.39)'
                        }, {
                            offset: .34,
                            color: 'rgba(255,180,0,0.25)'
                        }, {
                            offset: 1,
                            color: 'rgba(255,222,0,0.00)'
                        }])

                    }
                },
                grid: {
                    show: true,
                    x: 50,
                    x2: 50,
                    y: 80,
                    height: 220
                }
            };

            oChart.setOption(chartopt);

        }
    }
});




var oPie = echarts.init(document.getElementById('pie_show'));
// 获取分类文章
$.ajax({
    url: 'http://localhost:8080/api/v1/admin/data/category',
    type: 'get',
    success: function (res) {
        console.log(res);
        var dataNum1 = [];
        var arr = res.date

        for (var i = 0; i < arr.length; i++) {
            dataNum1.push(JSON.parse(JSON.stringify(arr[i]).replace(/articles/g, "value")));
        }


        var oPieopt = {
            title: {
                top: 10,
                text: '分类文章数量比',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color: ['#5885e8', '#13cfd5', '#00ce68', '#ff9565'],
            legend: {
                x: 'center',
                top: 65,
                data: dataNum1
            },
            toolbox: {
                show: true,
                x: 'center',
                top: 35,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['pie', 'funnel'],
                        option: {
                            funnel: {
                                x: '25%',
                                width: '50%',
                                funnelAlign: 'left',
                                max: 1548
                            }
                        }
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: ['45%', '60%'],
                center: ['50%', '65%'],
                data: dataNum1
            }]
        };
        oPie.setOption(oPieopt);
    }
})


var oColumn = this.echarts.init(document.getElementById('column_show'));
// 获取文章访问量并渲染数据


$.ajax({
    url: 'http://localhost:8080/api/v1/admin/data/visit',
    type: 'get',
    success: function (msg) {
        console.log(msg);
        // 获取属性值
        // 获取日期
        var rdate = msg.data
        console.log(rdate);
        // 遍历对象获取属性
        // 属性值
        var nucc = []

        for (var key in rdate) {
            nucc.push(rdate[key])
        }

        console.log(nucc);


        if (msg.code == 200) {
            var oColumnopt = {
                title: {
                    text: '文章日访问量',
                    left: 'center',
                    top: '10'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {

                    top: '40'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    data: cdate
                }],
                yAxis: [{
                    name: '访问量',
                    type: 'value'
                }],
                series: [
                    {
                        name: '日访问量',
                        type: 'bar',
                        barWidth: 20,
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                },
                                color: '#fd956a'
                            }
                        },
                        data: nucc
                    },
                ],
                grid: {
                    show: true,
                    x: 50,
                    x2: 30,
                    y: 80,
                    height: 260
                },
                dataZoom: [ //给x轴设置滚动条
                    {
                        start: 0, //默认为0
                        end: 100 - 1000 / 31, //默认为100
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        handleSize: 0, //滑动条的 左右2个滑动条的大小
                        height: 8, //组件高度
                        left: 45, //左边的距离
                        right: 50, //右边的距离
                        bottom: 26, //右边的距离
                        handleColor: '#ddd', //h滑动图标的颜色
                        handleStyle: {
                            borderColor: "#cacaca",
                            borderWidth: "1",
                            shadowBlur: 2,
                            background: "#ddd",
                            shadowColor: "#ddd",
                        }
                    }
                ]
            };
            oColumn.setOption(oColumnopt)
        }
    }
})





