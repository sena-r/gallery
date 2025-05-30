
function animateOnceWithClass(selector,className,duration){
	addClassToFirstElement(selector,className);
	setTimeout(() =>{
		removeClassToFirstElement(selector,className)
	},duration)
}