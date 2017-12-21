let arr = JSON.parse(localStorage.getItem('game')) || [],
	arrGamer = JSON.parse(localStorage.getItem('gamer')) || [],
	elem = document,
	body = elem.body,
	board = elem.getElementById('board'),
	sell = elem.getElementById('sell'),
	table = elem.getElementById('table'),
	td = elem.getElementsByTagName('td'),
	btnNewGame = elem.getElementById('btnNewGame'),
	btnGameOver = elem.getElementById('btnGameOver'),
	resultTableChemp = elem.getElementById('result'),
	tableChemp = elem.getElementById('chemp'),
	inp = elem.getElementById('inp'),
	divTimer = elem.getElementById('timer'),
	//date,
	hh_mi_ss;

let addTable = () => {
	if(table) {
		table.remove();
		window.location.reload();
	} else {
		let n = 0;
		table = elem.createElement('table');
		table.setAttribute('id', 'table');
		for (let i = 0; i < sell.value; i++) {
			let tr = elem.createElement('tr');
			table.appendChild(tr);
			board.appendChild(table);
			for (let j = 0; j < sell.value; j++) {
				let td = elem.createElement('td');
				let textElem = elem.createTextNode(n);
				tr.appendChild(td);
				td.appendChild(textElem);
				n++;
			}
		}
	}
};

let compareRandom = (a, b) => {
	return Math.random() - 0.5;
};

let timerId;
let timer = () => {
		let hh = 0,
			min = 0,
			sec = 0;
			
			timerId = setInterval( () => {
			sec++;
						
			if(sec === 60) {sec = 0; min++;} 
			if(min === 60) {min = 0; hh++;} 
			if(hh === 24) hh = 0;
			
			if(sec < 10) sec = '0' + +sec;
			if(min < 10) min = '0' + +min;
			if(hh < 10) hh = '0' + +hh;
			
			hh_mi_ss = hh + ':' + min + ':' + sec;
			
			divTimer.textContent = hh_mi_ss;
		}, 1000);
};

let newGame = () => {
	timer();
	
	addTable();
	arr = [];
		for (let i = 0; i < td.length; i++) {
			arr.push(i);
		}
		arr.sort(compareRandom);
		for (let j = 0; j < td.length; j++) {
			td[j].textContent = arr[j];
			if (td[j].textContent === '0') td[j].className = 'empty';
		}
		localStorage.setItem('game', JSON.stringify(arr));

	table.onclick =	function(e) {
		let inter = e.target.textContent;
		for (let i = 0; i < td.length; i++) {
			if (td[i].textContent === '0' && e.target === td[i - 1] || e.target === td[i + 1] || e.target === td[i + +sell.value] || e.target === td[i - sell.value]) {
				if (td[i].textContent === '0') {
					td[i].classList.remove('empty');
					td[i].textContent = inter;
					e.target.textContent = '0';
					e.target.className = 'empty';
				}
			}
		}
		for (let j = 0; j < td.length; j++)
			arr[j] = +td[j].textContent;
		localStorage.setItem('game', JSON.stringify(arr));
	};
};

let gameOver = () => {
	clearInterval(timerId);
	divTimer.style.display = 'none';
	
	let gamer,
			count = 0;
	arr = [];

		for (let j = 0; j < td.length; j++) {
			if (+td[j].textContent === j + 1) ++count;
			arr.push(+td[j].textContent)
		}
		if (count === td.length-1) {
			
			alert('Victory!');
			
			if(inp.value) {
				gamer = inp.value;
			} else {
				gamer = 'anonym';
			}
			
			arrGamer.push([gamer, sell.value + ' x ' + sell.value, hh_mi_ss]);
			localStorage.setItem('gamer', JSON.stringify(arrGamer));
			
			resultTableChemp.classList.toggle("result");
			resultTableChemp.classList.toggle("visibil");
			
			for(let i = 0; i < arrGamer.length; i++) {
				let trGamer = elem.createElement('tr');
				let tdGamer = elem.createElement('td');
				let textGamer = elem.createTextNode(arrGamer[i][0]);
					tdGamer.classList.add('td-chemp');
					tdGamer.appendChild(textGamer);
					trGamer.appendChild(tdGamer);
				let tdBoardSize = elem.createElement('td');
				let textBoardSize = elem.createTextNode(arrGamer[i][1]);
					tdBoardSize.classList.add('td-chemp');
					tdBoardSize.appendChild(textBoardSize);
					trGamer.appendChild(tdBoardSize);
				let tdTime = elem.createElement('td');
				let textTime = elem.createTextNode(arrGamer[i][2]);
					tdTime.classList.add('td-chemp');
					tdTime.appendChild(textTime);
					trGamer.appendChild(tdTime);
					tableChemp.appendChild(trGamer);
			}
		} else {
			alert('You lose!');
		}
		localStorage.setItem('game', JSON.stringify(arr));
};

