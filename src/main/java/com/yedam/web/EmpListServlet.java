package com.yedam.web;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.dao.EmpDAO;

/**
 * 웹 프로그램 -> url실행 -> servlet(java)
 * init(최초실행) -> service(실행) -> destroy(종료시)
 * 제어의 역전.
 */

@WebServlet("/empList.action")
public class EmpListServlet extends HttpServlet{
	
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// web browser에 출력
		// 출력하는 컨텐트 타입.
		resp.setContentType("text/html;charset=utf-8");
		PrintWriter out = resp.getWriter(); // 출력스트림. 
		
		EmpDAO edao = new EmpDAO();
		List<Map<String, Object>> list = edao.empList();
		for (Map<String, Object> map : list) {
			System.out.println("---------------------");
			System.out.println("사원번호: " + map.get("사원번호") + ", 사원명: " + map.get("사원이름"));
			
			out.print("<p>사원번호:" + map.get("사원번호") + "</p>");
		}
		
	}
	
}
