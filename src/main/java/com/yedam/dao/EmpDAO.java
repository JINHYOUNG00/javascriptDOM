package com.yedam.dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.yedam.common.DAO;
import com.yedam.vo.EmpVO;

public class EmpDAO extends DAO {

	public List<Map<String, Object>> empList() {
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();

		conn();
		try {
			psmt = conn.prepareStatement("select * from emp");
			rs = psmt.executeQuery();

			while (rs.next()) {
				Map<String, Object> map = new HashMap<>();
				map.put("사원번호", rs.getInt("emp_no"));
				map.put("사원이름", rs.getString("emp_name"));
				map.put("사원연락처", rs.getString("emp_phone"));
				map.put("사원이메일", rs.getString("email"));

				list.add(map);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disCon();
		}

		return list;
	}

	// 목록 List<EmpVO> selectList();
	public List<EmpVO> selectList() {
		conn();
		List<EmpVO> list = new ArrayList<>();
		String sql = "select * from emp order by emp_no";

		try {
			psmt = conn.prepareStatement(sql);
			rs = psmt.executeQuery();

			while (rs.next()) {
				EmpVO emp = new EmpVO();
				emp.setEmpNo(rs.getInt("emp_no"));
				emp.setEmpName(rs.getString("emp_name"));
				emp.setEmpPhone(rs.getString("emp_phone"));
				emp.setEmail(rs.getString("email"));
				emp.setHireDate(rs.getString("hire_date"));
				emp.setSalary(rs.getInt("salary"));

				list.add(emp);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disCon();
		}

		return list;
	}
	
	public EmpVO selectEmp(int empNo) {
		conn();
		String sql = "select * from emp where emp_no = ? order by emp_no";

		try {
			psmt = conn.prepareStatement(sql);
			psmt.setInt(1, empNo);
			
			rs = psmt.executeQuery();

			if (rs.next()) {
				EmpVO emp = new EmpVO();
				emp.setEmpNo(rs.getInt("emp_no"));
				emp.setEmpName(rs.getString("emp_name"));
				emp.setEmpPhone(rs.getString("emp_phone"));
				emp.setEmail(rs.getString("email"));
				emp.setHireDate(rs.getString("hire_date"));
				emp.setSalary(rs.getInt("salary"));
				
				return emp;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disCon();
		}
		return null;
	}

	// 등록 boolean insertEmp(EmpVO emp);
	public boolean insertEmp(EmpVO emp) {
		conn();
		String sql = "insert into emp(emp_no, emp_name, emp_phone, email, salary) "
				+ "		values (?,?,?,?,?)";
		String seqSql = "select emp_no_seq.nextval from dual";
//		int seq = 0;
		try {
			psmt = conn.prepareStatement(seqSql);
			rs = psmt.executeQuery();
			if(rs.next()) {
				int seq = rs.getInt(1);
				emp.setEmpNo(seq); // 매개변수 evo에 empNo 저장
			}
			
			psmt = conn.prepareStatement(sql);
			psmt.setInt(1, emp.getEmpNo());
			psmt.setString(2, emp.getEmpName());
			psmt.setString(3, emp.getEmpPhone());
			psmt.setString(4, emp.getEmail());
			psmt.setInt(5, emp.getSalary());

			int r = psmt.executeUpdate();

			if (r > 0) {
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disCon();
		}
		return false;
	}

	// 수정 boolean updateEmp(EmpVO emp); //이메일, 급여 변경.
	public boolean updateEmp(EmpVO emp) {
		conn();
		String sql = "update emp set email = ?, salary = ? where emp_no = ?";
		try {
			psmt = conn.prepareStatement(sql);
			psmt.setString(1, emp.getEmail());
			psmt.setInt(2, emp.getSalary());
			psmt.setInt(3, emp.getEmpNo());
			int r = psmt.executeUpdate();

			if (r > 0) {
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disCon();
		}
		return false;
	}

	// 삭제 boolean deleteEmp(int empNo)
	public boolean deleteEmp(int empNo) {
		conn();
		String sql = "delete emp where emp_no = ?";
		try {
			psmt = conn.prepareStatement(sql);
			psmt.setInt(1, empNo);
			int r = psmt.executeUpdate();

			if (r > 0) {
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disCon();
		}
		return false;
	}
	
	// 부서별 인원 현황. {부서: 인원 현황}
	public Map<String, Integer> getCntperDept(){
		conn();
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		String sql = "select d.department_name,\r\n"
				+ "            count(1) as cnt\r\n"
				+ "from hr.employees e\r\n"
				+ "join hr.departments d\r\n"
				+ "on e.department_id = d.department_id\r\n"
				+ "group by d.department_name";
		
		try {
			psmt = conn.prepareStatement(sql);
			rs = psmt.executeQuery();

			while (rs.next()) {
				map.put(rs.getString("department_name"), rs.getInt("cnt"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disCon();
		}
		return map;
	}
	
	public List<List<String>> empList2() {

		conn();
		List<List<String>> list1 = new ArrayList<>();
		try {
			psmt = conn.prepareStatement("select employee_id, first_name, email, phone_number, salary\r\n"
					+ "from employees");
			rs = psmt.executeQuery();
			
			while (rs.next()) {
				List<String> list2 = new ArrayList<>();
				list2.add(rs.getString("employee_id"));
				list2.add(rs.getString("first_name"));
				list2.add(rs.getString("phone_number"));
				list2.add(rs.getString("email"));
				list2.add(rs.getString("salary"));
				list1.add(list2);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disCon();
		}

		return list1;
	}
	
	// jsp.employees 테이블 사원번호값을 찾아서 한건 삭제 
	public boolean deleteEmp2(int empId) {
		conn();
		String sql = "delete employees where employee_id = ?";
		try {
			psmt = conn.prepareStatement(sql);
			psmt.setInt(1, empId);
			int r = psmt.executeUpdate();

			if (r > 0) {
				return true;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			disCon();
		}
		return false;
	}
	
}
