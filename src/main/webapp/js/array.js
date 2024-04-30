/**
 * array.js
 */

const ary = []; // new Array();
ary.push('apple');
ary.push(['banana', 'cherry']);
ary.push({ name: "홍길동", age: 20 });

console.log(ary);

const fruits = [];
fruits.push({ name: "사과", price: 1000 });
fruits.push({ name: "수박", price: 5000 });
fruits.pop();
fruits.unshift({ name: "수박", price: 5000 });
fruits.shift();
fruits.push({ name: "수박", price: 5000 });
// [사과, 수박]

// splice 함수를 이용하면 배열 요소 추가 수정 삭제가 가능하다
// splice(시작인덱스, 수정, 추가할 갯수, 추가 or 수정 요소)
fruits.splice(1, 0, {name: '참외', price: 3000}); // splice 추가
fruits.splice(2, 1, {name: '참외', price: 3000}); // splice 수정
fruits.splice(1, 1); // splice 삭제

console.log(fruits);