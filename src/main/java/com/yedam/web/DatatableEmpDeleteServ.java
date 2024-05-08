package com.yedam.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.dao.EmpDAO;

@WebServlet("/empdelete.do")
public class DatatableEmpDeleteServ extends HttpServlet{
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/json;charset=utf-8");
		String eno = req.getParameter("empId");
		System.out.println(eno); // 103 넘어감
		EmpDAO edao = new EmpDAO();
		if (edao.deleteEmp2(Integer.parseInt(eno))) {
			// {"retCode" : "OK"}
			resp.getWriter().print("{\"retCode\" : \"OK\"}");
			
		} else {
			// {"retCode" : "NG"}
			resp.getWriter().print("{\"retCode\" : \"NG\"}");
		}
	}
}
