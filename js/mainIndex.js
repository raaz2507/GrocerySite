import {headerNfooter} from './headerNfooter.js';
import {DashbordForBanner} from './banner.js';
import {DashbordForRowNav} from './productCard.js';
import {staticData} from './staticProductData.js';
import {cartDeshBord} from './cartManager.js';

new  headerNfooter();

document.addEventListener("DOMContentLoaded", ()=>{
	const data = staticData;
		//for header and footer
	
		//for banner 
		new DashbordForBanner();
		//for ProductCard
		new DashbordForRowNav(data);
		//for Login_N_Singup
		// const longinNsingupDeshbord_Obj = new longinNsingupDeshbord();
		
		//cartSiderBar and Floting Btn
		new cartDeshBord();
});

/*
//for load header, and footer
async function loadPart(file, selector){
	const response = await fetch(file);
	const html = await response.text();
	const elmt =document.querySelector(selector);
	elmt.innerHTML = html;
}

//loadPart("header.html", "header");
//loadPart("footer.html", "footer");
*/
			
		
console.log(window.location.pathname); //this will return whole path with file name