/**
 * ajax.js (Asynchronous JavaScript and XML) 비동기처리
 */
  // 동기처리
// setTimeout(function(){
//	console.log("step 1");
//	 setTimeout(function() {
//		 console.log("step 2");
//		 setTimeout(function() {
//			 console.log("step 3");
//		 }, 2000)
//	 }, 3000)
// }, 1000)

 // 비동기 처리
 setTimeout(function(){
	console.log("step 1");
 }, 1000)
 setTimeout(function(){
	console.log("step 2");
 }, 3000)
 setTimeout(function(){
	console.log("step 3");
 }, 2000)