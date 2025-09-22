class indexedDB_Manager{
	constructor(myData){
		this.#connaction(myData);
	}
	#connaction(){
		const openRequest= indexedDB.open("CartTestDB", 1);
		openRequest.onsuccess = (e) => {
			console.log(`success`);
			
			const db = openRequest.result; //access or use database
			const transaction = db.transaction("cartTest", "readwrite"); //set mode for read or readWrite
			//make pointer for store data in table
			const storeObject = transaction.objectStore("cartTest");
			
			/* === Data storing start ===*/
			//adding data to table
			
			myData.forEach(data=>{
				//insertData(storeObject, data);
			});
			
			readData(storeObject);
			readByCursor(storeObject);
			deleteRow(storeObject, 1);
			
			/* === Data reading end*/ 
			
		}
		
		openRequest.onupgradeneeded = (e)=> {
			console.log("upgrade needed");
			//createing table
			const db = openRequest.result;
			if(!db.objectStoreNames.contains("cartTest")){
				const request = db.createObjectStore("cartTest", {keyPath: 'id'});
				//create  column in table
				request.createIndex("prod_id", "prod_id", {unique:true}); 
				request.createIndex("quantity", "quantity", {unique:false}); 
			}
		}

		openRequest.onerror= (e)=> {
			console.log(`error${e}`);
		}

		function readData(storeObject){
			
			/*  
				storeObject.getAll() method  all rows la kar deta hai.
				iksme limit bhi laga sakte hain.
				iske argument me ye method pass karke (IDBKeyRange.bound(1,3))
			*/
			const request = storeObject.getAll();
			//storeObject.get(); //get only one data (argument me id ki value bhi daal sakte hain eg 1,2,3) 
			request.onsuccess = (e)=>{
				let getData=null;
				
				getData = e.target.result;
				console.log(getData);
				
				return getData;
			}
			request.onerror = (e)=>{
				console.log(e);
			}
		}

		function readByCursor(storeObject){
			let request = storeObject.openCursor();
			request.onsuccess = (e)=>{
				let cursor = request.result;
				if(cursor){
					let {key, value} = cursor;
					console.log(key, JSON.stringify(value, null, 1));
					cursor.continue();
				}else{
					console.log("no more Entries");
				}
			}
			
			request.onerror = (e)=>{
				console.log(e);
			}
		}
		function insertData(storeObject, data){
			const request =storeObject.add(data); //ye same key milne par error throw karta hai
			//const request =storeObject.put(data); //ye same key milne par usme update kardeta hai
			/*
				const request = storeObject.add({
					id: 1,
					prod_id: "prod_1",
					quantity: 3,
				});
			*/
			request.onsuccess = (e) =>{
				console.log("in susscess")
				console.log(e.target.result);
			}

			request.onerror = (e) => {
				console.log(`error ${e}`);
			}
		}

		function deleteRow(storeObject, rowNum){
			const request =  storeObject.delete(rowNum);
			request.onsuccess = (e)=>{
				console.log(e);
			}
			request.onerror = (e)=>{
				console.log(e);
			}
		}

	}
}
