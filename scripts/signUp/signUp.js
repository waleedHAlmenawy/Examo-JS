'use strict';

const btn = document.getElementById("btn");
const loginBtn = document.getElementById("loginBtn");

const fristName = document.getElementById("fristName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const machPasword = document.getElementById("machPasword");

const rxgName = /^[A-Za-z]+$/;
const rxgEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const rxgPassword = /^.{3,}$/;

var msgs = document.getElementsByTagName("p");

var users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

btn.addEventListener("click", (e) => {
    var flag = true;
    
    if (!rxgName.test(fristName.value)) {
        flag = false;

        msgs[0].textContent = "enter valid frist name";
        msgs[0].style.visibility = "visible";
    } else {
        msgs[0].style.visibility = "hidden";
    }
    
    if (!rxgName.test(lastName.value)) {
        flag = false;
        msgs[1].textContent = "enter valid frist name";
        msgs[1].style.visibility = "visible";
    } else {
        msgs[1].style.visibility = "hidden";
    }
    
    if (!rxgEmail.test(email.value)) {
        flag = false;
        msgs[2].textContent = "enter valid email";
        msgs[2].style.visibility = "visible";
    } else {
        msgs[2].style.visibility = "hidden";
    }
    
    for (var i = 0; i < users.length; i++)
    {
        if(users[i].email == email.value)
        {
            flag = false;
            
            msgs[2].textContent = "this email already used";
            msgs[2].style.visibility = "visible";
        }
    }

    if (!rxgPassword.test(password.value)) {
        flag = false;
        msgs[3].textContent = "enter valid password";
        msgs[3].style.visibility = "visible";
    } else {
        msgs[3].style.visibility = "hidden";

        if (password.value.length < 8) {
            flag = false;
            msgs[3].textContent = "enter more than 8 characters";
            msgs[3].style.visibility = "visible";
        } else {
            msgs[3].style.visibility = "hidden";
        }
    }
    
    if (machPasword.value !== password.value) {
        flag = false;
        msgs[4].textContent = "must match the prevous password";
        msgs[4].style.visibility = "visible";
    } else {
        msgs[4].style.visibility = "hidden";
    }
    
    if (flag)
    {
        const obj = {
            fristName: fristName.value,
            lastName: lastName.value,
            email: email.value,
            password: password.value,
            tokeTheExam: false,
            exam:{
                questions: [],
                choosedAnswers: []
            }
        };
        
        users.push(obj);
        localStorage.setItem("users", JSON.stringify(users));

        window.location.replace("/routes/signIn.html");
    } else {
        
        e.preventDefault();
    }
});

loginBtn.addEventListener("click", () => {
    window.location.replace("/routes/signIn.html");
})