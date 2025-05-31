import {cartDataManager} from './cartDataManager.js';
import {SQLData} from './sqlDataManager.js';
import {add2CartBtnManager} from './addBtn.js';

export class cartDeshBord{
	#elemts;
	constructor(){
		this.#elemts= this.#getElements();
		this.#setEvents();
		
	}
	updateCartList(){
		const fragment= document.createDocumentFragment();

		//step 1 get all procut id's list
		// get data about produt 
		// get data about proct add count
		//update on every click
		const itemListData = cartDataManager.getAllCartItemsList();
		//console.log(itemListData);
		const ListItems={};
		itemListData.forEach((data)=>{
			const {prod_id, qty} = data;
			// console.log(`${prod_id } ${qty}`);
			if (qty<= 0 && ListItems?.prod_id ){
				delete ListItems.prod_id;
			}
			if(qty>0 && (ListItems?.prod_id !== undefined)){
				ListItems[prod_id] =this.#createCartItem(prod_id);
			}
		});
		for (const [items] of Object.keys(ListItems)){
			fragment.appendChild(items);
		}
		
		this.#elemts.cartList.append( fragment );
	}

	#getElements(){
		const mainCartContaner =  document.createElement("div");
		mainCartContaner.id = "mainCartContaner";
		// const mainCartContaner = document.getElementById("mainCartContaner");

		mainCartContaner.innerHTML = this.#cartBtnStrucher() + this.#cartSideBarStrucher();
		//mainCartContaner.append(this.#cartBtnStrucher());

		mainCartContaner.append(this.#cartSideBarStrucher());
		
		document.body.append(mainCartContaner);


		const expendBtn= document.getElementById("expendBtn");
		const collapseBtn= document.getElementById("collapseBtn");
		const cartBtnContainer =document.getElementById("cartBtnContainer");
		const cartListContainer=document.getElementById("cartListContainer");
		const cartList=document.getElementById("cartList"); 
		// const =document.getElementById(""); 
		//🗑️
		return {cartBtnContainer, cartListContainer, expendBtn, collapseBtn, cartList};
	}
	#setEvents(){
		const {cartBtnContainer, cartListContainer, expendBtn, collapseBtn}= this.#elemts;
		expendBtn.addEventListener('click', switch2List);
		collapseBtn.addEventListener('click', switch2Btn);
		
		function switch2List(){
			cartBtnContainer .classList.add("hide");
			cartListContainer.classList.remove("hide");
		}

