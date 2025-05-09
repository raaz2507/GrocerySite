imgArre = [
	"./../img/banner/banerImg1.jpg",
	"./../img/banner/banerImg2.jpg",
	"./../img/banner/banerImg3.jpg",
	"./../img/banner/banerImg4.png",
];
const banner = document.getElementById("BanerImg");
let index = 0;
function changeBanner(banner) {
	console.log(banner.src);

	banner.src = imgArre[index];
	banner.alt = imgArre[index];
	// banner.style.backgroundImage= `url('${imgArre[index]}')`;
	index = ++index % imgArre.length;
}

document.addEventListener("DOMContentLoaded", () => {
	setInterval(() => changeBanner(banner), 2000);
});