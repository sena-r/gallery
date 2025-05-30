document.addEventListener('DOMContentLoaded', async () => {
	console.log("DOMContentLoaded");
	//set title of site
	document.title = siteTitle +" / "+ userName;
	//init micromodal
	MicroModal.init();
	try {
		createTitleDOM();
		const imgDatas = await getImgData(startURL);
		createGalleryDOM(imgDatas);
		const container = getFirstElement("#gallery-container");
		imagesLoaded(container, () => {
			Macy({
				container: '#gallery-container',
				columns: 3,
				margin: {
					x: 50,
					y: 50,
				},
				breakAt: {
					940: 3,
					520: 2,
					460: 1
				}
			});
		});
		setupModal();
	} catch (error) {
		console.error(error);
		//retry accessing
		let reloadCount = Number(sessionStorage.getItem("reloadCount") || "0");
		if (reloadCount < 3) {
			sessionStorage.setItem("reloadCount", reloadCount + 1);
			location.reload();
		} else {
			alert("ページを読み込めませんでした。\nお手数ですが再度アクセスし直してください。\nOKをクリックしたらページを閉じます。");
			//window.close();
			//ブラウザが window.close() をブロックする場合
			document.body.innerHTML = "<p style='text-align:center;margin-top:2em;'>ページを破棄することができませんでした。</p>";
		}
	}
});


function setupModal() {
	const galleryContainer = getFirstElement("#gallery-container");
	const images = getAllElements(".gallery-image", galleryContainer);
	images.forEach(img => {
		img.addEventListener("click", (event) => {
			event.preventDefault();
			const imgSrc = img.src;
			const imgData = cachedImgDataMap.get(imgSrc);
			if (!imgData) {
				console.warn(`No cached data found for image: ${imgSrc}`);
				return;
			}
			const modalImage = getFirstElement("#modal-image");
			const modalCaption = getFirstElement("#modal-caption");
			const modalLink = getFirstElement("#modal-link");
			modalImage.src = imgData.imgSrc;
			modalImage.alt = imgData.caption;
			modalCaption.textContent = imgData.title;
			modalLink.href = imgData.url;
			MicroModal.show("modal-1");
		});
	});
}
