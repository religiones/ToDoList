$(document).ready(function(){
	// var id = GetQueryVariable("id");
	var id = "a1";
	console.log(id);
	//创建会话期间存储变量
	if (typeof(Storage) !== "undefined") {
		if(sessionStorage.getItem("flag") != "true"){
			console.log("first access");
			sessionStorage.setItem("flag","true");//设置标志位，标志是否访问该主页
			sessionStorage.setItem("id",id);
		}
		else{
			console.log("not first access");
			let id = sessionStorage.getItem("id");
		}
	} else {
		console.log("Your bowser does not support the window.Storage");
	}
	//通过Ajax访问后端API
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "http://127.0.0.1:8080/ToDoList/tasks",
		"method": "POST",
		"data": {
			"id": id
			}
		}
		
	$.ajax(settings).done(function (response) {
		RenderQuadrantTasksPage(response);
		let res = JSON.stringify(response); 
		sessionStorage.setItem("tasks",res);
		});

	//完成任务
	$('*').on('click','.fa-square-o',function(){
		$(this).removeClass('fa-square-o');
		$(this).addClass('fa-check-square');
		$(this).next().css({
			'color':'rgba(0,0,0,0.4)'
		});
		var modal = M.Modal.getInstance($('#modal').modal());
		modal.open();

		$('#ensure').click(function(){
			let taskId = sessionStorage.getItem("task_id");
			let taskDeadline = sessionStorage.getItem("task_deadline");
			let taskScore = $('#task-score').val();
	
			if(taskId!=""&&taskDeadline!=""&&taskScore!=""){
				var finishTask = {
					"async": true,
					"crossDomain": true,
					"url": "http://127.0.0.1:8080/ToDoList/finishtask",
					"method": "POST",
					"data": {
					  "id": id,
					  "task_id": taskId,
					  "finish_flag": 1,
					  "deadline_time": taskDeadline,
					  "score": taskScore
					}
				}
				$.ajax(finishTask).done(function(response){
					let result = response["message"];
					if(result=="overdue"){
						var modal_message = M.Modal.getInstance($('#modal-message').modal());
						modal_message.open();
					}
					
				})
			}
			// location.reload();
		})
	})

	//清空选择的任务id
	sessionStorage.setItem("task_id","");
});

//获取url参数
function GetQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

//使用后台数据渲染该页
function RenderQuadrantTasksPage(res){
	console.log(res);
	/*默认渲染第一个任务列表*/
	list_id = res.Tasks_list[0].list_id;
	RenderQuadrant(list_id,res);
	ChangeQuadrant(list_id);
	var app = new Vue({
		el:"#tasks-nav",
		data:{
			tasks:res,
		},
		methods:{
			ShowList:function(id){
				ChangeQuadrant(id);
			}
		}
	});
}

//渲染四象限
function RenderQuadrant(id,res) {
	var list_panel = new Vue({
		el:'.page-container',
		data:{
			tasks:res,
			chooseList:id
		},
		methods:{
			ShowTask:function(id,deadline){
				sessionStorage.setItem("task_id",id);
				sessionStorage.setItem("task_deadline",deadline);
			}
		}
	});
}

//用于切换面板
function ChangeQuadrant(id){
	let panelId = "#"+id;
	$('.view').not(panelId).hide();
	$('.view').filter(panelId).show();
}

/********************字符串格式化*********** */
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg= new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

/* navside下拉列表事件 */
function SidenavSlide(selector){
	$(selector).siblings(".collapsible-body").slideToggle(300);
}