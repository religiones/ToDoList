package com.ToDoList.model;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.ToDoList.entity.userinfo;

public class User {
	private userinfo user = new userinfo();
	private Database myData = null;
	private String DataName = "jdbc:mysql://localhost:3306/ToDoList?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT";
	private String UserName = "�Լ������ݿ��û���";
	private String PassWord = "�Լ�������";
	
	public userinfo getUser(String id,String name) throws ClassNotFoundException, SQLException {
		myData = new Database(DataName, UserName, PassWord);
		myData.DatabaseConnection();
		String sql_search = "select * from userinfo where yiban_id = "+id;
		String sql_insert = "insert into userinfo (yiban_id,user_name) values ("+id+","+name+")";
		ResultSet res = myData.Search(sql_search);
		if(res == null) {
			/*�û�������,��������*/
			boolean flag = myData.Database_works(sql_insert);
			if(flag) {
				user.Setyiban_id(id);
				user.Setuser_name(name);
			}else {
				return null;
			}
		}else {
			/*���ڸ��û�*/
			while(res.next()) {
				user.Setyiban_id(res.getString("yiban_id"));
				user.Setuser_name(res.getString("user_name"));
			}
		}
		return user;
	}
}
