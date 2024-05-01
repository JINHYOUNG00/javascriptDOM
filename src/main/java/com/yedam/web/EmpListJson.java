package com.yedam.web;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.dao.EmpDAO;

@WebServlet("/empList.json")
public class EmpListJson extends HttpServlet {
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) 
														throws ServletException, IOException {
		resp.setContentType("text/json;charset=utf-8");
		// {"name": "홍길동", "age": 20}
//		String json = "["
//				+ "{\"name\": \"홍길동\", \"age\": 20}, "
//				+ "{\"name\": \"박길동\", \"age\": 25}"
//				+ "]";
		
		EmpDAO edao = new EmpDAO();
		
		List<Map<String, Object>> list = edao.empList();
		
		String json = "[";
		int i = 0;
		for (Map<String, Object> map : list) {
			json += "{"
			+ "\"empNo\":" + map.get("사원번호") //
			+ ",\"empName\":\"" + map.get("사원이름") //
			+ "\",\"empPhone\":\"" + map.get("사원연락처") //
			+ "\",\"email\":\"" + map.get("사원이메일")
			+ "\" "
			+ "}";
			i++;
			if((i) != list.size()) {
				json += ",";
			}
		}
		json += "]";
		resp.getWriter().print(json);
		
	}
	
	
}
