class addBtn{
	constructor(){
		this.addCount = 0;
	}
	addBtenEvent(event, limit){
		const cartBtn = event.target.closest(".CartBtn");
		const elemtMap= {
			addBtn : "addBtn",
			counter: "counter",
			countDis: "countDis",
			increase: "increase",
			decrease: "decrease"
		};
		const elmts={}
		for (const [elm, className] of Object.entries(elemtMap)){
			elmts[elm] = cartBtn.getElementsByClassName(className)[0];
		}
		const { addBtn, counter, countDis, increase, decrease}=elmts;
		const clicked = event.target;

		if (clicked.classList.contains("addBtn")){
			if (!clicked.classList.contains("hide")){ 
				addBtn.classList.add("hide");
				counter.classList.remove("hide");
			}
			countDis.innerText= ++this.addCount;
		
		}else if(clicked.classList.contains("increase")){
			if(this.addCount <= limit){
				countDis.innerText= ++this.addCount;
			}
		
		}else if(clicked.classList.contains("decrease")){
			countDis.innerText= --this.addCount;
			if (this.addCount<=0 ){
					if (!counter.classList.contains("hide")){ 
						counter.classList.add("hide");
						addBtn.classList.remove("hide");
					}
			}
			if (this.addCount< limit){
				increase.disabled = false;
			}
		}
		if (this.addCount == limit ) increase.disabled = true;
		
	}
	
}
// reativ update cart list banani hai 
// static #updateCartList(){
	// 	if (this.addCount>0){
	// 		console.log(this.addCount);
	// 	}
	// }