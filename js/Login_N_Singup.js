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
		const { loginForm, phoneInput, pwdInput}=this;
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
					<p> Login or <a href="#">Signup</a></p>
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
}