
class DashbordForBanner{
	constructor(){
		this.startBanner();
		
	}

	startBanner(){
		const imgArre = [
			"banerImg1.jpg",
			"banerImg2.jpg",
			"banerImg3.jpg",
			"banerImg4.png",
		];

		const banner = document.getElementById("BanerImg");
		
		setInterval(changeBanner, 2000);
		
		let index = 0;
		function changeBanner() {
			// console.log(banner.src);
		
			banner.src = `./img/banner/${imgArre[index]}`;
			banner.alt = imgArre[index];
			index = ++index % imgArre.length;
		}	
	}
}

