
async function getDataFromSql(tableName= "products") {
	try {
		const res = await fetch(`/${tableName}`);
		const data = await res.json();
		
		console.table(data);
		return data;
	} catch (err) {
		console.error("Fetch Error", err);
		// alert("Error fetching products");
	}
}
async function getSqlData(tableName){
	const res = await fetch(`/api/${tableName}`);
}
class DashbordForRowNav {
	constructor(){
		this.createCatagoryRowNavbar();
		this.createRow();
		this.setEventsOnElemets();
		
	}
	setEventsOnElemets(){
		
		document.getElementById("ItemCategory").addEventListener("click", (event)=>{
			this.eventOnItemCategory(event);
		});

	}
	async createRow() {
		const productData = await getDataFromSql("products") || getTestDataForCard();
	
		// Object to hold fragments per category
		const fragments = {};
		const categoryDiv={};
		const ItemCategory = document.getElementById("ItemCategory");
		productData.forEach((data) => {
			const category = data.category;
			const categoryColor = data.categoryColor;
			const categoryId = category;//.replace(/\s+/g, '-'); // For ID-friendly name
	
			// Check if fragment exists, else create
			if (!fragments[categoryId]) {
				fragments[categoryId] = document.createDocumentFragment();
			}
	
			let card = this.createProductCard(data);
			fragments[categoryId].appendChild(card);
			
			// Check if div exists, else create and style it
			let categoryDiv = document.getElementById(categoryId);
			if (!categoryDiv) {
				categoryDiv = document.createElement("div");
				categoryDiv.id = categoryId;
				categoryDiv.className = "category";
				categoryDiv.style.backgroundColor = categoryColor;
				categoryDiv.innerHTML = `<div class="categoryTitleDiv"><p class="categoryTitle">${category}</p></div>`;
				ItemCategory.appendChild(categoryDiv); // Append to body or specific container
			}
		});
		

		// Finally, append all fragments to their respective divs
		for (let catId in fragments) {
			let targetDiv = document.getElementById(catId);
			targetDiv.appendChild(fragments[catId]);
		}
	}
	
