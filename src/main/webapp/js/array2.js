/*
* array2.js
*/

let genderAry = []; //gender를 종류별로 한가지만 담기
empList.forEach(emp => {
	// 루프돌면서 genderAry 배열에 empList의 gender 속성이 없으면
	if (genderAry.indexOf(emp.gender) == -1) {
		// genderAry 배열에 그 gender를 담아라.
		genderAry.push(emp.gender);
	}
});

genderAry.forEach(gender => {
	// option 태그 생성하고 그 변수명을 opt로 선언
	let opt = document.createElement('option');
	// <option> genderAry[i] </option>
	opt.innerHTML = gender;
	// <select id="genderList"> <option> genderAry[i] </option> </select> 
	document.querySelector('#genderList').append(opt);
});

//함수(배열)을 이용한 table 만들기
function makeList(ary = []) {		// 배열을 매개변수로 하는 makeList 함수 생성
	//	let obj = { id: 1, first_name: '', last_name: '', email: '', gender: '', salary: '' }
	let props = ['id', 'first_name', 'email', 'salary'];
	document.querySelector('#show tbody').innerHTML = null;

	ary.forEach(emp => {

		//한건에 대한 처리.
		let tr = document.createElement('tr');
		props.forEach(prop => {
			let td = document.createElement('td');
			td.innerHTML = emp[prop];
			tr.appendChild(td);
		}) // end of profs.forEach();
		document.querySelector('#show tbody').appendChild(tr);

	}); // end of ary.forEach();
}; // end of makeList();
//makeList(empList);

// innerHtml을 이용한 table 만들기
function makeList2(ary = []) {
	let template = "";
	let props = ['id', 'first_name', 'email', 'salary'];
	ary.forEach((emp) => {
		template += `<tr>`
		props.forEach((val) => {
			template += `<td> ${emp[val]} </td>`;
		});
		template += `</tr>`;
	});
	// tbody의 innerHtml에 template를 넣음
	document.querySelector('tbody').innerHTML = template;
}
makeList2(empList);




// select 토글 시 테이블 변경 

let genderSelect = document.querySelector('#genderList');
genderSelect.addEventListener('change', changeGender2);
// filter() 사용시
function changeGender1() {
//	document.querySelector('tbody').innerHTML = null;
	let memberList = empList.filter((item) => {
		return item.gender == genderSelect.options[genderSelect.selectedIndex].value;
	});
	makeList2(memberList);
}
// filter() 미사용시
function changeGender2() {
//	document.querySelector('tbody').innerHTML = null;
	let newList = [];
	for (let i = 0; i < empList.length; i++) {
		if (empList[i].gender == genderSelect.options[genderSelect.selectedIndex].value) {
			newList.push(empList[i]);
		}
	}
	makeList(newList);
}








