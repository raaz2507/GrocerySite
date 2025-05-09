imgArre = [
	"banner/banerImg1.jpg",
	"banner/banerImg2.jpg",
	"banner/banerImg3.jpg",
	"banner/banerImg4.png",
];
const banner = document.getElementById("BanerImg");
let index = 0;
function changeBanner(banner) {
	console.log(banner.src);

	banner.src = `./img/${imgArre[index]}`;
	banner.alt = imgArre[index];
	// banner.style.backgroundImage= `url('${imgArre[index]}')`;
	index = ++index % imgArre.length;
}

document.addEventListener("DOMContentLoaded", () => {
	setInterval(() => changeBanner(banner), 2000);
});