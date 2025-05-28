
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
	
	constructor(data){
		const {productDataList, oneProduct,categoryData} = data;
		this.createCatagoryRowNavbar(categoryData);
		this.createRow(productDataList);
		this.setEventsOnElemets();
		
	}
	setEventsOnElemets(){
		
		document.getElementById("ItemCategory").addEventListener("click", (event)=>{
			this.eventOnItemCategory(event);
		});

	}
	async createRow(productTestDataList) {
		const productData = await getDataFromSql("products") || productTestDataList;
	
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
		const elementMap = getElementsMap();
			Object.freeze(elementMap);
			Object.freeze(elementMap.container);
		
		
		const element = createElementsFromMap(elementMap);
			Object.freeze(element);
			Object.freeze(element.container);

		createStrucher(element, ProdeuctData);
		
		return element.container;

		/*===== inner function start =====*/
		function getElementsMap(){
			return {
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
				CartBtn: { Elm_type: "div", Elm_class: ["CartBtn"] },
				//: {Elm_type:, Elm_class: []},
			};
			
		}
		
		function createElementsFromMap(elementMap){
			const element = {};
			//this function create elements And Add all Class form List
			for (const key in elementMap) {
				const data = elementMap[key];

				//this will create Element
				element[key] = document.createElement(data.Elm_type);

				//this forEach Loop add All Class into element
				data.Elm_class.forEach((cls) => {
					element[key].classList.add(cls);
				});
			}
			return element;
		}
		
		function createStrucher(element, ProdeuctData){
			const {ProductId, brand_name , product_name, mrp, final_price, Qty, unit, limits} = ProdeuctData;
			const {ThumImage, mainImage, OthImage, altText}=ProdeuctData;
			
			const { container } = element;
			const { imgFrame, discountElemt, productImg, wishBtn } = element;
			const { proDetails, brandName, productNme, rating } =element;
			const {quantityDiv, qtyValue, unitValue}=element;
			const {MRP_Div, MRP_Value,finalPrice}=element;

			const { CartBtn } = element;
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

						
			CartBtn.innerHTML = `	<!--  <div class="CartBtn "> -->
															<button class="addBtn ">ADD</button>
															<div class="counter hide">
																<button class="decrease">—</button><p class="countDis">1</p><button class="increase">+</button>
															</div>
														</div>
														<!-- </div> --> `;
			
			
			const addBtnObj = new addBtn();
			CartBtn.addEventListener("click", (event)=> addBtnObj.addBtenEvent(event, limits));
			
			container.appendChild(imgFrame);
			container.appendChild(proDetails);
			container.appendChild(CartBtn);
		}
		
	}


	eventOnItemCategory(event){
		const container= event.target.closest(".productContaner");
		const productId = container?.id;
		
		const cartBtn = event.target.closest(".CartBtn");
		if (event.target.closest(".wishList")){
			//console.log("wish");
			wishList(productId, event);
		}else if(cartBtn){
			// console.log("add btn");
		}else if(event.target.closest(".productContaner")){
			//console.log("cartBox");
			window.location.href = `prodectPage.html?id=${productId}`; // Redirect to product detail page
		}

		function wishList(pid, event) {
			console.log("Wish List button clicked for product:", pid);
			
			const fillIcon = `heartFill.svg`;
			const emptyIcon = `heartEmpty.svg`;

			//const button = event.target.closest("button");
			//const wishListIcon = button.querySelector("img");
			const wishListIcon = event.target.closest(".wishIcon");
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

	async createCatagoryRowNavbar(catagoryTestData){
		const catagoryNavbar = document.getElementById("catagoryNavbar");
		const catagoryData= await getDataFromSql("catagory") || catagoryTestData;

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

