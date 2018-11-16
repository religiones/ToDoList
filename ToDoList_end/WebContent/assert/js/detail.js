document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);

    var elems = document.querySelectorAll('.timepicker');
    var instances = M.Timepicker.init(elems, options);

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

  $(document).ready(function(){
    //对话框初始化
    $('.modal').modal();

    //获取session数据
    var taskId = sessionStorage.getItem("task_id");
    var tasks = sessionStorage.getItem("tasks");
    var id = sessionStorage.getItem("id");

    //渲染
    RenderData(taskId,tasks);

    //格式化日期时间
    $('.datepicker').datepicker({
      selectMonths: true, 
      selectYears: 15, 
      format: 'yyyy-mm-dd',
      });
    $('.timepicker').timepicker({
      twelveHour:false
      });
    $('select').formSelect();

    //上传任务信息
    $('#addTask').click(function(){
        /*获取用户输入数据*/
        var list_id = $('#choose-list option:selected').val(); 
        var task_name = $('#task_name').val();
        var rewards = $('#rewards').val();
        var deep = $('#deep option:selected').val();
        var begin_time =$('#begin-date').val()+" "+$('#begin-time').val()+":00";
        var finish_time = $('#finish-date').val()+" "+$('#finish-time').val()+":00";
        var task_description = $('#task-description').val();
        /*验证数据是否遗漏，若无问题就上传数据*/
      if(id!=""&&list_id!=""&&task_name!=""&&rewards!=""&&deep!=""&&begin_time!=""&&finish_time!=""&&task_description!=""){
        var addTask = {
          "async": true,
          "crossDomain": true,
          "url": "http://127.0.0.1:8080/ToDoList/newtask",
          "method": "POST",
          "data": {
            "id": id,
            "list_id":list_id,
            "name":task_name,
            "description":task_description,
            "begin_time":begin_time,
            "deadline_time":finish_time,
            "reward":rewards,
            "priority":deep
          }
        }
        $.ajax(addTask).done(function (response) {
          let result = response["message"];
          if(result=="sucessfully"){
            $('#modal .modal-content p').text('添加成功');
          }else{
            $('#modal .modal-content p').text('添加失败');
          }
        });
      }else{
        $('#modal .modal-content p').text('请补全输入');
      }
    })

    //点击添加任务,清空选择的任务id
    $('#add').click(function(){
      sessionStorage.setItem("task_id","");
      });

    //删除任务信息
    $('#removeTask').click(function(){
      if(id!=""&&taskId!=""){
        var removeTask = {
          "async": true,
          "crossDomain": true,
          "url": "http://127.0.0.1:8080/ToDoList/deletetask",
          "method": "POST",
          "data": {
          "id": id,
          "task_id": taskId 
          }
        }
        $.ajax(removeTask).done(function(response){
          let result = response["message"];
          if(result=="sucessfully"){
            $('#modal .modal-content p').text('删除成功');
          }else{
            $('#modal .modal-content p').text('删除失败');
          }
        })
      }else{
        $('#modal .modal-content p').text('请别乱点');
      }
    });

    //修改任务信息
    $('#updataTask').click(function(){
        /*获取用户输入数据*/
        var task_name = $('#task_name_view').val();
        var rewards = $('#rewards_view').val();
        var deep = $('#deep_view option:selected').val();
        var begin_time =$('#begin-date_view').val()+" "+$('#begin-time_view').val()+":00";
        var finish_time = $('#finish-date_view').val()+" "+$('#finish-time_view').val()+":00";
        var task_description = $('#task-description_view').val();
        /*验证数据是否遗漏，若无问题就上传数据*/
      if(id!=""&&taskId!=""&&task_name!=""&&rewards!=""&&deep!=""&&begin_time!=""&&finish_time!=""&&task_description!=""){
        var updateTask = {
          "async": true,
          "crossDomain": true,
          "url": "http://127.0.0.1:8080/ToDoList/updatetask",
          "method": "POST",
          "data": {
            "id": id,
            "task_id": taskId,
            "name": task_name,
            "description":task_description,
            "begin_time":begin_time,
            "deadline_time":finish_time,
            "reward":rewards,
            "priority":deep
          }
        }
        $.ajax(updateTask).done(function (response) {
          let result = response["message"];
          if(result=="sucessfully"){
            $('#modal .modal-content p').text('保存成功');
          }else{
            $('#modal .modal-content p').text('保存失败');
          }
        });
      }else{
        $('#modal .modal-content p').text('请补全输入');
      }
    })
    
  });

//渲染数据
function RenderData(taskId,tasks){
  var res = JSON.parse(tasks);
  RenderQuadrantTasksPage(res); 
  IsView(taskId,res);
}

//判断是否需要显示任务信息
function IsView(taskId,res){
  if(taskId!="")
    {
      for(let index in res.Task){
      if(res.Task[index].task_id==taskId){
          /*时间处理*/
          let begin = res.Task[index].task_begin_time;
          let end = res.Task[index].task_deadline;
          var begin_Time = begin.split(" ");
          var end_Time = end.split(" ");
          /*选择框处理*/
          var deep ="[value="+res.Task[index].task_priority+"]";
          var list ="[value="+res.Task[index].task_list_fk+"]";
          break;
        }
      }
      var detail = new Vue({
        el:'#detail-view',
        data:{
          tasks:res,
          chooseId:taskId,
          beginDate:begin_Time[0],
          beginTime:begin_Time[1].substr(0,5),
          endDate:end_Time[0],
          endTime:end_Time[1].substr(0,5)
        }
      });
      $('#deep_view option').filter(deep).attr("selected",true);
      $('#choose-list-view option').filter(list).attr("selected",true);

      /*部分样式切换*/
      $('#detail-view').show();
      $('#detail-add').hide();

      $('#addTask').hide();
      $('#updataTask').show();
    }else{
      $('#detail-add').show();
      $('#addTask').show();
    }
}

//使用后台数据渲染该页
function RenderQuadrantTasksPage(res){
	var app = new Vue({
		el:"#tasks-nav",
		data:{
			tasks:res
		}
  });

  var select = new Vue({
    el:'#choose-list',
    data:{
      lists:res
    }
  });
}

function SidenavSlide(selector){
	$(selector).siblings(".collapsible-body").slideToggle(300);
}