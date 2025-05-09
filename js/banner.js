imgArre = [
	"banerImg1.jpg",
	"banerImg2.jpg",
	"banerImg3.jpg",
	"banerImg4.png",
];
const banner = document.getElementById("BanerImg");
let index = 0;
function changeBanner(banner) {
	console.log(banner.src);

	banner.src = `./img/banner/${imgArre[index]}`;
	banner.alt = imgArre[index];
	// banner.style.backgroundImage= `url('${imgArre[index]}')`;
	index = ++index % imgArre.length;
}

document.addEventListener("DOMContentLoaded", () => {
	setInterval(() => changeBanner(banner), 2000);
});