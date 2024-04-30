/**
 *  array1.js
 */

empList.forEach((emp, idx) => {
	if (emp.first_name.indexOf("b") >= 0 || emp.last_name.indexOf("b") >= 0) {
		console.log(emp);
	}
});

// filter() => 주어진 조건을 만족하는 값을 가지고 새로운 배열을 만들어줌
let newAry = empList.filter((item, idx, ary) => {
	return item.gender == 'Male';
});
// filter return true시 배열 복사
let newAry2 = empList.filter((item, idx, ary) => {
	return true;
});
console.log(newAry);

let newAry3 = empList.filter((item) => {
	return item.first_name.length == 6;
});
console.log(newAry3);

// 배열의 마지막 요소
let newAry4 = empList.filter((item, idx, ary) => {
	return ary.length - 1 == idx
});

// map() => 새로운 객체로 담을수 있음
let newAry5 = empList.map((item, idx, ary) => {
	const obj = {
		no: item.id,
		name: item.first_name + "-" + item.last_name,
		email: item.email
	}
	return obj;
});
console.log(newAry5);
console.log("-----------------------")

let result = empList.reduce((acc, curVal) => {
	if (curVal.gender == 'Male') {
		acc.push(curVal);
	}
	return acc;
}, []);

console.log(result)

console.log("----------ddd-------------")

const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
//acc => 0, currentValue => 1
//acc => 1, currentValue => 2
//acc => 3, currentValue => 3
//acc => 6, currentValue => 4
const initialValue = 0;
const sumWithInitial = array1.reduce(
	(acc, currentValue) => {
		console.log(`acc => ${acc}, currentValue => ${currentValue}`)
		return acc + currentValue;
	}, initialValue);

console.log("-----------------------")

// 최대값 출력
const array2 = [4, 7, 1, 2];
const initialValue2 = 0;
const sumWithInitial2 = array2.reduce(
	(acc, currentValue) => {
		console.log(`acc => ${acc}, currentValue => ${currentValue}`)
		return acc > currentValue ? acc : currentValue;
	}, initialValue2);
	

console.log("-----------------------")
// 최소값 출력
const array3 = [4, 7, 1, 2];
const initialValue3 = 0;
const sumWithInitial3 = array3.reduce(
	(acc, currentValue) => {
		console.log(`acc => ${acc}, currentValue => ${currentValue}`)
		return acc < currentValue ? acc : currentValue;
	});
console.log(sumWithInitial3);
// Expected output: 10
// String.prototype.indexOf() => 찾는 값의 인덱스를 반환. 없으면 -1
// Array.prototype.indexOf() => 찾는 값의 인덱스를 반환. 없으면 -1
console.log("abcde".indexOf("c"));
console.log([1,2,3,4,5].indexOf(3));
let genderAry = []; // gender를 종류별로 한가지만 담자
empList.forEach((emp) => {
	if(genderAry.indexOf(emp.gender) == -1){
		genderAry.push(emp.gender);
	}
});
	console.log(genderAry);



