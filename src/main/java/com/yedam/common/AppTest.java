package com.yedam.common;

import java.util.List;

import com.yedam.dao.EmpDAO;
import com.yedam.vo.EmpVO;

public class AppTest {
	public static void main(String[] args) {
		EmpDAO edao = new EmpDAO();
		List<EmpVO> list = edao.selectList();
		for (EmpVO vo : list) {
			System.out.println(vo.toString());
		}
		
		EmpVO emp = new EmpVO();
		emp.setEmail("lee@navar.com");
		emp.setEmpName("이길동");
		emp.setEmpPhone("010-333-3333");
		emp.setHireDate("19990330");
		emp.setSalary(8000);
		if(edao.insertEmp(emp)) {
			System.out.println("처리성공");
		} else {
			System.out.println("예외발생");
		}
//		emp.setEmpNo(2);
//		if(edao.updateEmp(emp)) {
//			System.out.println("처리성공");
//		} else {
//			System.out.println("예외발생");
//		}
//		if(edao.deleteEmp(10)) {
//			System.out.println("처리성공");
//		} else {
//			System.out.println("예외발생");
//		}
		
		
		
		
		
		
		
	}
}
