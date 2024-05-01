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

//함수(배열)
function makeList(ary = []) {
//	let obj = { id: 1, first_name: '', last_name: '', email: '', gender: '', salary: '' }
	let props = ['id', 'first_name', 'email', 'salary', 'gender'];


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

makeList(empList);

let genderSelect = document.querySelector('#genderList');

genderSelect.addEventListener('change', changeGender);


function changeGender() {
	document.querySelector('tbody').innerHTML = null;
	let memberList = empList.filter((item, idx, ary) => {
		return item.gender == genderSelect.options[genderSelect.selectedIndex].value;
	});
	return makeList(memberList);
}

//console.log(changeGender());





