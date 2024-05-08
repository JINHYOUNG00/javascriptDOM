package com.yedam.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yedam.dao.EmpDAO;

@WebServlet("/getEmpList.do")
public class EmpListServ extends HttpServlet{
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=utf-8");
		EmpDAO edao = new EmpDAO();
		
		List<List<String>> empList = edao.empList2();
		
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		
		Map<String, Object> map= new HashMap<>();
		map.put("data", empList);
		String json = gson.toJson(map);
		resp.getWriter().print(json);
	}
}
