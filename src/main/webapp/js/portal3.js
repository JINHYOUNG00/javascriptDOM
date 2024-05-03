/**
 * portal.js
 */

const showTitles = ['id', 'centerName', 'address', 'sido', 'phoneNumber'];
let url = 'https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=k7RfROiNLFEId95154daEWIESV9T6ldVFAlihqXIr4%2FgfNxX5FVQA5TsFzftl4qcaFCQdbkEa5vPqSNPBAvjJw%3D%3D'
let totalData= [];

//서버에서 데이터 가져오기 위한. api 호출
fetch(url)
   .then(result => result.json())
   .then(data => {
      console.log(data)
      totalData = data.data;
      /*data.data.forEach(center => {
         let tr = makeRow(center);
         document.querySelector('#list').appendChild(tr);
      })*/
      showPaging(12);
   })
   .catch(err => console.log(err));
   
// 링크 클릭하면 페이지 호출
document.querySelectorAll('.pagination a').forEach(aTag => {
   console.log(aTag);
   aTag.addEventListener('click', function(e) {
      e.preventDefault(); // a 페이지 차단.
      let page = this.innerText; //this는 aTag
      showPaging(page);
   })
})

// pagingList : 전체건수를 계산해서 284건 29페이지. 현재페이지를 포함하고잇는 5개만 보이게
let totalCnt = 284;
function pagingList(page = 1){
   let pagination = document.querySelector('.pagination');
   pagination.innerHTML = null;
   
   let endPage, startPage;
   let prev, next;
   let realEnd = Math.ceil(totalCnt / 10);
   endPage = Math.ceil(page/10)*10;
   startPage = endPage -9;
   endPage = endPage > realEnd ? realEnd : endPage;
   next = endPage < realEnd ? true : false;
   prev = startPage > 1;
   
   if(prev){
      let aTag = document.createElement('a');
      aTag.setAttribute('href', '#');
      aTag.setAttribute('data-page', startPage-1);
      aTag.innerHTML = '&laquo';
      aTag.addEventListener('click', function(e){
         let page = e.target.dataset.page; // target은 이벤트를 받는 대상
         showPaging(page);
      })
      pagination.appendChild(aTag);
   }
   
   
   
   //aTag 생성, 이벤트 추가.
   for(let n = startPage; n<=endPage; n++){
      let aTag = document.createElement('a');
      aTag.setAttribute('href', '#');
      aTag.innerHTML = n;
      if(page == n) {
         aTag.className = 'active';
      }
      aTag.addEventListener('click', function(e){
         let page = e.target.innerText; // target은 이벤트를 받는 대상
         showPaging(page);
      })
      pagination.appendChild(aTag);
   }
    if(next){
      let aTag = document.createElement('a');
      aTag.setAttribute('href', '#');
      aTag.setAttribute('data-page', endPage+1);
      aTag.innerHTML = '&raquo';
      aTag.addEventListener('click', function(e){
         let page = e.target.dataset.page; // target은 이벤트를 받는 대상
         showPaging(page);
      })
      pagination.appendChild(aTag);
   }
}


//데이터(센터) tr 함수.
//페이지 -> 10개씩 출력. https://www.w3schools.com/css/css3_pagination.asp#
function showPaging(page = 1) { // 0 ~ 9
   let startNo = (page - 1) * 10;
   let endNo = page * 10;
   let fAry = totalData.filter((center, idx) => {
      if(idx >= startNo && idx < endNo ){   
         return true;
      }
   })
   document.querySelector('#list').innerHTML = null;
   fAry.forEach(center => {
         let tr = makeRow(center);
         document.querySelector('#list').appendChild(tr);
   })
   pagingList(page);
   console.log(fAry);
}

function makeRow(center = {}){
   let tr = document.createElement('tr');
   tr.addEventListener('click', function(e){
//		window.open(`kakao.html?x=${center.lat}&y=${center.lng}`);
		window.open('kakao.html?x=' + center.lat + '&y=' + center.lng);
   })
   showTitles.forEach(title => {
      let td = document.createElement('td');
      let name = center[title];
      td.innerHTML = (name +'').replace('코로나19', '');
      tr.appendChild(td);
   })
   return tr;
}




