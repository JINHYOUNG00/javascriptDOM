/**
 * fruit.js
 */

 let button = document.querySelector('#addBtn');
	console.log(button);
	
	button.addEventListener('click', function(){
		// 요소 생성(create Element)
		// 자식요소(appendChild)
		let li = document.createElement('li');
		li.innerText = document.querySelector('p').innerText;
		li.innerText = document.querySelector('input').value;
		let name = document.querySelector('input:nth-of-type(1)').value;
		let price = document.querySelector('input:nth-of-type(2)').value;
		li.innerText = name + " " + price + "원";
		let ul = document.querySelector('ul');
		
		// 삭제 버튼
		let btn = document.createElement('button');
		btn.innerText = "삭제"
		btn.addEventListener('click', function(){
			console.log(this);
			this.parentElement.remove();
		});
		li.appendChild(btn);

		ul.appendChild(li);
	});