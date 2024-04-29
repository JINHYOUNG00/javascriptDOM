/*
* member.js
*/

// 추가 클릭이벤트 등록.
// 사용자의 입력값 3개 => tr > td * 3
let addBtn = document.querySelector('#addMember');


addBtn.addEventListener('click', function(){
let memberNo = document.querySelector('#memberNo').value;
let memberName = document.querySelector('#memberName').value;
let memberPoint = document.querySelector('#memberPoint').value;
const mem = {memberNo, memberName, memberPoint};
let tr = makeRow(mem);

	let tbody = document.querySelector('table#tlist tbody');
	tbody.appendChild(tr);
	
	
});
//member 정보를 활용 tr반환하는 함수

function makeRow(mem={memberNo, memberName, memberPoint}){
	//tr 생성
	let tr = document.createElement('tr');
	tr.addEventListener('click', function(){
	document.querySelector('#memberNo').value = 
										this.children[0].innerText;
	document.querySelector('#memberName').value = 
										this.children[1].innerText;
	document.querySelector('#memberPoint').value = 
										this.children[2].innerText;
//	console.log(tr);
 }, true);
	
	
	for (let p in mem){
		let td = document.createElement('td');
		td.innerText = mem[p];
		tr.appendChild(td);
	}
		let btntd = document.createElement('td');
		
		let removeBtn = document.createElement('button');
		removeBtn.innerText = "삭제";
		removeBtn.addEventListener('click', removeRow);
		btntd.appendChild(removeBtn);
		tr.appendChild(btntd);
		
		// 체크박스
		td = document.createElement('td');
		let chk = document.createElement('input');
		chk.setAttribute('type', 'checkbox');
		chk.addEventListener('change', changeRow);
		td.appendChild(chk);
		tr.appendChild(td);
	// <td><button>삭제</button></td>
	return tr;
}

function removeRow(e){
//	e.stopPropagation(); //상/하 위 요소로 이벤트 차단;
	console.log(e);
//	this.parentElement.remove();
	e.target.parentElement.parentElement.remove();
}

function changeRow(e){
	// this => <checkbox type="checkbox" checked>
	console.log(this.checked); // 체크박스일 경우
}

/*
document.querySelectorAll('tbody input[type="checkbox"]').forEach(function(item){
	item.checked=false;
})

*/

//members 배열의 갯수만큼 tr 생성
members.forEach(function(item, idx, arr){
	let tr = makeRow(item);
	let tbody = document.querySelector('table#tlist tbody');
	tbody.appendChild(tr);
});
/*
document.addEventListener(mousemove, function(e){
	console.log(e.pageX, e.pageY);
})
*/
//thead input[type="checkbox"]
document.querySelector('thead input[type="checkbox"]')
		.addEventListener('change', function(e){
			//thead => tbody
			let inp = this;
			document.querySelectorAll('tbody input[type="checkbox"]')
					.forEach((item) => { //화살표 함수
							item.checked = this.checked;
//							console.log(inp.checked);
							//console.log(item.checked);
		});
});





