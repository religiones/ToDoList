package com.ToDoList.control;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.ToDoList.model.Get_Task;

public class tasks extends HttpServlet{
	private static final long serialVersionUID = 1L;
	private String id = null;
	private Get_Task myTask = null;
	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		this.doPost(request, response);
	}
	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {	
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE"); 
		response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, client_id, uuid, Authorization"); 
		response.setContentType("application/json; charset=utf-8");
		PrintWriter out = response.getWriter();
		
		id = request.getParameter("id");
		try {
			myTask = new Get_Task();
			String josnStr = myTask.GetTasks(id);
			out.write(josnStr);
		} catch (ClassNotFoundException | SQLException e) {
			// TODO Auto-generated catch block
			String jsonStr =  "{\"error\":\"0x777\"}";
			out.write(jsonStr);
			e.printStackTrace();
		}
		out.close();
	}
}
