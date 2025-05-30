
// Add an event listener to the first element matching the selector
function addEventToFirstElement(selector, event, callback) {
	const el = getFirstElement(selector);
	if (el) el.addEventListener(event, callback);
}
// Add an event listener to all elements matching the selector
function addEventToAllElements(selector,event,callback){
	const elements = getAllElements(selector);
	elements.forEach(el => el.addEventListener(event, callback));
}

// Add an event listener at once to element matching the selecor
function addOnceEventToFirstElement(selector, event, callback) {
	const el = getFirstElement(selector);
	if (el) el.addEventListener(event, callback, { once: true });
}

// Add an event listener at once to all elements matching the selecor
function addOnceEventToAllElements(selector,event,callback){
	const elements = getAllElements(selector);
	elements.forEach(el => el.addEventListener(event, callback), { once: true });
}

// Remove an event listener from the first element matching the selector
function removeEventFromFirstElement(selector, event, callback) {
	const el = getFirstElement(selector);
	if (el) el.removeEventListener(event, callback);
}

// Remove an event listener from all elements matching the selector
function removeEventFromAllElements(selector, event, callback) {
	const elements = getAllElements(selector);
	elements.forEach(el => el.removeEventListener(event, callback));
}
