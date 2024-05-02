package com.yedam.vo;

import lombok.Data;

// lombok: 이클립스 설치, 라이브러리 필요.
@Data
public class EmpVO {
	private int empNo;
	private String empName;
	private String empPhone;
	private String email;
	private String hireDate;
	private int salary;
//	private String dept;
	
	
}
