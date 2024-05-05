/**
 * empService.js => 목록 추가 수정 삭제 기능 객체
 */

const svc = {
	// 목록.
	empList: function(successCall, errorCall) {
		fetch('../empJson.json')
			.then(result => result.json())
			.then(successCall)
			.catch(errorCall);
	},
	// 등록
	addEmp: function(param = {}, successCall, errorCall) {
		fetch('../empsave.json', {
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			body: `job=add&name=${param.name}&phone=${param.phone}&email=${param.mail}&salary=${param.salary}&hire=${param.hire}`
		})
			.then(result => result.json())
			.then(successCall)
			.catch(errorCall);
	},

	// 수정
	editEmp(param = {}, successCall, errorCall) {
		fetch('../empsave.json', {
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			body: `job=edit&empNo=${param.empNo}&salary=${param.salary}&email=${param.mail}`
		})
			.then(result => result.json())
			.then(successCall)
			.catch(errorCall);
	},
	// 삭제
	deleteEmp: function(param = {}, successCall, errorCall) {
		fetch(`../empsave.json`, {
			method: 'post',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
			body: `job=${param.job}&empNo=${param.empNo}`
		})
			.then(result => result.json()) // 리턴을 해줘야 다음 처리에서 사용가능
			.then(successCall)
			.catch(errorCall);
	}
};