		function switch2Btn(){
			cartBtnContainer.classList.remove("hide");
			cartListContainer.classList.add("hide");
			//togalClass();
		}

		
		//====================
		cartList.addEventListener('click', handleCartItemClick);
		function handleCartItemClick(event) {
			const clickedEl = event.target;
			const cartItem = clickedEl.closest(".cartItems");
			if (cartItem) {
				const prodId = cartItem.dataset.productID;
				const itemCount = cartDataManager.GetValueFormLocalStorage(prodId);

				// 💥 Remove if quantity is zero
				if (itemCount <= 0) {
					cartItem.remove();
				}

				// ❌ If close button clicked
				if (clickedEl.classList.contains("close")) {
					cartDataManager.SetValueInLocalStorage(prodId, 0);
					cartItem.remove();
				}
			}
		}

	}

	#createCartItem(prodId){
			const elemtMap={
				cartItems:{type: "div", classes:["cartItems"]},
				close:{type: "button", classes:["close"]},
				productImg:{type: "div", classes:["productImg"]},
				img:{type: "img", classes:[]},
				productDetails:{type: "div", classes:["productDetails"]},
				productName:{type: "div", classes:["productName"]},
				quantity:{type: "div", classes:["quantity"]},
				price:{type: "div", classes:["price"]},
				mrp_value:{type: "span", classes:["mrp"]},
				paybleAmount:{type: "span", classes:["paybleAmount"]},
				addBtnContainer: {type: "div",  classes: ["addBtnContainer"]}, 
				// Add_Btn:{type: "div", classes:["Add_Btn"]},
				// decrease:{type: "button", classes:["decrease"]},
				// increase:{type: "button", classes:["increase"]},
				// disQuantity:{type: "button", classes:["disQuantity"]}
			};
			Object.freeze(elemtMap);
			// Object.fromEntries(elemtMap);
			const elemts={};
			
			//create elements
			for (const [name, struct] of Object.entries(elemtMap)){
				const elm= document.createElement(struct.type);
				struct.classes.forEach((cls)=>{
					elm.classList.add(cls);
				});
				elemts[name]= elm;
			}
		
			createStrucher(elemts, prodId);
			
			return elemts.cartItems;

		async function createStrucher(elemts, productId){
			const {cartItems, close, productImg, img, productDetails, productName, quantity, price, mrp_value, paybleAmount, addBtnContainer} = elemts; //, Add_Btn, decrease, increase, disQuantity
			
			const prodData = await SQLData.getSortProductData(productId);
			
			const {ProductId, product_name, brand_name,mrp, final_price, Qty, unit, limits, categoryColor, ThumImage}= prodData;

			cartItems.dataset.productID = ProductId; //its set dataset-productID="prod_1"

			close.innerText = 'X';
			cartItems.append(close);
			
			img.src=`./img/ProductImages/${productId}/${ThumImage}`;
			img.alt=`${productId} imgage`;
			productImg.append(img);
			cartItems.append(productImg);
			
			productName.innerText = product_name;
			productDetails.append(productName);

			quantity.innerText =`${Qty} ${unit}`;
			productDetails.append(quantity);
			
			if(mrp !==final_price){
				mrp_value.innerText = `₹${mrp}`;
				price.append(mrp_value);
			}
			

			paybleAmount.innerText = ` ₹${final_price}`;
			price.append(paybleAmount);
			
			productDetails.append(price);
			cartItems.append(productDetails);
		
			// decrease.innerText = '-';
			// Add_Btn.append(decrease);
			
			// Add_Btn.append(disQuantity);
			// increase.innerHTML= '+';
			// Add_Btn.append(increase);
			// cartItems.append(Add_Btn);
			
			const addBtnObj = new add2CartBtnManager(ProductId, limits);
			addBtnObj.add2CartBtnStrucher(addBtnContainer);
			cartItems.append(addBtnContainer);

			cartItems.style.backgroundColor = categoryColor;
		}
	}


	#cartBtnStrucher(){
		return `<div id="cartBtnContainer" class="FadeVisual">
			<div id="cardItemsCount">
				<p>Items <span class="TotalItemValue">2</span></p>
				<p>Amont ₹<span class=" TotalAumountValue">10</span></p>
			</div>
			<button class="BtnStyle" id="expendBtn">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
					<path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
				</svg>
			</button>
		</div>`;
	}

	#cartSideBarStrucher(){
		return `<div id="cartListContainer" class="hide SlideVisual">
			<div id="cartList"><!-- cart items start --></div>
			<div id="cartFooter">
					<button class="BtnStyle" id="collapseBtn">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
							<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
						</svg>
					</button>
					<div id="cartSummary">
						<p id="totalAmount">Total Amount: ₹<span id="totalAmountValue">100</span></p>
						<p id="paybleAmount">Palyble Amount: ₹<span id="paybleAmountValue">80 </span></p>
						<p id="saveAmount">You saved: ₹<span id="savedAmountValue">20 </span><span id="savePercentage">20</span>% off</p>
						<button id="continueToPay">Continue</button>
					</div>
				</div>
			</div>
		</div>`;
	}
}
/*
#cartSideBarStrucher(){
const elemtMap={
			cartListContainer:{type: 'div', id:"cartListContainer", classList:["hide", "SlideVisual"]},
			cartList :{type: 'div', id:'cartList', classList:[]},
			cartFooter :{type: 'div', id:'cartFooter', classList:[]},
			collapseBtn :{type: 'button', id:'collapseBtn', classList:['BtnStyle']},
			cartSummary:{type: 'div', id:'cartSummary', classList:[]},
			totalAmount:{type: 'p', id:'totalAmount', classList:[]},
			paybleAmount:{type: 'p', id:'paybleAmount', classList:[]},
			saveAmount:{type: 'p', id:'saveAmount', classList:[]},
			savePercentage: {type:'span', id: 'savePercentage', classList:[]},
			continueToPay: {type:'button', id: 'continueToPay', classList:[]}
		}
		const elemts={}
		for (const[name, value] of Object.entries(elemtMap)){
			 const newElemt= document.createElement(value.type);
			newElemt.id= value.id;
			
			value.classList.forEach(cls=>{
				newElemt.classList.add(cls);
			});
			elemts[name]= newElemt;
		}
		
		setStrucher(elemts);
		return elemts.cartListContainer;

		function setStrucher(elemts){
			const { cartListContainer, cartList, cartFooter, collapseBtn, cartSummary, totalAmount, paybleAmount, saveAmount, savePercentage, continueToPay }=elemts;
			cartListContainer.append(cartList);
			
			
			collapseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
							<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
						</svg>`;
			cartFooter.append(collapseBtn);

			totalAmount.innerHTML = `Total Amount: ₹ ${100}`;
			cartSummary.append(totalAmount);

			paybleAmount.innerHTML = `Palyble Amount: ₹ ${80}`;
			cartSummary.append(paybleAmount);
			
			saveAmount.innerHTML = `You saved: ₹ ${20} `;
			savePercentage.innerHTML = `${20} % OFF`;
			saveAmount.append(savePercentage);
			cartSummary.append(saveAmount);

			cartSummary.append(continueToPay);
			cartFooter.append(cartSummary);
			cartListContainer.append(cartFooter);
			
		}
}
*/