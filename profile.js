function update(){
    let errmsg = "";
    let unitsuccessmsg = "";
    let successmsg = "";
    // Update Display name
    const displayName = document.getElementById("new-display-name").value;
    if(displayName!== ""){
        unitsuccessmsg = "Successfully Updated Display Name from " + document.getElementById("display-name").innerHTML + " to " + displayName + "." + "<br>";
        successmsg += unitsuccessmsg;
        document.getElementById("display-name").innerText = displayName;
    }
    // Check email
    const email = document.getElementById("new-email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(email !== ""){
        if(!emailRegex.test(email)) {
            errmsg += "Incorrect Email Format: yourmail@aaa.bbb.<br>";
        }
        else{
            unitsuccessmsg = "Successfully Updated Email from " + document.getElementById("email").innerHTML + " to " + email + "." + "<br>";
            successmsg += unitsuccessmsg;
            document.getElementById("email").innerText = email;
        }
    }
    // Check phone (only digits and no special characters)
    const phone = document.getElementById("new-phone").value;
    const phoneRegex = /^\d+$/;
    if(phone !== "") {
        if (!phoneRegex.test(phone)) {
            errmsg += "Incorrect Phone Format: only digits.<br>";
        } else {
            unitsuccessmsg = "Successfully Updated Phone from " + document.getElementById("phone").innerHTML + " to " + phone + "." + "<br>";
            successmsg += unitsuccessmsg;
            document.getElementById("phone").innerText = phone;
        }
    }
    // Check zipcode
    const zipcode = document.getElementById("new-zipcode").value;
    const zipcodeRegex = /^\d{5}$/;
    if(zipcode !== ""){
        if (!zipcodeRegex.test(zipcode)) {
            errmsg += "Incorrect Zipcode format: 5 digits.<br>";
        } else {
            unitsuccessmsg = "Successfully Updated from " + document.getElementById("zipcode").value + " to " + zipcode + "." + "<br>";
            successmsg += unitsuccessmsg;
            document.getElementById("zipcode").innerText = zipcode;
        }
    }
    // Check Password
    const pwd1 = document.getElementById("new-password").value;
    const pwd2 = document.getElementById("password-confirmation").value;
    if(pwd1 !=="" || pwd2 !==""){
        if(pwd1!==pwd2){
            errmsg += "Incorrect Password: confirmation does not match.<br>";
        }
        else{
            unitsuccessmsg = "Successfully Updated Password.<br>"
            successmsg += unitsuccessmsg;
            document.getElementById("password").innerText = '*'.repeat(pwd1.length);
        }
    }

    // Clear all fields
    const inputElements = document.getElementsByTagName('input');

    for (let i=0; i < inputElements.length; i++) {
        if (inputElements[i].type === 'text' || inputElements[i].type === 'password') {
            inputElements[i].value = '';
        }
    }
    // If any errors, show the error message
    document.getElementById("error-message").innerHTML = errmsg;
    if(errmsg !== "") {
        document.getElementById("error-message").parentElement.classList.remove("hidden");
        document.getElementById("error-message").innerHTML = errmsg;
    }
    else{
        document.getElementById("error-message").parentElement.classList.add("hidden");
    }
    if(successmsg !== ""){
        document.getElementById("success-message").parentElement.classList.remove("hidden");
        document.getElementById("success-message").innerHTML = successmsg;
    }
    else{
        document.getElementById("success-message").parentElement.classList.add("hidden");
    }
}

function setUp() {
    document.getElementById("update-profile").addEventListener('click', update);
}