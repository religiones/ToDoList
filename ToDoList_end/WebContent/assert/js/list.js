$(document).ready(function(){
	if (typeof(Storage) !== "undefined") {
		let str = sessionStorage.getItem("tasks");
		let res = JSON.parse(str);
		RenderTasksListPage(res);
	}
	else{
		console.log("Your bowser does not support the window.Storage");
	}
});

//使用数据渲染任务列表
function RenderTasksListPage(res){
	console.log(res);
}