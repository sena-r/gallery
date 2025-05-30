// Get first element by selector within optional context (default: document)
function getFirstElement(selector, context = document) {
	if (selector.startsWith('#') && context === document) {
		//id
		return document.getElementById(selector.slice(1));
	} else {
		//else
		return context.querySelector(selector);
	}
}

// Get all elements by selector within optional context (default: document)
function getAllElements(selector, context = document) {
	return context.querySelectorAll(selector);
}

// Clear innerHTML of the first element within optional context
function clearFirstElementInnerHTML(selector, context = document) {
	const el = getFirstElement(selector, context);
	if (el) el.innerHTML = "";
}

// Clear innerHTML of all matching elements within optional context
function clearAllElementsInnerHTML(selector, context = document) {
	const elements = getAllElements(selector, context);
	elements.forEach(el => el.innerHTML = "");
}

// Remove the first matching element from the DOM within optional context
function removeFirstElement(selector, context = document) {
	const el = getFirstElement(selector, context);
	if (el) el.remove();
}

// Remove all matching elements from the DOM within optional context
function removeAllElements(selector, context = document) {
	const elements = getAllElements(selector, context);
	elements.forEach(el => el.remove());
}

function createElement(selector,context=document){
	return context.createElement(selector)
}