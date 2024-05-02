package com.yedam.web;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yedam.dao.EmpDAO;
import com.yedam.vo.EmpVO;

@WebServlet("/empsave.json")
public class EmpJson extends HttpServlet{
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 추가(add), 수정(edit), 삭제(delete)
		
		resp.setContentType("text/json;charset=utf-8");
		String eno = req.getParameter("empNo");
		String job = req.getParameter("job");
		EmpDAO edao = new EmpDAO();
		EmpVO emp = new EmpVO();
		Map<String, Object> map = new HashMap<>();
		Gson gson = new GsonBuilder().create();
		
		// 추가기능(empName, empPhone, email, salary)
		if(job.equals("add")) {
			emp.setEmpName(req.getParameter("name"));
			emp.setEmpPhone(req.getParameter("phone"));
			emp.setEmail(req.getParameter("email"));
			emp.setSalary(Integer.parseInt(req.getParameter("salary")));

	
			if (edao.insertEmp(emp)) {
				// {"retCode" : "OK"}
				map.put("retCode", "OK");
				map.put("retVal", emp);
//				System.out.println(emp.toString());
				resp.getWriter().print(gson.toJson(map));
			} else {
				// {"retCode" : "NG"}
				map.put("retCode", "NG");
				map.put("retVal", null);
				resp.getWriter().print(gson.toJson(map));
			}
		} else if (job.equals("edit")) {
			emp.setEmpNo(Integer.parseInt(req.getParameter("empNo")));
			emp.setEmail(req.getParameter("email"));
			emp.setSalary(Integer.parseInt(req.getParameter("salary")));
			
			
			if (edao.updateEmp(emp)) {
				emp = edao.selectEmp(emp.getEmpNo()); // empName을 가져오기위함
				map.put("retCode", "OK");
				map.put("retVal", emp);
			} else {
				// {"retCode" : "NG"}
				map.put("retCode", "NG");
				map.put("retVal", null);
				resp.getWriter().print(gson.toJson(map));
			}
			resp.getWriter().print(gson.toJson(map));
			
		// 삭제기능(사원번호 emp.html에서 파라미터 수신)
		} else if (job.equals("delete")) {
			if (edao.deleteEmp(Integer.parseInt(eno))) {
				// {"retCode" : "OK"}
				resp.getWriter().print("{\"retCode\" : \"OK\"}");
			} else {
				// {"retCode" : "NG"}
				resp.getWriter().print("{\"retCode\" : \"NG\"}");
			}
		}
		
		
		
		
	}
}
