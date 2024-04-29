/*
* data.js
*/

const members = [
	{memNo: 1001, memName: '홍길동', memPnt:90},
	{memNo: 1002, memName: '김길동', memPnt:100},
	{memNo: 1003, memName: '이길동', memPnt:95},
];


// 배열 for
// for(let mem of members){}

//forEach 메소드
// 배열의 길이만큼 함수를 실행
// a = 배열의 요소, b = 인덱스 값, c = 배열 자체를 나타냄
members.forEach(function(item, idx, arr){
	
	if(item.memPnt >= 95){
//		console.log(item, idx, arr);
	}
});