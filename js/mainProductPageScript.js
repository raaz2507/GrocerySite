import {headerNfooter} from './headerNfooter.js';
import {staticData} from './staticProductData.js';
import {productPageDeshbord} from './produectPage.js'
	
document.addEventListener("DOMContentLoaded", (e)=>{
	new headerNfooter();
	//set page acoding product
	const params = new URLSearchParams(window.location.search);
	const productId = params.get("id");
	//console.log(productId);
	
	const data = fatchData(productId);
	//console.log(data);
	function fatchData(product_Id){
		const allDataList =staticData.productDataList; //ye fake data js/staticProductData.js se aa raha hai.
		return allDataList.find(obj=> obj.ProductId === product_Id) || null;
	}
	new productPageDeshbord(data);
});