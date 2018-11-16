var myBurnout;
$(document).ready(function(){
    var burnout = document.getElementById('burnout-map');
    burnout.style.height = burnout.clientWidth * 0.618 + "px";
    myBurnout = echarts.init(burnout);
    myBurnout.setOption(optionBurnout);
    $("#burnout-map div").css({"overflow":"scroll"});
    /*从session中获取任务数据*/
    var tasks = JSON.parse(sessionStorage.getItem("tasks"));
    GetWeekTask(tasks);
    RenderData(tasks);
    window.addEventListener("resize", function () {
        burnout.style.height = burnout.clientWidth * 0.618 + "px";
        myBurnout.resize();
    });
    
});

//比较日期大小函数 date1<date2 时返回true
function compareDate(date1,date2){
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    if(oDate1.getTime() > oDate2.getTime()){
        return false;
    } else {
        return true;
    }
}

var weekTask = Array(7).fill({
    'finished':0,
    'overdue':0
});
var finishedArray = Array(7).fill(0);
var overdueArray = Array(7).fill(0);
//渲染数据
function RenderData(tasks){
    /*检索任务状况*/
    var Total = tasks.Task.length;
    var finished = 0; 
    var overdue = 0;
    for(var i = 0;i<Total;i++){  
        if(tasks.Task[i].task_finish_flag == 1){
            finished = finished + 1; 
        }
        if(tasks.Task[i].task_overdue == 1){
            overdue = overdue + 1;   
        }
    }
    var plan = new Vue({
        el:'.task-description',
        data: {
            task : tasks,
            taskTotal : Total,
            finishedTotal : finished,
            unfinishedTotal : (Total-finished),
            overdueTotal : overdue
        }
    });
}

//获取一周的任务情况
function GetWeekTask(tasks){
    //对任务进行处理，先找出已完成的任务
    var task = tasks.Task;
    var finishedTask = [];
    for(index in task){
        if(task[index].task_finish_flag == 1){
            finishedTask.push(task[index]);
        }
    }
    var date = new Date(); 
    var week = new Date(date).getDay();  //获取星期
    var myDate =  date.getDate()-week;   //获取日期
    for(var i = 0;i<=week;i++){     
        var localDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+(myDate+i);
        var finish = 0;
        var overdue = 0;
        //从已完成的任务数组中检索满足条件的任务
        for(index in finishedTask){
            var finish_date = finishedTask[index].task_finish_time.split(" ");
            //选取当天完成的任务量
            if(finish_date[0]==localDate){
                finish++;
                if(finishedTask[index].task_overdue == 1){
                    overdue++;
                }
            }

        }
        weekTask[i]={
            'finished':finish,
            'overdue':overdue
        }
    }
    finishedArray = [weekTask[0].finished,weekTask[1].finished,weekTask[2].finished,weekTask[3].finished,weekTask[4].finished,weekTask[5].finished,weekTask[6].finished];
    overdueArray = [weekTask[0].overdue,weekTask[1].overdue,weekTask[2].overdue,weekTask[3].overdue,weekTask[4].overdue,weekTask[5].overdue,weekTask[6].overdue];
    myBurnout.setOption({
        series : [
            {
                name:'完成任务量',
                type:'line',
                // stack: '总量',
                areaStyle: {normal: {}},
                data:finishedArray
            },
            {
                name:'超时任务量',
                type:'line',
                // stack: '总量',
                areaStyle: {normal: {}},
                data:overdueArray
            }
        ]
    });
}
/**************************燃尽图**************************/
optionBurnout = {
    title: {
        text: '任务燃尽'
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
        data:['完成任务量','超时任务量']
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
            data : ['周日','周一','周二','周三','周四','周五','周六']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'完成任务量',
            type:'line',
            // stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        },
        {
            name:'超时任务量',
            type:'line',
            // stack: '总量',
            areaStyle: {normal: {}},
            data:[]
        }
    ]
};

/********************甘特图***************** */
gantt = document.getElementById('gantt-map');

optionGantt = {
    title: {
        text: '甘特图',
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
            var tar = params[1];
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
    },
    grid: {
        left: '3%',
        right: '8%',
        bottom: '8%',
        containLabel: true
    },
    xAxis: [{
        type : 'value',
    },{
        type : 'category',
        splitLine: {show:false},
        data : ['周一','周二','周三','周四','周五','周六','周日']
    }],
    yAxis: {
        type : 'category',
        splitLine: {show:false},
        data : ['任务一','任务二','任务三','任务四','任务五']
  
    },
    series: [
        {
            name: '开始',
            type: 'bar',
            stack:  '总量',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                },
                emphasis: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [1700, 1400, 1200, 300, 0]
        },
        {
            name: '结束',
            type: 'bar',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'inside'
                }
            },
            data:[1200, 300, 200, 900, 300]
        }
    ]
};

$(document).ready(function(){
    gantt.style.height = gantt.clientWidth * 0.618 + "px";
    myGantt = echarts.init(gantt);
    myGantt.setOption(optionGantt);
    $("#gantt-map div").css({"overflow":"scroll"});
});

window.addEventListener("resize", function () {
    gantt.style.height = gantt.clientWidth * 0.618 + "px";
    myGantt.resize();
});




