//cached imgDatas for modal
const cachedImgDataMap = new Map();

async function getImgData(url,imgDatas=[]){
	const parser = new DOMParser();
	console.log(`Fetching URL: ${url}`);
	const response = await fetch(url);
	if (!response.ok) throw new Error(`failed to get imgData from this page. ${url}`);
	const text = await response.text();
	const doc = parser.parseFromString(text,"text/html");
	const articles = getAllElements(".entry",doc);
	articles.forEach(article => {
		const title = getFirstElement(".entry-title",article)?.textContent.trim();
		const articleURL = getFirstElement(".entry-title a",article)?.href;
		const toGFigures = getAllElements(".toG",article);
		if (toGFigures.length > 0){
			toGFigures.forEach(figure=>{
				const img = figure ? getFirstElement("img",figure) : null;
				const caption = figure ? getFirstElement("figcaption",figure):null;
				if(img && caption){
					const imgData = {
						title:title,
						imgSrc:img.src,
						caption:caption.textContent.trim(),
						url:articleURL
					}
					imgDatas.push(imgData);
					cachedImgDataMap.set(img.src, imgData); // img.src as key
				}
			})
		}
	})
	const nextPageLink = getFirstElement(".pager-next a",doc);
	if(nextPageLink){
		const nextPageURL = nextPageLink.href;
		return await getImgData(nextPageURL,imgDatas);
	}else{
		return imgDatas;
	}
}