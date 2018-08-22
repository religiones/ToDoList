package com.ToDoList.control;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.ToDoList.model.SubTask;

public class deletesubtask extends HttpServlet{
	private static final long serialVersionUID = 1L;
	private String user_id = null;
	private String subtask_id = null;
	private SubTask subtask = null;
	
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		this.doPost(request, response);
	}
	
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		request.setCharacterEncoding("GBK"); //����ͳһ
		user_id = request.getParameter("id");
		subtask_id = request.getParameter("subtask_id");
		/*���ûظ���ʽ*/
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE"); 
		response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, client_id, uuid, Authorization"); 
		response.setContentType("application/json; charList=utf-8");
		PrintWriter out = response.getWriter();
		subtask = new SubTask();
		try {
			boolean result = subtask.delete_subtask(user_id,subtask_id);
			if(result) {
				/*ɾ���ɹ�*/
				String jsonStr =  "{\"successfully\":\"001\"}";
				out.write(jsonStr);
				out.close();
			}else {
				/*ɾ��ʧ��*/
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
