

class Dashbord {
	createRow() {
		const productData = this.getDataFromSQL();
	
		// Object to hold fragments per category
		const fragments = {};
		const categoryDiv={};
		const ItemCategory = document.getElementById("ItemCategory");
		productData.forEach((data) => {
			const category = data.category;
			const categoryColor = data.categoryColor;
			const categoryId = category.replace(/\s+/g, '-'); // For ID-friendly name
	
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
	
	createRowOld() {
		
		const productData = this.getDataFromSQL();
		//const {categoryColor, category}=productData;

		const fruitsCard = document.getElementById("Fruits");
		const fruits_fragment = document.createDocumentFragment();

		const TestCard = document.getElementById("test");
		const test_fragment = document.createDocumentFragment();

		const vagitableCard = document.getElementById("Vegitables");
		const vegi_fragment = document.createDocumentFragment();

		const milkProCard = document.getElementById("Milk-Product");
		const milkPro_fragment = document.createDocumentFragment();

		productData.forEach((data) => {
			let card = this.createProductCard(data);
			if (data.category.toLowerCase() === "vegitable") {
				vegi_fragment.appendChild(card);
			} else if (data.category.toLowerCase() === "fruits") {
				fruits_fragment.appendChild(card);
			} else if (data.category.toLowerCase() === "milk_product") {
				milkPro_fragment.appendChild(card);
			} else {
				test_fragment.appendChild(card);
			}
		});

		fruitsCard.appendChild(fruits_fragment);
		TestCard.appendChild(test_fragment);
		vagitableCard.appendChild(vegi_fragment);
		milkProCard.appendChild(milkPro_fragment);
	}
	createProductCard(ProdeuctData) {
		const {ProductId, brand_name , product_name, mrp, final_price} = ProdeuctData;
		const {ThumImage, mainImage, OthImage, altText}=ProdeuctData;
		const unit="mg", qty=1;
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
			quantity: { Elm_type: "p", Elm_class: ["quantity"] },
			MRP: { Elm_type: "p", Elm_class: ["mrp"] },
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
		const { proDetails, brandName, productNme, quantity, MRP, rating } =
			element;
		const { buttons } = element;
		container.id = ProductId;

		// ==== imgFrame ====
		discountElemt.innerHTML = `<span class="discountValue">${
			100 - parseInt((final_price / mrp) * 100)
		}</span>%<br>off`;

		productImg.src = `./../img/ProductImages/${ProductId}/${ThumImage}` ;
		console.log(productImg.src);
		productImg.alt = altText;

		wishBtn.innerHTML = `<img src="./img/heartEmpty.svg" alt="" class="wishIcon">`;

		imgFrame.appendChild(discountElemt);
		imgFrame.appendChild(productImg);
		imgFrame.appendChild(wishBtn);

		// ==== proDetails ====
		brandName.innerText = brand_name;
		proDetails.appendChild(brandName);

		productNme.innerText = product_name;
		proDetails.appendChild(productNme);

		quantity.innerHTML = `<span class="num">${qty}</span>&nbsp;<span class="unit">${unit}</span>`;
		proDetails.appendChild(quantity);

		MRP.innerHTML = `<span class="mrpValue">₹${mrp}&nbsp;</span>
									<span class="finalPriceValue">₹${final_price}</span>`;
		proDetails.appendChild(MRP);

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
	createProductCardROW(ProdeuctData) {
		const {ProductId, image, brand_name, product_name,mrp, final_price, category,description} = ProdeuctData;
		const unit="mg";
		return `<div class="productContaner" id="productId1">
            <div class="imgFrame">
                <p class="discount"><span class="discountValue">${parseInt(
									(final_price / mrp) * 100
								)}</span>% <br>off </p>
                <img src="${image["main"]}" alt="" class="productImg">
                <button class="wishList" onclick>
                    <img src="./img/heartEmpty.svg" alt="" class="wishIcon">
                </button>
            </div>
            <div class="proDetails">
                <p class="brandName">${brand_name}</p>
                <p class="productName">${product_name}</p>
                <p class="quantity"><span class="num">${qty}</span>&nbsp;<span class="unit">${unit}</span></p>
                <p class="mrp">
                    <span class="mrpValue">₹ ${mrp} &nbsp;</span>
                    <span class="finalPriceValue">₹ ${final_price} </span>
                </p>
                <p class="rating">
                    <span class="ratingValue">4.5</span>
                    <span class="reviewCount">(1000)</span>
                </p>
            </div>
            <div class="buttons">
                <button class="buy">Buy</button>
                <button class="addtoCart"><img src="./img/cart-arrow-down.svg" alt="add to cart" height="100%"></button>
            </div>
        </div>`;
	}
	getDataFromSQL() {
		return [
			{
				ProductId: 'prod_2',
				brand_name: 'no Brand',
				product_name: 'Fresh Apple',
				mrp: '150.00',
				final_price: '120.00',
				category: 'Fruits',
				categoryColor: 'rgb(255, 166, 0)',
				ThumImage: 'apple.jpg',
				mainImage: 'apple.jpg',
				OthImage: 'apple.jpg, apple.jpg'
			},
			{
				ProductId: 'prod_6',
				brand_name: 'no Brand',
				product_name: 'Banana',
				mrp: '60.00',
				final_price: '50.00',
				category: 'Fruits',
				categoryColor: 'rgb(255, 166, 0)',
				ThumImage: 'banana.jpg',
				mainImage: 'banana.jpg',
				OthImage: 'banana.jpg, banana.jpg'
			},
			{
				ProductId: 'prod_3',
				brand_name: 'no Brand',
				product_name: 'Organic Potato',
				mrp: '40.00',
				final_price: '35.00',
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
				category: 'Milk_Product',
				categoryColor: 'rgb(255, 239, 196)',
				ThumImage: 'strobary.jpg',
				mainImage: 'strobary.jpg',
				OthImage: 'strobary.jpg, strobary.jpg'
			},
			{
				ProductId: 'prod_5',
				brand_name: 'MotherDairy',
				product_name: 'Mother Dairy Butter',
				mrp: '250.00',
				final_price: '230.00',
				category: 'Milk_Product',
				categoryColor: 'rgb(255, 239, 196)',
				ThumImage: 'orange.jpg',
				mainImage: 'orange.jpg',
				OthImage: 'orange.jpg, orange.jpg'
			}
		];
	}
}

const myDashbord = new Dashbord();
myDashbord.createRow();

/*


*/