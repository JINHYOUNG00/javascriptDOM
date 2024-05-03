/**
*portal.js
*/

const showTitles = ['id', 'centerName', 'address', 'sido', 'phoneNumber'];
let url = 'https://api.odcloud.kr/api/15077586/v1/centers?page=1&perPage=284&serviceKey=u%2FBuG3HiYl5DhWC1LCWcIPrDS8Q5zrRcHFXDby79sFxt9tO5CbXM5M0pW47fqv7PXj7jeWXow81ZuvHXrxVieg%3D%3D'
//링크정보 클릭하면 해당데이터 보여주는거
let totalData = [];

//api호출
fetch(url)
	.then((result) => result.json())
	.then(data => {
		console.log(data) //data가 배열
		//makeRow를 이용해서 페이지 만들기
		totalData = data.data; //집에서 data.data찍어보기 /totalData:284건
		/*data.data.forEach(center => { //홈페이지에서 전체 내용 가져오는 애
			let tr = makeRow(center);
			document.querySelector('#list').appendChild(tr); //tbody의 id:list
		})*/
		showPaging(1); //1page를 보고싶어(데이터를 가져와야지 볼수있으니까 위로 땡겨)
		//pagingList(); //pagingList 보고싶어/pagingList를 아래에서 showPaging에 넣어줌
	})
	.catch(console.log);

//링크 클릭하면 페이지 호출
document.querySelectorAll('.pagination a').forEach(aTag => { //a태그 다 가져와/aTag이벤트 걸어
	//console.log(document.querySelectorAll('.pagingnation a')); //이거 못봤어ㅜ
	aTag.addEventListener('click', function(e){
		e.preventDefault(); //페이지 이동 차단
		let page = this.innerText; //this:a태그
		showPaging(page); 
	})
})
//pagingList :전체 건수를 기준으로 계산해서 페이지 리스트 만들기 (284건 29페이지)
let totalCnt = 284;
function pagingList(page = 1){ //현재페이지를 알고있어야함
	let pagination = document.querySelector('.pagination');
	pagination.innerHTML = ''; //이미 있는거 지워
	
	let endPage, startPage;
	let prev, next; //이전페이지 다음페이지
	let realEnd = Math.ceil(totalCnt / 10); //이게 실제 마지막 페이지:29page
	endPage = Math.ceil(page / 10) * 10; //(1/10) *10 = 10페이지 
	startPage = endPage - 9;
	endPage = endPage > realEnd ? realEnd : endPage; //실제 페이지는 29인데 30으로 나와서 
	next = endPage < realEnd ? true : false;
	prev = startPage > 1; 
	
	//aTag 생성, 이벤트 추가
	if(prev){ //이전페이지가 있으면
		let aTag = document.createElement('a');
		aTag.setAttribute('href', '#');
		aTag.setAttribute('data-page', startPage - 1); //시작페이지에서 이전페이지로 가려면 -1
		aTag.innerHTML = '&laquo;';
		aTag.addEventListener('click', function(e){ 
			let page = e.target.dataset.page; // dataset.page이라는 Attribute를 가져오겠다
			showPaging(page);
		})
		pagination.appendChild(aTag);
	}
	for(let n = startPage; n <= endPage; n++){ //a태그 만들어줄거야
		let aTag = document.createElement('a');
		aTag.setAttribute('href', '#');
		aTag.innerHTML = n;
		if(page == n){
			aTag.className = 'active'; //html에서 class 속성 지정
		}
		aTag.addEventListener('click', function(e){ //페이지 번호 클릭하면 이동하도록 이벤트 걸어
			let page = e.target.innerHTML; 
			showPaging(page);
		})
		pagination.appendChild(aTag);
	}//end of for
	if(next){ //이전페이지가 있으면
		let aTag = document.createElement('a');
		aTag.setAttribute('href', '#');
		aTag.setAttribute('data-page', endPage + 1); //시작페이지에서 이후페이지로 가려면 +1
		aTag.innerHTML = '&raquo;';
		aTag.addEventListener('click', function(e){ 
			let page = e.target.dataset.page; 
			showPaging(page);
		})
		pagination.appendChild(aTag);	
	}
}

//페이지정보를 넣어주면 페이지를 10개씩 출력해주는 기능
function showPaging(page = 1) { //idx값이 0부터 시작해서 9까지가 1page, 10 ~ 19:2page
	let startNo = (page - 1) * 10; //1-1*10=0
	let endNo = page * 10;
	let fAry = totalData.filter((center, idx) => { //filter다시 검색해보기(startNo와 endNo의 값을..)
		if (idx >= startNo && idx < endNo) {
			return true; //id가 1~10까지인거만 보여줘할수있음
		}
	})
	//목록 삭제
	document.querySelector('#list').innerHTML = ''; //목록 한번 지워줘
	fAry.forEach(center => { 
		let tr = makeRow(center);
		document.querySelector('#list').appendChild(tr); //tbody의 id:list
	})
	console.log(fAry);
	pagingList(page); //페이지 목록 생성
}

//데이터 한 건 (센터정보) tr 함수 만들기
function makeRow(center = {}) { //데이터 한 건 들어오면 기능하게끔
	//한 건에 대한 처리
	let tr = document.createElement('tr');
	tr.addEventListener('click', function(e){ //테이블에서 tr을 클릭하면 그 지도로 이동하게끔 하는 거/url로 넘기는 수 밖에
		window.open('kakao.html?name=' + center.centerName + '&x=' + center.lat + '&y=' + center.lng); //새 창 띄어줌(url주소창에 위도 경도 값 넣어주기)
	})
	showTitles.forEach(title => { //<tr><td>id</td><td>centerName</td><td>address</td><td>sido</td><td>phoneNumber</td></tr>
		let td = document.createElement('td');
		let name = center[title];
		td.innerHTML = (name + '').replace('코로나19 ', ''); //center[title]가 이름인데 거기서 코로나19 를 다 빼려고(문자열일때만 replace쓸수있대)
		tr.appendChild(td);
	});
	return tr;
} //end of makeRow 

