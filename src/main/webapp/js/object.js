/**
 * object.js(객체 함수)
 * 객체(속성, 메소드)
 */
const obj = {
	name: "홍길동",
	age: 20,
	showInfo: function() {
		return `이름은 ${this.name} 나이는 ${this.age}입니다.`
	},
	empList: function() {
		// ajax
		fetch('../empList.json')
			.then(function(result) {
				console.log(result);
				return result.json();
			})
			.then(function(result) {
				console.log(result);
				result.forEach((member) => {
					let tr = document.createElement('tr');
					for (let prop in member) {
						let td = document.createElement('td');
						td.innerText = member[prop];
						tr.appendChild(td);
					}
					document.querySelector('tbody').appendChild(tr);
				});
			})
	}
};// new Object();

// console.log('이름: ' + obj.name)
obj.name = "Hongkikdong";
console.log(`이름: ${obj.name}, 나이: ${obj["age"]}`)
console.log(obj.showInfo());
// window.alert("확인!!");
// 속성확인
console.log('=======================================');
for (let p in obj) {
	console.log(`속성: ${p}, 값: ${obj[p]}`)
}

console.clear();
obj.empList();