'use strict';

var arr = JSON.parse(localStorage.getItem('game')) || [],
	wrap = document.querySelector('.wrapper'),
	ul = document.querySelector('.play'),
	li = $('li'),
	sort = $(".sortable"),
	btnNewGame = $('#btnNewGame'),
	btnGameOver = $('#btnGameOver');

wrap.onmousedown = wrap.onselectstart = function() {
	return false;
};

function addLocStor() {
	if (arr.length === 0) {
		for (var j = 0; j < li.length; j++)
			arr[j] = +li[j].textContent;
	} else {
		for (var i = 0; i < li.length; i++) {
			li[i].textContent = arr[i] + '';
			if (li[i].textContent === '0') $(li[i]).addClass("empty");
			if (li[i].textContent !== '0') $(li[i]).removeClass("empty");
		}
	}
	localStorage.setItem('game', JSON.stringify(arr));
}

addLocStor();

function compareRandom(a, b) {
	return Math.random() - 0.5;
}

function newGame() {
	arr = [];
	for (var i = 0; i <= 15; i++) {
		arr.push(i);
	}
	arr.sort(compareRandom);
	for (var j = 0; j < li.length; j++) {
		li[j].textContent = arr[j];
		if (li[j].textContent === '0') $(li[j]).addClass("empty");
		if (li[j].textContent !== '0') $(li[j]).removeClass("empty");
	}
	localStorage.setItem('game', JSON.stringify(arr));
}

function gameOver() {
	arr = [];
	var count = 0;
	for (var j = 0; j < li.length; j++) {
		if (+ul.children[j].textContent === j + 1) ++count;
		arr.push(+ul.children[j].textContent)
	}
	if (count === 15) {
		alert('Victory!');
	} else {
		alert('You lose!');
	}
	localStorage.setItem('game', JSON.stringify(arr));
}

// $(function () {
// 	sort.sortable();
// 	sort.disableSelection();
// });

btnNewGame.on('click', newGame);
btnGameOver.on('click', gameOver);

ul.onclick = function (e) {
	var inter = e.target.textContent;
	for (var i = 0; i < li.length; i++) {
		if (li[i].textContent === '0' && e.target === li[i - 1] || e.target === li[i + 1] || e.target === li[i + 4] || e.target === li[i - 4]) {
			if (li[i].textContent === '0') {
				$(li[i]).removeClass("empty");
				li[i].textContent = inter;
				e.target.textContent = '0';
				e.target.classList.add("empty");
			}
		}
	}
	for (var j = 0; j < li.length; j++)
		arr[j] = +li[j].textContent;
	localStorage.setItem('game', JSON.stringify(arr));
};

function keyboardEvent(e) {
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
}

function key(type) {
	for (var i = 0; i < li.length; i++) {
		switch (type) {
			case 'up':
				if ((li[i].textContent === '0') && li[i + 4]) {
					var inter1 = li[i + 4].textContent;
					$(li[i]).removeClass("empty");
					li[i].textContent = inter1;
					li[i + 4].textContent = '0';
					$(li[i + 4]).addClass("empty");
					return;
				}
				break;
			case 'down':
				if ((li[i].textContent === '0') && li[i - 4]) {
					var inter2 = li[i - 4].textContent;
					$(li[i]).removeClass("empty");
					li[i].textContent = inter2;
					li[i - 4].textContent = '0';
					$(li[i - 4]).addClass("empty");
				}
				break;
			case 'left':
				if ((li[i].textContent === '0') && li[i + 1]) {
					if (i === 3 || i === 7 || i === 11) break;
					var inter3 = li[i + 1].textContent;
					$(li[i]).removeClass("empty");
					li[i].textContent = inter3;
					li[i + 1].textContent = '0';
					$(li[i + 1]).addClass("empty");
					return;
				}
				break;
			case 'right':
				if ((li[i].textContent === '0') && li[i - 1]) {
					if (i === 12 || i === 8 || i === 4) break;
					var inter4 = li[i - 1].textContent;
					$(li[i]).removeClass("empty");
					li[i].textContent = inter4;
					li[i - 1].textContent = '0';
					$(li[i - 1]).addClass("empty");
				}
				break;
		}
	}
	for (var j = 0; j < li.length; j++)
		arr[j] = +li[j].textContent;
	localStorage.setItem('game', JSON.stringify(arr));
}

window.addEventListener('keydown', keyboardEvent, false);