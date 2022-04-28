const URL = ""
function login(){
    if (email.value != "sauth@gmail.com" || password.value != "123"){
        message_alert.style.display = "block";
    }else{
        axios.get(URL).then((result)=>{
            console.log(result);
        })
    }
}




let message_alert = document.querySelector(".alert")
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let btn_submit = document.querySelector("#login");
btn_submit.addEventListener("click",login)