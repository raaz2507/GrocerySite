import {cartDataManager} from './cartDataManager.js';
import { cartDeshBord} from './cartManager.js';

export class add2CartBtnManager{
	#elemts={};
	constructor(prodId, limit){
		this.prodId = prodId;
		this.limit =limit;
		this.itemCount = cartDataManager.GetValueFormLocalStorage(this.prodId);
	}
	#createElements(){
		const elmts={};
		const elemtMap= {
			add2CartBtn : {type:"div", classList: ["add2CartBtn"]},
			addBtn : {type:"button", classList:["addBtn"]},
			counter: {type:"div", classList:["counter"]},
			countDis: {type:"p", classList:["countDis"]},
			increase: {type:"button", classList:["increase"]},
			decrease: {type:"button", classList:["decrease"]}
		};

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
	
	addBtenEvent(event){
		const {add2CartBtn,  addBtn, counter, countDis, increase, decrease}=this.#elemts;
		
		const clicked = event.target;

		if (clicked.classList.contains("addBtn")){
			if (!clicked.classList.contains("hide")|| this.itemCount>0){
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
					if (!counter.classList.contains("hide")){ 
						this.#showAddBtn();
					}
			}
			if (this.itemCount< this.limit){
				increase.disabled = false;
			}
		}
		if (this.itemCount == this.limit ) increase.disabled = true;	
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
	
	add2CartBtnStrucher(BtnContainer){
		
		this.#elemts =this.#createElements();
		const {add2CartBtn} = this.#elemts;
		this.#setStrucher();
		
		BtnContainer.append(add2CartBtn);

		add2CartBtn.addEventListener("click", event => this.addBtenEvent(event));
		//return this.#elemts.add2CartBtn;
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