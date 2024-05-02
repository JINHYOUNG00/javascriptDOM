/**
 * ajax1.js
 */

const xhtp = new XMLHttpRequest();
xhtp.open('get', '../empJson.json'); // 호출할 페이지 지정.
xhtp.send(); // 호출
xhtp.onload = function() {
	console.log(xhtp.responseText);
	let data = JSON.parse(xhtp.responseText);
	console.log(data);
}