	createProductCard(ProdeuctData) {
		const {ProductId, brand_name , product_name, mrp, final_price, Qty, unit} = ProdeuctData;
		const {ThumImage, mainImage, OthImage, altText}=ProdeuctData;

		const elementData = {
			// container
			container: { Elm_type: "div", Elm_class: ["productContaner"] },

			// ==== imgFrame ====
			imgFrame: { Elm_type: "div", Elm_class: ["imgFrame"] },
			discountElemt: { Elm_type: "p", Elm_class: ["discount"] },
			productImg: { Elm_type: "img", Elm_class: ["productImg"] },
			wishBtn: { Elm_type: "button", Elm_class: ["wishList"] },

			// ==== proDetails ====
			proDetails: { Elm_type: "div", Elm_class: ["proDetails"] },
			brandName: { Elm_type: "p", Elm_class: ["brandName"] },
			productNme: { Elm_type: "p", Elm_class: ["productName"] },
			
			// ==== qunatitye ====
			quantityDiv: { Elm_type: "p", Elm_class: ["quantity"] },
			qtyValue:{Elm_type: "span", Elm_class:["quantityValue"]},
			unitValue:{Elm_type: "span",Elm_class:["unit"]},

			//=====mrp =======
			MRP_Div: { Elm_type: "p", Elm_class: ["mrp"] },
			MRP_Value: {Elm_type:'span', Elm_class:["mrpValue"]},
			finalPrice: {Elm_type: "span", Elm_class: ["finalPriceValue"]},
			
			rating: { Elm_type: "p", Elm_class: ["rating"] },
			buttons: { Elm_type: "div", Elm_class: ["buttons"] },
			//: {Elm_type:, Elm_class: []},
		};
		Object.freeze(elementData);
		Object.freeze(elementData.container);

		//this function create elements And Add all Class form List
		const element = {};
		for (const key in elementData) {
			const data = elementData[key];

			//this will create Element
			element[key] = document.createElement(data.Elm_type);

			//this forEach Loop add All Class into element
			data.Elm_class.forEach((cls) => {
				element[key].classList.add(cls);
			});
		}
		Object.freeze(element);
		Object.freeze(element.container);

		const { container } = element;
		const { imgFrame, discountElemt, productImg, wishBtn } = element;
		const { proDetails, brandName, productNme, rating } =element;
		const {quantityDiv, qtyValue, unitValue }=element;
		const {MRP_Div, MRP_Value,finalPrice}=element;



		const { buttons } = element;
		container.id = ProductId;

		// ==== imgFrame ====
		if(mrp !== final_price){
			if (discountElemt.classList.contains("hide")){
				discountElemt.classList.remove("hide");
			}
			discountElemt.innerHTML = `<span class="discountValue">${
				100 - parseInt((final_price / mrp) * 100)
			}</span>%<br>off`;
		}else{
			if (!discountElemt.classList.contains("hide")){
				discountElemt.classList.add("hide");
			}
		}

		productImg.src = `./img/ProductImages/${ProductId}/${ThumImage}` ;
		// console.log(productImg.src);
		productImg.alt = altText;

		wishBtn.innerHTML = `<img src="./img/svgs/heartEmpty.svg" alt="" class="wishIcon">`;

		imgFrame.appendChild(discountElemt);
		imgFrame.appendChild(productImg);
		imgFrame.appendChild(wishBtn);

		// ==== proDetails ====
		if (brand_name !=="NO_Brand"){
			brandName.innerText = brand_name;
			proDetails.appendChild(brandName);
		}

		productNme.innerText = product_name;
		proDetails.appendChild(productNme);


		qtyValue.innerText=`${Qty} `;
		unitValue.innerText =`${unit}`;
		quantityDiv.appendChild(qtyValue);
		quantityDiv.appendChild(unitValue);

		// quantity.innerHTML = `<span class="num">${Qty}</span>&nbsp;<span class="unit">${unit}</span>`;
		proDetails.appendChild(quantityDiv);

		if (mrp!==final_price){
			MRP_Value.innerText= `₹${mrp} `;
		}
		finalPrice.innerText = `₹${final_price}`;
		MRP_Div.appendChild(MRP_Value);
		MRP_Div.appendChild(finalPrice);

		proDetails.appendChild(MRP_Div);
		/*
		MRP_Div.innerHTML = `<span class="mrpValue">₹${mrp}&nbsp;</span>
									<span class="finalPriceValue">₹${final_price}</span>`;
		*/
		

		rating.innerHTML = `<span class="ratingValue">4.5</span>
		    								<span class="reviewCount">(1000)</span>`;
		proDetails.appendChild(rating);

		buttons.innerHTML = `<button class="buy">Buy</button>
								        <button class="addtoCart"><img src="./img/cart-arrow-down.svg" alt="add to cart" height="100%"></button>`;

		container.appendChild(imgFrame);
		container.appendChild(proDetails);
		container.appendChild(buttons);

		return container;
	}


	eventOnItemCategory(event){
		const button = event.target.closest("button");

		if (button) {
				const productDiv = button.closest(".productContaner");
				const productId = productDiv?.id;
				// console.log(productId);
				// ✅ Get inner image only for wishlist button

				const buttonActions = {
						buy: ()=> buyBtn(productId),
						addtoCart: ()=> addToCartBtn(productId),
						wishList: () => wishList(productId)
				};
				

				if (button.classList.contains("buy")) {
						buttonActions['buy']();
				} else if (button.classList.contains("addtoCart")){
						buttonActions['addtoCart']();
				} else if (button.classList.contains("wishList")) {
						buttonActions["wishList"]();
				} else {
						console.log("Other button clicked");
				}
		}

		// ✅ Functions
		function buyBtn(pid) {
				console.log("Buy button clicked for product:", pid);
		}

		function addToCartBtn(pid) {
				console.log("Add to Cart button clicked for product:", pid);
		}

		function wishList(pid) {
				console.log("Wish List button clicked for product:", pid);
				
				const fillIcon = `heartFill.svg`;
				const emptyIcon = `heartEmpty.svg`;
				
				const wishListIcon = button.querySelector("img");
				// check current state
				if (wishListIcon.src.includes(fillIcon)) {
						wishListIcon.src = `./img/svgs/${emptyIcon}`;
						wishListIcon.classList.remove("active");
				} else {
						wishListIcon.src = `./img/svgs/${fillIcon}`;
						wishListIcon.classList.add("active");

						// optional: add pulse animation
						setTimeout(() => {
								wishListIcon.classList.remove("active"); // removes scale after 300ms
						}, 300); // must match CSS transition time
				}
		}
	}

