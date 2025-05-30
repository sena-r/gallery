
function createGalleryDOM(imgDatas){
	if(imgDatas.length > 0){
		const gallery = getFirstElement("#gallery");
		const galleryContainer = getFirstElement("#gallery-container", gallery);
		imgDatas.forEach(imgData => {
			const div = createElement("div");
			div.innerHTML = `
				<img class="gallery-image" src="${imgData.imgSrc}" alt="${imgData.caption}" data-caption="${imgData.caption}">
			`;
			galleryContainer.appendChild(div);
		});
		addClickEventListenerToImages(galleryContainer);
	}
}

function addClickEventListenerToImages(galleryContainer){
	// add click event to all images
	const images = getAllElements(".gallery-image",galleryContainer);
	images.forEach(img => {
		img.addEventListener("click", (event) => {
			event.preventDefault();
			const modalImage = getFirstElement("#modal-image");
			const modalCaption = getFirstElement("#modal-caption");
			const cached = cachedImgDataMap.get(img.src);
			if (cached) {
				modalImage.src = cached.imgSrc;
				modalCaption.textContent = cached.caption;
				MicroModal.show("modal-1");
			} else {
				console.warn("There is no cache.");
			}
		});
	});
}