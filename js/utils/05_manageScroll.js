
function scrollToTop() {
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToElement(selector) {
	const el = getFirstElement(selector)
	el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToBottom() {
	const height = Math.max(
		document.body.scrollHeight,
		document.documentElement.scrollHeight
	);
	window.scrollTo({ top: height, behavior: 'smooth' });
}