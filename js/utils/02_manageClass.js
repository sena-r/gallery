
function addClassToFirstElement(selector,className){
	const el = getFirstElement(selector)
	if (el) el.classList.add(className)
}

function removeClassToFirstElement(selector,className){
	const el = getFirstElement(selector)
	if (el) el.classList.remove(className)
}

function addClassToAllElements(selector,className){
	const el = getAllElements(selector)
	if (el) el.classList.add(className)
}

function removeClassToAllElements(selector,className){
	const el = getAllElements(selector)
	if (el) el.classList.remove(className)
}
// Check if element has class
function hasClass(selector, className) {
	const el = getFirstElement(selector);
	if (!el) return null;
	return el.classList.contains(className);
}