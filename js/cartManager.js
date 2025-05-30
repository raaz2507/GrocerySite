export class cartDeshBord{
	#elemts;
	constructor(){
		this.#elemts= this.#getElements();
		this.#setEvents();
		this.#createCartItem();
	}
	#getElements(){
		const mainCartContaner =  document.createElement("div");
		mainCartContaner.id = "mainCartContaner";
		mainCartContaner.innerHTML = this.#cartBtnStrucher() + this.#cartSideBarStrucher();
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
		const limit=1;
		cartList.addEventListener('click', (event)=>{
			const clicked =event.target.closest("button");
			if(clicked){
				console.log(clicked);
				const cartItems = clicked.closest(".cartItems");
				console.log(cartItems?.id);
				// decrease increase
				if (clicked.classList.contains("increase")){
					const dis = getDisElemt(clicked);
					let value = Number(dis.innerText);
					if (value<limit){
						value += 1;
						dis.innerText = value;
					}
					if(value==limit){
						clicked.disabled = true;
					}

				}else if (clicked.classList.contains("decrease")){
					const dis=getDisElemt(clicked);

					const value =dis.innerText;
					if(value>1){
						dis.innerText= Number(dis.innerText)-1;
						const incBtn = clicked.parentElement.querySelector(".increase");
						if (incBtn) incBtn.disabled = false;
					}else{
						cartItems.remove();
					}
					
				}else if (clicked.classList.contains("close")){
					cartItems.remove();
				}
			} 
			
			
		});
		function getDisElemt(clk){
			return clk.parentElement.getElementsByClassName("disQuantity")[0];
		}

	}
	#createCartItem(){
		const fragment= document.createDocumentFragment();
		const elemtMap={
			cartItems:{type: "div", classes:["cartItems"]},
			close:{type: "button", classes:["close"]},
			productImg:{type: "div", classes:["productImg"]},
			img:{type: "img", classes:[]},
			productDetails:{type: "div", classes:["productDetails"]},
			productName:{type: "div", classes:["productName"]},
			quantity:{type: "div", classes:["quantity"]},
			price:{type: "div", classes:["price"]},
			mrp:{type: "span", classes:["mrp"]},
			paybleAmount:{type: "span", classes:["paybleAmount"]},
			Add_Btn:{type: "div", classes:["Add_Btn"]},
			decrease:{type: "button", classes:["decrease"]},
			increase:{type: "button", classes:["increase"]},
			disQuantity:{type: "button", classes:["disQuantity"]}
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
		//fragment.appendChild(createStrucher(elemts));
		//return fragment;
		function createStrucher(elemts, productId="prod_1"){
			const {cartItems, close, productImg, img, productDetails, productName, quantity, price, mrp, paybleAmount, Add_Btn, decrease, increase, disQuantity} = elemts;
			cartItems.append(close);
			
			img.src='/img/{productId}/img1.jpg';
			img.alt=`{productId} imgage`;
			productImg.append(img);
			cartItems.append(productImg);

			productDetails.append(productName);
			productDetails.append(quantity);

			price.append(mrp);
			price.append(paybleAmount);
			productDetails.append(price);

			cartItems.append(productDetails);

			Add_Btn.append(decrease);
			Add_Btn.append(disQuantity);
			Add_Btn.append(increase);
			cartItems.append(Add_Btn);
			
			return cartItems;
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
		return `<div id="cartListContainer" class="hide, SlideVisual">
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
