package com.yedam.dao;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.yedam.common.DAO;

public class EmpDAO extends DAO{
	public List<Map<String, Object>> empList(){
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		
		conn();
		try {
			psmt = conn.prepareStatement("select * from emp");
			rs = psmt.executeQuery();
			
			while(rs.next()) {
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
}
