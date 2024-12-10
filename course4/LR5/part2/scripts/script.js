let tab;
let tabContent;

window.onload = function() {
	tabContent = document.getElementsByClassName('tabContent');
	tab = document.getElementsByClassName('tab');
	hideTabsContent(1);
}

function hideTabsContent(a) {
	for (var i = a; i < tabContent.length; i++) {
		tabContent[i].classList.remove('show');
		tabContent[i].classList.add('hide');
		tab[i].classList.remove('whiteborder');
	}
}

document.getElementById('tabs').onclick = function(event) {
	let target = event.target;
	if (target.className == 'tab') {
		for (let i = 0; i < tab.length; i++) {
			if (target == tab[i]) {
				showTabsContent(i);
				break;
			}
		}
	}
}

function showTabsContent(b) {
	if (tabContent[b].classList.contains('hide')) {
		hideTabsContent(0);
		tab[b].classList.add('whiteborder');
		tabContent[b].classList.remove('hide');
		tabContent[b].classList.add('show');
	}
}

function generateBorderRadius() {
	let rtl = document.getElementById('rtl').value;
	let rtr = document.getElementById('rtr').value;
	let rbr = document.getElementById('rbr').value;
	let rbl = document.getElementById('rbl').value;
	let ttl = document.getElementById('ttl');
	let ttr = document.getElementById('ttr');
	let tbr = document.getElementById('tbr');
	let tbl = document.getElementById('tbl');
	let block = document.getElementById('block');
	let cssOutput = document.getElementById('cssOutput');

	ttl.value = rtl;
	ttr.value = rtr;
	tbr.value = rbr;
	tbl.value = rbl;

	function isZero(value) {
		return value == 0 ? "0" : value + "px";
	}

	block.style.borderRadius = isZero(rtl) + " " + isZero(rtr) + " " + isZero(rbr) + " " + isZero(rbl);
	let cssCode = "border-radius: " + isZero(rtl) + " " + isZero(rtr) + " " + isZero(rbr) + " " + isZero(rbl) + ";";
	cssOutput.value = cssCode;
}

function generateColor() {
	let color = document.getElementById('colorPicker').value;
	let colorBlock = document.getElementById('colorBlock');
	let colorCssOutput = document.getElementById('colorCssOutput');
	colorBlock.style.backgroundColor = color;
	let cssCode = "background-color: " + color + ";";
	colorCssOutput.value = cssCode;
}

function generateCursor() {
	let cursorType = document.getElementById('cursorPicker').value;
	let cursorBlock = document.getElementById('cursorBlock');
	let cursorCssOutput = document.getElementById('cursorCssOutput');
	cursorBlock.style.cursor = cursorType;
	let cssCode = "cursor: " + cursorType + ";";
	cursorCssOutput.value = cssCode;
}
