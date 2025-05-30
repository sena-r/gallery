//Show element(s) by selector
function showElements(selector) {
	const elements = getAllElements(selector);
	elements.forEach(el => el.style.display = '');
}

//Hide element(s) by selector
function hideElements(selector) {
	const elements = getAllElements(selector);
	elements.forEach(el => el.style.display = 'none');
}
