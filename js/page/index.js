//キャッシュされたgData modal表示用
const cachedGDataMap = new Map();
//データ取得 sData=スライド用画像、gData=ギャラリー用画像
async function getData(url,sData=[],gData=[]){
	const parser = new DOMParser();
	console.log(`Fetching URL: ${url}`);
	const response = await fetch(url);
	if (!response.ok) throw new Error(`failed to get data from this page. ${url}`);
	const text = await response.text();
	const doc = parser.parseFromString(text,"text/html");
	const articles = doc.querySelectorAll(".entry");
	articles.forEach(article=>{
		const title = article.querySelector(".entry-title")?.textContent.trim();
		const articleURL = article.querySelector(".entry-title a")?.href;
		const toSFigures = article.querySelectorAll(".toS");
		const toGFigures = article.querySelectorAll(".toG");
		if(toSFigures.length >0){
			toSFigures.forEach(fig =>{
				const img = fig?fig.querySelector("img") : null;
				const cap = fig?fig.querySelector("figcaption"):null;
				if(img && cap){
					const dt ={
						title:title,
						imgSrc:img.src,
						caption:cap.textContent.trim(),
						url:articleURL,
					}
					sData.push(dt);
				}
			})
		}
		if(toGFigures){
			toGFigures.forEach(fig =>{
				const img = fig?fig.querySelector("img") : null;
				const cap = fig?fig.querySelector("figcaption"):null;
				if(img && cap){
					const dt ={
						title:title,
						imgSrc:img.src,
						caption:cap.textContent.trim(),
						url:articleURL,
					}
					gData.push(dt);
					cachedGDataMap.set(img.src,dt);
				}
			})
		}
	})
	const nextPageLink = doc.querySelector(".pager-next a")
	if(nextPageLink){
		const nextPageURL = nextPageLink.href;
		return await getData(nextPageURL,sData,gData);
	}else{
		return {sData,gData};
	}
}



function setSiteTitle(){
    if(siteTitle=="" && userName==""){
        alert("Please set title.")
        document.close();
    }else{
        if(siteTitle!=="" && userName !==""){
            document.title =siteTitle + " / " + userName
        }else{
            if(siteTitle=="" && userName !==""){
                document.title =userName;
            }else if(siteTitle!== "" && userName== ""){
                document.title = siteTitle;
            }
        }
    }
}

function setTitle(){
    document.getElementById("title").innerHTML=document.title;
}
function setSlide(sData){
    if(sData.length > 0){
        const swiperWrapper = document.querySelector(".swiper-wrapper");
        sData.forEach(dt=>{
            const div = document.createElement("div");
            div.classList.add("swiper-slide");
            div.innerHTML=`<img src="${dt.imgSrc}" alt="${dt.caption}">`;
            swiperWrapper.appendChild(div)
        })
        const swiper = new Swiper('.swiper', {
            loop: true,
            autoplay: {
                delay: 10000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                type:'fraction'
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            speed: 600
        });
    }
}

function setGallery(gData){
    if(gData.length > 0){
        const galleryContainer = document.getElementById("gallery-container");
        gData.forEach((dt, index) => { // index を取得
            const div = document.createElement("div");
            div.innerHTML = `
                <img class="gallery-image" src="${dt.imgSrc}" alt="${dt.caption}" data-caption="${dt.caption}">
            `;
            galleryContainer.appendChild(div);
        });
    }
}

function setMacy(){
    const container = document.getElementById("gallery-container");
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
				400: 1
			}
		});
	});
}


let currentModalIndex = -1;
function setModal(gData){
    const galleryContainer = document.getElementById("gallery-container");
    const images = galleryContainer.querySelectorAll(".gallery-image");
    window.galleryData = gData; // モーダルページャーでも使えるようにグローバルに保存
    images.forEach((img, index) => {
        img.addEventListener("click", (event) => {
            event.preventDefault();
            const cached = cachedGDataMap.get(img.src);
            if (cached) {
                const modalImage = document.getElementById("modal-image");
                const modalCaption = document.getElementById("modal-caption");
                const modalLink = document.getElementById("modal-link");
                modalImage.src = cached.imgSrc;
                modalCaption.textContent = cached.title;
                modalLink.href = cached.url;
                currentModalIndex = index;
                MicroModal.show("modal-1");
            } else {
                console.warn("There is no cache.");
            }
        });
    });
}

function setModalPagerClickEvent(){
    const prev = document.getElementById("modal-prev");
    const next = document.getElementById("modal-next");
    prev.addEventListener("click", () => {
        console.log("prev clicked");
        currentModalIndex--;
        if (currentModalIndex < 0) {
            currentModalIndex = galleryData.length - 1; // 先頭に戻る代わりに末尾へ
        }
        showModalImage(currentModalIndex);
    });
    next.addEventListener("click", () => {
        console.log("next clicked");
        currentModalIndex++;
        if (currentModalIndex >= galleryData.length) {
            currentModalIndex = 0; // 末尾から先頭へ戻る
        }
        showModalImage(currentModalIndex);
    });
}

function showModalImage(index){
    const dt = galleryData[index];
    if (!dt) return;
    const modalImage = document.getElementById("modal-image");
    const modalCaption = document.getElementById("modal-caption");
    const modalLink = document.getElementById("modal-link");
    modalImage.src = dt.imgSrc;
    modalCaption.textContent = dt.title;
    modalLink.href = dt.url;
}




function scrollToTop(){
    window.scrollTo({top: 0,behavior: "smooth"});
}




document.addEventListener('DOMContentLoaded', async () => {

    setSiteTitle();
    const {sData,gData} = await getData(firstURL);
    //console.log("sData",sData);
    //console.log("gData",gData);
    setTitle()
    setSlide(sData);
    setGallery(gData);
    setMacy()
    setModal(gData)
    setModalPagerClickEvent()

});
