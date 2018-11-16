// $('.carousel.carousel-slider').carousel({full_width: true});


/**************************任务数据统计表**************************/
taskStatic = document.getElementById('taskStatic-table');

optionTaskStatic = {
    title: {
        // text: '任务数据统计表'
    },
    tooltip: {},
    legend: {
        data: ['各项总任务', '各项已完成']
    },
    taskStatic: {
        // shape: 'circle',
        show: false,
        min: 500,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [{
        name:'课程内容分布',
        type:'pie',
        clockwise:'true',
        startAngle:'0',
        radius : '60%',
        center: ['50%', '50%'],
        // areaStyle: {normal: {}},
        data : [
            {
                value : 40,
                name : '已完成',
                itemStyle:{
                    normal:{
                        // color:'rgb(1,175,80)'
                    }
                }
            },
            {
                value : 20,
                name : '未完成',
                itemStyle:{
                    normal:{
                        // color:'rgb(1,175,80)'
                    }
                }
            },
            {
                value : 30,
                name : '进行中',
                itemStyle:{
                    normal:{
                        // color:'rgb(1,175,80)'
                    }
                }
            },
            {
                value : 10,
                name : '已超时',
                itemStyle:{
                    normal:{
                        // color:'rgb(1,175,80)'
                    }
                }
            },
        ]
    }]
};



$(document).ready(function(){
    taskStatic.style.height = taskStatic.clientWidth * 1 + "px";
    myTaskStatic = echarts.init(taskStatic);
    myTaskStatic.setOption(optionTaskStatic);
    $("#taskStatic-table div").css({"overflow":"scroll"});
});

window.addEventListener("resize", function () {
    taskStatic.style.height = taskStatic.clientWidth * 1 + "px";
    myTaskStatic.resize();
});


/*************************任务完成时间分布折线图*************************/
taskTime = document.getElementById('taskTime-table');

optionTaskTime = {
    title: {
        // text: '任务完成时间分布折线图'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['时间']
    },
    toolbox: {
        feature: {
            // saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '7%',
        bottom: '8%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['平\n均\n时\n间','最\n长\n时\n间','最\n短\n时\n间','24\n小\n时\n完\n成\n数']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'时间统计',
            type:'line',
            // stack: '总量',
            areaStyle: {normal: {}},
            data:[4,3,9,6]
        }
    ]
};


$(document).ready(function(){
    taskTime.style.height = taskTime.clientWidth * 1 + "px";
    myTaskTime = echarts.init(taskTime);
    myTaskTime.setOption(optionTaskTime);
    $("#taskTime-table div").css({"overflow":"scroll"});
});

window.addEventListener("resize", function () {
    taskTime.style.height = taskTime.clientWidth * 1 + "px";
    myTaskTime.resize();
});


/**************************任务评分雷达图**************************/
radar = document.getElementById('radar-map');

optionRadar = {
    title: {
        // text: '任务评分雷达图'
    },
    tooltip: {},
    legend: {

    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                backgroundColor: '#999',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        indicator: [
           { name: '100-80分\n非常满意', max: 10},
           { name: '80-60分\n比较满意', max: 10},
           { name: '60-40分\n一般满意', max: 10},
           { name: '40-20分\n不太满意', max: 10},
           { name: '20-0分\n极不满意', max: 10}
        ]
    },
    series: [{
        name: '满意程度雷达图',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [8, 3, 5, 4, 7],
                // name : '满意程度评分'
            }
        ]
    }]
};

$(document).ready(function(){
    radar.style.height = radar.clientWidth * 1 + "px";
    myRadar = echarts.init(radar);
    myRadar.setOption(optionRadar);
    $("#radar-map div").css({"overflow":"scroll"});
});

window.addEventListener("resize", function () {
    radar.style.height = radar.clientWidth * 1 + "px";
    myRadar.resize();
});



/*******************成就系统*******************/
