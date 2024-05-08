package com.yedam.web;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yedam.dao.EmpDAO;

@WebServlet("/getcntPerDept.do")
public class EmpCntDeptServ extends HttpServlet{
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		EmpDAO edao = new EmpDAO();
		Map<String, Integer> resultMap = edao.getCntperDept();
		
		Gson gson = new GsonBuilder().create();
		
		String json = gson.toJson(resultMap);
		resp.getWriter().print(json);
	}
}
