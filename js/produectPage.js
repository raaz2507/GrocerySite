class productPageDeshbord{
	#elemts;
	constructor(prodData){
		new addBtn();
		new ProductImgGallery(prodData);

		this.#elemts= this.#getElements();
		this.#genrateBreadCrumb(prodData);
		this.#setProductDetails(prodData);
	}
	#getElements(){
		const prodDetails = document.getElementById("prodDetails");
		const prodName = prodDetails.getElementsByClassName("prodName")[0];
		
		const brandName = prodDetails.getElementsByClassName("brandName")[0];
		
		const quantityValue = prodDetails.getElementsByClassName("quantityValue")[0];
		const units = prodDetails.getElementsByClassName("unit")[0];

		const mrpValue = prodDetails.getElementsByClassName("mrpValue")[0];
		const finalPriceValue = prodDetails.getElementsByClassName("finalPriceValue")[0];
		const discount = prodDetails.getElementsByClassName("discount")[0];
		
		const prodDesc =  document.getElementsByClassName("prodDesc")[0];
		
		const ratingValue = document.getElementsByClassName("ratingValue")[0];
		const reviewCount=document.getElementsByClassName("reviewCount")[0];

		const userReviewComments = document.getElementById("userReviewComments");
		const relatedItems =document.getElementById("relatedItems");
		return {prodDetails, prodName, brandName, quantityValue, units, mrpValue, finalPriceValue, discount, prodDesc, ratingValue, reviewCount , userReviewComments, relatedItems};
	}
	#genrateBreadCrumb(proData){
		const breadCrumb = document.getElementById("breadCrumb");
		const {category, categoryColor, product_name}=proData;
		breadCrumb.innerHTML=`<a href="#" style="color:blue;">home</a> / <a href="#"style="color: ${categoryColor};">${category}</a> / ${product_name}`;
	}
	#setProductDetails(proData){
		const {prodName, brandName, quantityValue, units, mrpValue, finalPriceValue, discount, prodDesc}=this.#elemts;
		const {brand_name, product_name, mrp, final_price, Qty, unit, description}= proData;
		//prodName.innerText =product_name;
		console.log(brandName);
		const mapValues = new Map([
        [prodName, product_name],
        [brandName, brand_name],
        [quantityValue, Qty],
        [units, unit],
        [mrpValue, mrp],
        [finalPriceValue, final_price],
        [discount, `${Math.round(((mrp - final_price) / mrp) * 100)}% OFF`],
        [prodDesc, description]
    ]);

    // अब सारे elements को set करो 💚
    for (const [element, value] of mapValues) {
        if (element) element.innerHTML = value;
    }
	}
}