//const showTitle = ['id', 'centerName', 'address', 'sido', 'phoneNumber'];
//
//// Request URL 복붙
//let url = 'https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=Yxpny4k%2F41HT5sf45J4fX14dAYr96pMy%2FmfwcZjtat5%2BnUMzLrOAaeF3gnw1mvAqiq9XTjgKXWg%2B9WLXHmkqxA%3D%3D';
//let totalData = [];
//
////api 호출
//fetch(url)
//	.then(result => result.json())
//	.then(data => {
//		console.log(data)
//		console.log(data.data);
//		totalData = data.data;
//		//		data.data.forEach(center => {
//		//			let tr = makeRow(center);
//		//			
//		//			document.querySelector('#list').appendChild(tr);
//		//		})
//		showPaging(12);
//
//	})
//	.catch(err => console.log(err));
//
//
//// 링크 클릭하면 페이지 호출
//document.querySelectorAll('.pagination a').forEach((aTag) => {
//	console.log(aTag);
//	aTag.addEventListener('click', function(e) {
//		e.preventDefault(); // a태그의 기본기능인 페이지이동 기능 차단
//		let page = this.innerText;
//		showPaging(page);
//	})
//})
//
//// pagingList: 전체 건수를 기준으로 계산해서 284건 29페이지.
//// 현재 페이지를 매개변수로 받음
//let totalCnt = 284;
//function pagingList(page = 1) {
//	let pagination = document.querySelector('.pagination');
//	pagination.innerHTML = '';
//
//	let endPage, startPage;
//	let prev, next;
//	let realEnd = Math.ceil(totalCnt / 10); //29p
//	endPage = Math.ceil(page / 10) * 10; //
//	startPage = endPage - 9;
//	next = endPage < realEnd ? true : false;
//	prev = startPage > 1;
//
//	// aTag 생성, 이벤트 추가
//	if (prev) {
//		let aTag = document.createElement('a');
//		aTag.setAttribute('href', '#');
//		aTag.innerHTML = '&laquo;';
//		aTag.addEventListener('click', function(e) {
//			let page = e.target.innerHTML;
//			showPaging(page);
//		})
//	}
//	for (let n = startPage; n <= endPage; n++) {
//		let aTag = document.createElement('a');
//		aTag.setAttribute('href', '#');
//		aTag.innerHTML = n;
//		if (page == n) {
//			aTag.className = 'active'; // 
//		}
//		aTag.addEventListener('click', function(e) {
//			let page = e.target.innerHTML;
//			showPaging(page);
//		})
//		pagination.appendChild(aTag);
//	}
//}
//
//// 페이지 -> 10개씩 출력
//function showPaging(page = 1) {
//	let startNo = (page - 1) * 10;
//	let endNo = (page * 10);
//	let fAry = totalData.filter((center, idx) => {
//		if (idx >= startNo && idx < endNo) {
//			return true;
//		}
//	})
//	// 목록삭제
//	document.querySelector('#list').innerHTML = '';
//
//	console.log(fAry);
//	fAry.forEach(center => {
//		let tr = makeRow(center);
//
//		document.querySelector('#list').appendChild(tr);
//	})
//	pagingList(page);
//}
//
///*
//function makeRow(ary = []) {
//	let template = "";
//	ary.forEach((emp) => {
//		template += `<tr>`
//		showTitle.forEach((val) => {
//			template += `<td> ${emp[val]} </td>`;
//		});
//		template += `</tr>`;
//	});
//	// tbody의 innerHtml에 template를 넣음
//	document.querySelector('tbody').innerHTML = template;
//}*/
//
//
//
////데이터(센터) tr 함수
//function makeRow(center = {}) {
//	//한건에 대한 처리.
//	let tr = document.createElement('tr');
//	showTitle.forEach(title => {
//		let td = document.createElement('td');
//		let name = center[title] + '';
//		td.innerHTML = name.replace('코로나19', '');
//		tr.appendChild(td);
//	}) // end of profs.forEach();
//
//
//	let td = document.createElement('td');
//	tr.appendChild(td);
//	return tr;
//
//}; // end of makeRow();