	async createCatagoryRowNavbar(){
		const catagoryNavbar = document.getElementById("catagoryNavbar");
		const catagoryData= await getDataFromSql("catagory") || getTestDataForCatagoryNavBar();

		const fragment =document.createDocumentFragment();
		catagoryData.forEach(data=>{
			let card = createNavbarCard(data);
			fragment.appendChild(card);
		});

		const ul=document.createElement('ul');
		ul.appendChild(fragment);
		catagoryNavbar.appendChild(ul);

		function createNavbarCard(catagoryData){
			const {categoryName, images, color, altText}=catagoryData;

			const li = document.createElement('li');
			li.classList.add("catagoryThumbnail");
			li.style.backgroundColor= color;
			li.style.outlineColor =color;

			const anchor = document.createElement('a');
			anchor.href= `#${categoryName}`;
			anchor.style.borderColor =color;

			const img = document.createElement('img');
			img.src=`./img/catagoryThumbnail/${images}`;
			img.alt= altText;
			anchor.appendChild(img);
			li.appendChild(anchor);
			return li;
		}
	}
}
function getTestDataForCatagoryNavBar(){
	return [{
				id: 1,
				categoryName: 'Fruits',
				images: 'FruitThumbnail.png',
				color: 'rgb(255, 166, 0)',
				altText: 'Fruit Catagory'
			},
			{
				id: 2,
				categoryName: 'Vegitables',
				images: 'VegetablesThumbnail.png',
				color: 'rgb(34, 238, 34)',
				altText: 'Vegetables Catagory'
			},
			{
				id: 3,
				categoryName: 'Milk_Product',
				images: 'MilkProductThumbnail.png',
				color: 'rgb(255, 239, 196)',
				altText: 'MilkProduct Catagory'
			}
		];
}
function getTestDataForCard() {
	return  [
		{
			ProductId: 'prod_2',
			brand_name: 'NO_Brand',
			product_name: 'Fresh Apple',
			mrp: '150.00',
			final_price: '120.00',
			Qty: 1,
			unit: 'kg',
			category: 'Fruits',
			categoryColor: 'rgb(255, 166, 0)',
			ThumImage: 'apple.jpg',
			mainImage: 'apple.jpg',
			OthImage: 'apple.jpg, apple.jpg'
		},
		{
			ProductId: 'prod_6',
			brand_name: 'NO_Brand',
			product_name: 'Banana',
			mrp: '60.00',
			final_price: '50.00',
			Qty: 12,
			unit: 'pice',
			category: 'Fruits',
			categoryColor: 'rgb(255, 166, 0)',
			ThumImage: 'banana.jpg',
			mainImage: 'banana.jpg',
			OthImage: 'banana.jpg, banana.jpg'
		},
		{
			ProductId: 'prod_3',
			brand_name: 'NO_Brand',
			product_name: 'Organic Potato',
			mrp: '40.00',
			final_price: '35.00',
			Qty: 100,
			unit: 'g',
			category: 'Vegitables',
			categoryColor: 'rgb(34, 238, 34)',
			ThumImage: 'pineapple.jpg',
			mainImage: 'pineapple.jpg',
			OthImage: 'pineapple.jpg, pineapple.jpg'
		},
		{
			ProductId: 'prod_1',
			brand_name: 'Amul',
			product_name: 'Amul Gold Milk',
			mrp: '60.00',
			final_price: '55.00',
			Qty: 500,
			unit: 'ml',
			category: 'Milk_Product',
			categoryColor: 'rgb(255, 239, 196)',
			ThumImage: 'anuml500ml.jpg',
			mainImage: 'anuml500ml.jpg',
			OthImage: 'amul500ml_back.jpg, amul500ml_Discription.jpg'
		},
		{
			ProductId: 'prod_4',
			brand_name: 'MotherDairy',
			product_name: 'Mother Dairy Butter',
			mrp: '250.00',
			final_price: '230.00',
			Qty: 100,
			unit: 'g',
			category: 'Milk_Product',
			categoryColor: 'rgb(255, 239, 196)',
			ThumImage: 'strobary.jpg',
			mainImage: 'strobary.jpg',
			OthImage: 'strobary.jpg, strobary.jpg'
		},
		{
			ProductId: 'prod_5',
			brand_name: 'Amul',
			product_name: 'paneer',
			mrp: '80.00',
			final_price: '80.00',
			Qty: 100,
			unit: 'g',
			category: 'Milk_Product',
			categoryColor: 'rgb(255, 239, 196)',
			ThumImage: 'orange.jpg',
			mainImage: 'orange.jpg',
			OthImage: 'orange.jpg, orange.jpg'
		}
	];
	
}

