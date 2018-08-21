package com.ToDoList.model;
import java.sql.ResultSet;
import java.sql.SQLException;
import com.ToDoList.entity.userinfo;

public class User {
	private userinfo user = null;
	private Database myData = null;
	private String DataName = "jdbc:mysql://localhost:3306/ToDoList?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=GMT";
	private String UserName = "���ݿ��û���";
	private String PassWord = "���ݿ�����";
	
	public userinfo getUser(String id,String name) throws ClassNotFoundException, SQLException {
		myData = new Database(DataName, UserName, PassWord);
		myData.DatabaseConnection();
		String sql_search = "select * from userinfo where yiban_id = "+id;
		String sql_insert = "insert into userinfo (yiban_id,user_name) values ("+id+","+name+")";
		ResultSet res = myData.Search(sql_search);
		user = new userinfo();
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
		myData.closeAll();
		return user;
	}
	
	/*�޸��û���Ϣ*/
	public boolean update_user(String user_id,String user_name,String user_nickname,String user_sex) throws ClassNotFoundException, SQLException {
		myData = new Database(DataName, UserName, PassWord);
		myData.DatabaseConnection();
		
		user = new userinfo();
		user.Setuser_name(user_name);
		user.Setuser_nickname(user_nickname);
		user.Setuser_sex(user_sex);
		String sql_update = "update userinfo set user_name='"+user.Getuser_name()+"',user_nickname='"+user.Getuser_nickname()+"',user_sex='"+user.Getuser_sex()+"'where yiban_id="+user_id;
		boolean flag = myData.Database_works(sql_update);
		myData.closeAll();
		return flag;
	}
}