let keyboardEvent = (e) => {
	switch (e.keyCode) {
		case 38: key('up');
			break;
		case 40: key('down');
			break;
		case 37: key('left');
			break;
		case 39: key('right');
			break;
	}
};

let key = (type) => {
	for (let i = 0; i < td.length; i++) {
		let sell1 = sell.value - 1;
		switch (type) {
			case 'up':
				if ((td[i].textContent === '0') && td[i + +sell.value]) {
					let inter1 = td[i + +sell.value].textContent;
					td[i].classList.remove('empty');
					td[i].textContent = inter1;
					td[i + +sell.value].textContent = '0';
					td[i + +sell.value].className = 'empty';
					return;
				}
				break;
			case 'down':
				if ((td[i].textContent === '0') && td[i - sell.value]) {
					let inter2 = td[i - sell.value].textContent;
					td[i].classList.remove('empty');
					td[i].textContent = inter2;
					td[i - sell.value].textContent = '0';
					td[i - sell.value].className = 'empty';
				}
				break;
			case 'left':
				if ((td[i].textContent === '0') && td[i + 1]) {
					let inter3 = td[i + 1].textContent;
					if (+sell.value === 3) if (i === sell1 || i === 5) break;
					if (+sell.value === 4) if (i === sell1 || i === 7 || i === 11) break;
					if (+sell.value === 5) if (i === sell1 || i === 9 || i === 14 || i === 19) break;
					if (+sell.value === 6) if (i === sell1 || i === 11 || i === 17 || i === 23 || i === 29) break;
					if (+sell.value === 7) if (i === sell1 || i === 13 || i === 20 || i === 27 || i === 34 || i === 41) break;
					if (+sell.value === 8) if (i === sell1 || i === 15 || i === 23 || i === 31 || i === 39 || i === 47 || i === 55) break;
					if (+sell.value === 9) if (i === sell1 || i === 17 || i === 26 || i === 35 || i === 44 || i === 53 || i === 62 || i === 71) break;
					if (+sell.value === 10) if (i === sell1 || i === 19 || i === 29 || i === 39 || i === 49 || i === 59 || i === 69 || i === 79 || i === 89) break;
						td[i].classList.remove('empty');
						td[i].textContent = inter3;
						td[i + 1].textContent = '0';
						td[i + 1].className = 'empty';
						return;
					}
				break;
			case 'right':
				if ((td[i].textContent === '0') && td[i - 1]) {
					let inter4 = td[i - 1].textContent;
					if (+sell.value === 3) if (i === 6 || i === 3) break;
					if (+sell.value === 4) if (i === 12 || i === 8 || i === 4) break;
					if (+sell.value === 5) if (i === 20 || i === 15 || i === 10 || i === 5) break;
					if (+sell.value === 6) if (i === 30 || i === 24 || i === 18 || i === 12 || i === 6) break;
					if (+sell.value === 7) if (i === 42 || i === 35 || i === 28 || i === 21 || i === 14 || i === 7) break;
					if (+sell.value === 8) if (i === 56 || i === 48 || i === 40 || i === 32 || i === 24 || i === 16 || i === 8) break;
					if (+sell.value === 9) if (i === 72 || i === 63 || i === 54 || i === 45 || i === 36 || i === 27 || i === 18 || i === 9) break;
					if (+sell.value === 10) if (i === 90 || i === 80 || i === 70 || i === 60 || i === 50 || i === 40 || i === 30 || i === 20 || i === 10) break;
						td[i].classList.remove('empty');
						td[i].textContent = inter4;
						td[i - 1].textContent = '0';
						td[i - 1].className = 'empty';
					}
				break;
		}
	}
	for (let j = 0; j < td.length; j++)
		arr[j] = +td[j].textContent;
	localStorage.setItem('game', JSON.stringify(arr));
};

btnNewGame.addEventListener('click', newGame);
btnGameOver.addEventListener('click', gameOver);
window.addEventListener('keydown', keyboardEvent);