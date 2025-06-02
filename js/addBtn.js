import {cartDataManager} from './cartDataManager.js';
import { cartDeshBord} from './cartManager.js';
const cartObj= new cartDeshBord();


const addBtnList = {}
export function  getAdd2CartBtnStrucher(prodId, limits){
	// if (addBtnList[prodId]){
	// 	console.log(addBtnList[prodId]);
	// 	addBtnList[prodId].refresh();
	// 	return addBtnList[prodId].add2CartBtnStrucher();
	// }else{
	// 	const newBtn = new add2CartBtnManager(prodId, limits);
		
	// 	addBtnList[prodId]= newBtn;
	// 	return newBtn.add2CartBtnStrucher();
	// }
		const newBtn = new add2CartBtnManager(prodId, limits);
		return newBtn.add2CartBtnStrucher();
}
class add2CartBtnManager{
	#elemts={};
	constructor(prodId, limit){
		this.prodId = prodId;
		this.limit =limit;
		this.itemCount = cartDataManager.GetValueFormLocalStorage(this.prodId);
		this.#elemts =this.#createElements();
		this.#setStrucher();
		this.#elemts.add2CartBtn.addEventListener("click", event => this.addBtenEvent(event));
	}
	#createElements(){
		const elemtMap= {
			add2CartBtn : {type:"div", classList: ["add2CartBtn"]},
			addBtn : {type:"button", classList:["addBtn"]},
			counter: {type:"div", classList:["counter"]},
			countDis: {type:"p", classList:["countDis"]},
			increase: {type:"button", classList:["increase"]},
			decrease: {type:"button", classList:["decrease"]}
		};

		const elmts={};
		for (const [elm, struct] of Object.entries(elemtMap)){
			const newElemnt = document.createElement(struct.type);
			struct.classList.forEach(clsNme=>{
				newElemnt.classList.add(clsNme);
			});
			elmts[elm] = newElemnt;
		}
		return elmts;
	}

	#setStrucher(){
		const {add2CartBtn,  addBtn, counter, countDis, increase, decrease}=this.#elemts
		addBtn.innerText = "ADD";

		add2CartBtn.append(addBtn);
		
		decrease.innerText = "—";
		increase.innerText = "+";
		if (this.limit == this.itemCount){
			increase.disabled = true;
		}
		
		countDis.innerText = this.itemCount;
		if (this.itemCount>0){
			this.#hideAddBtn();
		}else{
			this.#showAddBtn();
		}
		
		counter.append(decrease);
		counter.append(countDis);
		counter.append(increase);
		add2CartBtn.append(counter);
	}
	addBtenEvent(event) {
	const { addBtn, counter, countDis, increase, decrease } = this.#elemts;
	const clicked = event.target;

	if (clicked.classList.contains("addBtn")) {
		this.itemCount++;
		this.#hideAddBtn();
	} else if (clicked.classList.contains("increase")) {
		if (this.itemCount < this.limit) {
			this.itemCount++;
		}
	} else if (clicked.classList.contains("decrease")) {
		if (this.itemCount > 0) {
			this.itemCount--;
		}
	}

	// Update LocalStorage
	cartDataManager.SetValueInLocalStorage(this.prodId, this.itemCount);

	// Update Counter UI
	countDis.innerText = this.itemCount;

	// Show or hide buttons based on count
	if (this.itemCount <= 0) {
		this.#showAddBtn();      // ✅ जब count 0 हो, तो Add दिखाओ
	} else {
		this.#hideAddBtn();      // ✅ जब count > 0 हो, तो counter दिखाओ
	}

	// Handle limit disable
	increase.disabled = this.itemCount >= this.limit;

	// Cart update
	if (typeof cartObj?.updateCartList === "function") {
		cartObj.updateCartList("from Add");
	}
}
	addBtenEventOld(event){
		const {add2CartBtn,  addBtn, counter, countDis, increase, decrease}=this.#elemts;
		
		const clicked = event.target;

		if (clicked.classList.contains("addBtn")){
			//if (!clicked.classList.contains("hide")|| this.itemCount>0){this.#hideAddBtn();}
			if (this.itemCount>0){
				this.#hideAddBtn();
			}
			countDis.innerText= ++this.itemCount;
			cartDataManager.SetValueInLocalStorage(this.prodId, this.itemCount);
		
		}else if(clicked.classList.contains("increase")){
			if(this.itemCount <= this.limit){
				countDis.innerText= ++this.itemCount;
				cartDataManager.SetValueInLocalStorage(this.prodId, this.itemCount);
			}
		
		}else if(clicked.classList.contains("decrease")){
			countDis.innerText= --this.itemCount;
			cartDataManager.SetValueInLocalStorage(this.prodId, this.itemCount);
			if (this.itemCount<=0 ){
				this.#showAddBtn();	
				//if (!counter.classList.contains("hide")){ 
						//this.#showAddBtn();
					//}
			}
			if (this.itemCount< this.limit){
				increase.disabled = false;
			}
		}
		if (this.itemCount == this.limit ) increase.disabled = true;

		cartObj.updateCartList("from Add");
		this.refresh();
	}

	#hideAddBtn(){
		const {addBtn, counter} = this.#elemts;
		addBtn.classList.add("hide");
		counter.classList.remove("hide");
	}
	#showAddBtn(){
		const {addBtn, counter} = this.#elemts;
		counter.classList.add("hide");
		addBtn.classList.remove("hide");
	}
	
	add2CartBtnStrucher(){
		const {add2CartBtn} = this.#elemts;
		//BtnContainer.append(add2CartBtn);
		
		return add2CartBtn;
	}
	refresh() {
		this.itemCount = cartDataManager.GetValueFormLocalStorage(this.prodId);

		const { countDis, increase } = this.#elemts;

		countDis.innerText = this.itemCount;

		if (this.itemCount > 0) {
			this.#hideAddBtn();
		} else {
			this.#showAddBtn();
		}

		if (this.itemCount >= this.limit) {
			increase.disabled = true;
		} else {
			increase.disabled = false;
		}
	}
}

/*
 `<div class="add2CartBtn">
							<button class="addBtn ">ADD</button>
							<div class="counter hide">
								<button class="decrease">—</button><p class="countDis">1</p><button class="increase">+</button>
							</div>
						</div>`
*/ 