function createTitleDOM(){
	createDIV(siteTitle,"site-title");
	createDIV(userName,"user-name");
	function createDIV(str ,idName){
		const div = createElement("div");
		div.id = idName;
		div.innerHTML = `${str}`;
		getFirstElement("#title").appendChild(div);
	}
}