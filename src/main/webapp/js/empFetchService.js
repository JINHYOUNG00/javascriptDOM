/**
 * empFetch.js
 * Ajax기능을 fetch함수 활용
 * empSvc 객체에 기능을 구현. 메소드를 호출. 
 */

document.addEventListener("DOMContentLoaded", initForm);

// 화살표 함수 사용 리팩토링
function initForm() {
	// Ajax 호출.
	svc.empList(
		result => {
			result.forEach(emp => {
				let tr = makeRow(emp);
				document.querySelector('#elist').appendChild(tr);
			})
		}, // successCall
		err => console.log(err) // errorCall
	);
	//등록 이벤트.
	document.querySelector('#addBtn')
		.addEventListener('click', addRow);

} // end of initForm

function addRow() {
	// 사원이름(ename), 연락처(phone), 급여(salary), 입사일자(hire), 이메일(email)
	//	let param = `job=add&name=${ename}&phone=${ephone}&email=${email}&salary=${esal}&hire=${edate}`;
	let paramObj = {
		job: 'add',
		name: document.querySelector('#ename').value,
		phone: document.querySelector('#ephone').value,
		salary: document.querySelector('#email').value,
		hire: document.querySelector('#edate').value,
		mail: document.querySelector('#esal').value
	}
	svc.addEmp(paramObj,
		data => {
			if (data.retCode == 'OK') {
				let tr = makeRow(data.retVal);
				document.querySelector('#elist').appendChild(tr);
			}
		},
		err => console.log(err)
	);
	fetch('../empsave.json', {
		method: 'post',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: param
	})
		.then(result => result.json())
		.then(data => {
			if (data.retCode == 'OK') {
				let tr = makeRow(data.retVal);
				document.querySelector('#elist').appendChild(tr);
			} else if (data.retCode == 'NG') {
				alert('처리중 에러 발생');
			} else {
				alert('에러 코드 확인');
			}
		})
		.catch(err => console.log(err));
}
function makeRow(emp = {}) {		// 배열을 매개변수로 하는 makeList 함수 생성
	let props = ['empNo', 'empName', 'email', 'salary'];
	//한건에 대한 처리.
	let tr = document.createElement('tr');
	tr.setAttribute('data-no', emp.empNo)
	tr.addEventListener('dblclick', modifyRow);
	props.forEach(prop => {
		let td = document.createElement('td');
		td.innerHTML = emp[prop];
		tr.appendChild(td);
	}) // end of profs.forEach();


	let td = document.createElement('td');
	let btn = document.createElement('button');
	btn.innerHTML = "삭제"
	btn.addEventListener('click', deleteRow);
	td.appendChild(btn);
	tr.appendChild(td);
	return tr;

}; // end of makeRow();

function modifyRow() {
	let originMail = this.children[2].innerText;
	let originSalary = this.children[3].innerText;
	let oldTr = this;
	let newTr = this.cloneNode(true); // 더블클릭한 tr 요소를 복제 매개변수로 true를 놓으면 하위요소도 같이 복제
	newTr.querySelector('td:nth-of-type(3)').innerHTML
		= `<input value=${originMail}>`
	newTr.querySelector('td:nth-of-type(4)').innerHTML
		= `<input value=${originSalary}>`
	newTr.querySelector('button').innerHTML
		= '수정';
	newTr.querySelector('button').addEventListener('click', updateRow);

	console.log(newTr);
	oldTr.parentElement.replaceChild(newTr, oldTr);
}

function updateRow() {

	let oldTr = this.parentElement.parentElement;
	let paramObj = {
		job: 'edit',
		empNo: this.parentElement.parentElement.dataset.no,
		salary: this.parentElement.parentElement.children[3].children[0].value,
		mail: this.parentElement.parentElement.children[2].children[0].value
	}
	svc.editEmp(paramObj,
		data => {
			if (data.retCode == 'OK') {
				console.log(data);
				let newTr = makeRow(data.retVal);
				oldTr.parentElement.replaceChild(newTr, oldTr);
			} else if (data.retCode == 'NG') {
				alert('처리중 에러 발생');
			}
		},
		err => console.log(err)
	);
}

// 삭제 이벤트
function deleteRow() {
	let tr = this.parentElement.parentElement;
	
	let paramObj = {
		job: 'delete',
		empNo: this.parentElement.parentElement.dataset.no,
	}
	svc.deleteEmp(paramObj,
		
	);
	fetch(`../empsave.json?job=delete&empNo=${delNo}`)
		.then(function(result) {
			return result.json(); // 리턴을 해줘야 다음 처리에서 사용가능
		})
		.then(function(data) {
			if (data.retCode == 'OK') {
				tr.remove();
			} else if (data.retCode == 'NG') {
				alert('처리중 에러 발생');
			} else {
				alert('에러 코드 확인');
			}
		})
		.catch(function(err) {
			console.log(err);
		})
}