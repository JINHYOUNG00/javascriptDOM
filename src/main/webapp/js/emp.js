/**
 * emp.js
 */

// 페이지가 로딩되면 initForm 함수 실행
document.addEventListener("DOMContentLoaded", initForm);

// 화면 로딩 후 처음으로 실행할 함수.
function initForm() {
	// Ajax 호출
	const xhtp = new XMLHttpRequest();
	xhtp.open('get', '../empJson.json');
	xhtp.send();
	xhtp.onload = function() {
		console.log(xhtp.responseText);
		let data = JSON.parse(xhtp.responseText);
		console.log(data);

		data.forEach(emp => {
			let tr = makeRow(emp);
			document.querySelector('#elist').appendChild(tr);
		})
	}

	// 등록 버튼 이벤트.
	document.querySelector('#addBtn')
		.addEventListener('click', addRow);

}
function addRow() {
	// Ajax 호출
	const addHtp = new XMLHttpRequest();
	// 사원이름(ename), 연락처(phone), 급여(salary), 입사일자(hire), 이메일(email)
	let ename = document.querySelector('#ename').value;
	let ephone = document.querySelector('#ephone').value;
	let email = document.querySelector('#email').value;
	let edate = document.querySelector('#edate').value;
	let esal = document.querySelector('#esal').value;
	let param = `../empsave.json?job=add&name=${ename}&phone=${ephone}&email=${email}&salary=${esal}&hire=${edate}`;
	addHtp.open('get', param);
	addHtp.send();
	addHtp.onload = function(){
		let result = JSON.parse(addHtp.responseText);
		console.log(result);
		if(result.retCode == 'OK'){
			let tr = makeRow(result.retVal);
			document.querySelector('#elist').appendChild(tr);
		}
	}
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

// 화면수정함수
function modifyRow(){
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

// 버튼 클릭시 수정 이벤트 핸들러
function updateRow(){
	let oldTr = this.parentElement.parentElement;
	let empNo = this.parentElement.parentElement.dataset.no; //data-no => dataset.no
	let email = this.parentElement.parentElement.children[2].children[0].value;
	let salary = this.parentElement.parentElement.children[3].children[0].value;
	
	console.log(empNo, email, salary);
	const editHtp = new XMLHttpRequest();
	editHtp.open('get', `../empsave.json?job=edit&empNo=${empNo}&salary=${salary}&email=${email}`);
	editHtp.send();
	editHtp.onload = function(){
		let result = JSON.parse(editHtp.responseText); //retCode:OK
		if (result.retCode == 'OK') {
			console.log(result);
			let newTr = makeRow(result.retVal);
			oldTr.parentElement.replaceChild(newTr, oldTr);
		} else if (result.retCode == 'NG') {
			alert('처리중 에러 발생');
		}
	}
}

function deleteRow() {
	const delNo = this.parentElement.parentElement.children[0].innerText;
	let tr = this.parentElement.parentElement;
	console.log(delNo);
	const delHtp = new XMLHttpRequest();
	delHtp.open('get', `../empsave.json?job=delete&empNo=${delNo}`);
	delHtp.send();
	delHtp.onload = function() {
		let result = JSON.parse(delHtp.responseText); //retCode:OK
		if (result.retCode == 'OK') {
			tr.remove();
		} else if (result.retCode == 'NG') {
			alert('처리중 에러 발생');
		}
	}
} // end of deleteRow();


//function makeList2(emp = {}) {
//	let template = "";
//	let props = ['empNo', 'empName', 'email', 'salary'];
//	emp.forEach((ele) => {
//		template += `<tr>`
//		props.forEach((val) => {
//			template += `<td> ${ele[val]} </td>`;
//		});
//		template += `</tr>`;
//	});
//	// tbody의 innerHtml에 template를 넣음
//	document.querySelector('tbody').innerHTML = template;
//}
//makeList2(empList);