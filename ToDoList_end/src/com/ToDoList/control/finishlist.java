package com.ToDoList.control;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.ToDoList.model.Task_list;

public class finishlist extends HttpServlet{
	private static final long serialVersionUID = 1L;
	private String user_id = null;
	private String list_id = null;
	private int finish = 0;
	private Task_list task_list = null;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		this.doPost(request, response);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		request.setCharacterEncoding("GBK"); //����ͳһ
		user_id = request.getParameter("user_id");
		list_id = request.getParameter("list_id");
		finish = Integer.parseInt(request.getParameter("finish_flag"));
		/*���ûظ���ʽ*/
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE"); 
		response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, client_id, uuid, Authorization"); 
		response.setContentType("application/json; charset=utf-8");
		PrintWriter out = response.getWriter();
		task_list = new Task_list();
		try {
			boolean result = task_list.finish_list(user_id, list_id, finish);
			if(result) {
				/*�޸ĳɹ�*/
				String jsonStr =  "{\"successfully\":\"001\"}";
				out.write(jsonStr);
				out.close();
			}else {
				/*�޸�ʧ��*/
				String jsonStr =  "{\"error\":\"0x777\"}";
				out.write(jsonStr);
				out.close();
			}
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
	}
}
