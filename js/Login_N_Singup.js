class longinNsingupDeshbord{
	constructor(){
		this.getElements();
		this.setEventLisner();
	}

	getElements(){
		this.loginBtn = document.getElementById("loginBtn");
		this.loginNsingup_container =document.getElementById("loginNsingup_container");
	}

	getFormElements(){
		this.loginForm = document.forms["loginForm"];

		this.phoneInput = loginForm["phoneNum"];
		this.phoneInput.maxLength=10;

		this.pwdInput = loginForm["pwd"];
		
		this.submitBtn = document.getElementById("submitBtn");
		this.singupBtn = document.getElementById("singupBtn");
	}

	setEventLisner(){
		
		const {loginBtn, loginNsingup_container}=this;
		
		loginBtn.addEventListener("click", ()=>{
			if (loginNsingup_container.classList.contains("hide")){
				loginNsingup_container.innerHTML = this.#addloginForm();
				this.getFormElements();
				this.setFormEventLisners();
				loginNsingup_container.classList.remove("hide");
			}
		});
		loginNsingup_container.addEventListener("click", (event)=>{
	
			if (event.target === loginNsingup_container){
				if (!event.target.classList.contains("hide")){
					event.target.classList.add("hide");
				}
			}
		});

		
	
	}
	setFormEventLisners(){
		const { loginForm, phoneInput, pwdInput, singupBtn}=this;
			/* ==== Form Related start ==== */
			document.getElementsByClassName("pwdViewIcon")[0].addEventListener("click", function(event){
				const eyeOpen = `./img/svgs/eye-open.svg`;
				const eyeClose = `./img/svgs/eye-close.svg`;
				const img = event.target;
				console.log(img.src);
				if ( img.src.includes("eye-open.svg")){
					img.src = eyeClose;
					pwdInput.type ="password";
	
				}else if(img.src.includes("eye-close.svg")){
					img.src =eyeOpen;
					pwdInput.type = "text";
				}
			});
	
			phoneInput.addEventListener("input", validateInputs);
			pwdInput.addEventListener("input", validateInputs);
	
			loginForm.addEventListener("submit", function(event){
				event.preventDefault(); // पेज reload ना हो
				validateUser();
			});
			singupBtn.addEventListener('click', ()=>{
				loginNsingup_container.innerHTML =this.#addSingupForm();
			});
			

			function validateInputs(){
				// console.log("validateing input");
				phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
				const phnum = phoneInput.value.trim();
				const pwd  = pwdInput.value.trim();
	
				const isPhoneValid =  /^\d{10}$/.test(phnum);
				const isPwdValid = pwd.length >= 4 && pwd.length <= 6;
							
				document.querySelector(".phoneNum_container").style.borderColor = isPhoneValid ? "green" : "red";
				document.querySelector(".password_container").style.borderColor = isPwdValid ? "green" : "red";
				submitBtn.disabled= !(isPhoneValid && isPwdValid);
			}
			function validateUser(){
				console.log(phoneInput.value);
				console.log(pwdInput.value);
			}
			/* ==== form related End ====*/  
	}
	
	#addloginForm(){
		return `<div class="loginContainer">
					
					<img src="./img/site/siteTitle.svg" alt="site Title">
					<p class="tagLine">Jhatpat Mangao</p>
					<p> Login or <button id="singupBtn">Signup</button></p>
					<form id="loginForm" action="" >
						<div class="phoneNum_container"><p>+91</p>
							<input type="text" name="phoneNum"  placeholder="Phone Number"  required>
						</div>
						<div class="password_container">
							<img class="pwdViewIcon" src="./img/svgs/eye-close.svg" alt="eye-close">
							<input type="password" name="pwd" placeholder="Enter password" maxlength="6" minlength="4" required>
							
						</div>
						
						<button type="submit" id="submitBtn" disabled>Continue</button>
					</form>
					<p class="term_condition">By continuing, you agree to our <a href="#">Terms of service</a> & <a href="#">Privacy policy</a></p>
				</div>`;
	}

	#addSingupForm(){
		return `
		<div id="singup_container">
				<form action="" id="singupForm">
					<h1 class="form-Title">Singup Form</h1>
					
					<fieldset id="nameInputArea"  >
						<legend class="titles">Name</legend>
						<div class="input-field">
							<input type="text" name="name" id="first_name" class="input-box" placeholder="">
							<label for="first_name">First Name</label>
						</div>
						<div class="input-field">
							<input type="text" name="name" id="mid_name" class="input-box" placeholder="">
							<label for="min_name">Mid Name</label>
						</div>
						<div class="input-field">
							<input type="text" name="name" id="last_name" class="input-box" placeholder="">
							<label for="last_name">Last Name</label>
						</div>
						
					</fieldset>
					
					<fieldset id="addressInputArea" >
						<legend class="titles">Address</legend>
						<div class="input-field" style="width:10rem;">
							<input type="text" name="address" id="houseNum" class="input-box" placeholder="">
							<label for="houseNum">House Number</label>
						</div>
						<div class="input-field" style="width:5rem;">
							<input type="text" name="Block" id="Block" class="input-box" placeholder="">
							<label for="Block">Block</label>
						</div>
						<div class="input-field" style="width:auto; min-width:13rem;">
							<input type="text" name="city" class="input-box" placeholder="">
							<label for="city" >City</label>
						</div>
						<div class="input-field" style="width:auto; min-width:13rem;">
							<input type="text" name="state" id="state" class="input-box" placeholder="">
							<label for="state">State</label>
						</div>
						<div class="input-field" style="width:15rem;">
							<input type="text" name="pinCode" id="pinCode"  maxlength="6" inputmode="numeric" title="..." class="input-box" placeholder=""/>
							<label for="pinCode">Pin Code</label>
						</div>
						
					</fieldset>
					
					<fieldset id="contact">
						<legend class="titles">Contact</legend>
						<div id="EmailInputArea" class="input-field" style="width:48%;">
							<input type="text" name="email" class="input-box" placeholder=" ">
							<label for="email">E-Mail</label>
						</div>
						<div id="phoneInputArea" class="input-field" style="width:48%;">
							<input type="text" name="phNum" class="input-box" maxlength="10" inputmode="numeric" title="..."  placeholder="" >
							<label for="phNum">Phone Number</label>
						</div>
					</fieldset>
					
					<button type="submit">continue</button>
				</form>
			</div>
		`;
	}
}