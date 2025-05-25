class addBtn{
	constructor(){
		this.#addButton();
	}
	#addButton(){
		const cartBtn  = document.getElementsByClassName("CartBtn")[0];
		const addBtn   = cartBtn.getElementsByClassName("addBtn")[0]; 
		const counter  = cartBtn.getElementsByClassName("counter")[0];
		const countDis = cartBtn.getElementsByClassName("countDis")[0];
		const increase = cartBtn.getElementsByClassName("increase")[0];
		const decrease = cartBtn.getElementsByClassName("decrease")[0];

		let addCount = 0;
		const limit = 2;

		cartBtn.addEventListener('click', (event)=>{
			const clicked =event.target;

			if (clicked.classList.contains("addBtn")){
				if (!clicked.classList.contains("hide")){ 
					addBtn.classList.add("hide");
					counter.classList.remove("hide");
				}
				countDis.innerText= ++addCount;
			
			}else if(clicked.classList.contains("increase")){
				if(addCount <= limit){
					countDis.innerText= ++addCount;
				}
			
			}else if(clicked.classList.contains("decrease")){
				countDis.innerText= --addCount;
				if (addCount<=0 ){
						if (!counter.classList.contains("hide")){ 
							counter.classList.add("hide");
							addBtn.classList.remove("hide");
						}
				}
				if (addCount< limit){
					increase.disabled = false;
				}
			}
			if (addCount == limit ) increase.disabled = true;
		});
	}
}