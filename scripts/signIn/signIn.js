var btn = document.getElementById("btn");
var email = document.getElementById("email");
var pass = document.getElementById("pass");

var megs = document.getElementsByTagName("p");
var signInBtn = document.getElementById("signInBtn");

var theUser;

const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

users = JSON.parse(localStorage.getItem("users"));

btn.addEventListener("click", (e) => {
    if (email.value && pass.value) {
        megs[0].style.visibility = "hidden";
        megs[1].style.visibility = "hidden";
        if (!(re.test(email.value))) {
            e.preventDefault();
            megs[0].textContent = "enter valid email format";
            megs[0].style.visibility = "visible";
        } else if (pass.value.length < 8) {
            e.preventDefault();
            megs[0].style.visibility = "hidden";
            megs[1].textContent = "password must be 8 letters or more";
            megs[1].style.visibility = "visible";
        } else {
            for (var i = 0; i < users.length; i++) {
                if (email.value === users[i].email && pass.value === users[i].password) {
                    theUser = users[i];
                    break;
                }
            }

            if (!theUser) {
                e.preventDefault();
                megs[1].style.visibility = "hidden";
                megs[0].textContent = "invalid email or password";
                megs[0].style.visibility = "visible";

            } else {
                localStorage.setItem("current_user_email", email.value);

                if (theUser.tokeTheExam) {
                    window.location.replace("../../result.html");
                } else {
                    window.location.replace("../../examination.html");
                }
            }
        }
    } else {
        e.preventDefault();
        megs[0].textContent = "fileds must not be empty";
        megs[0].style.visibility = "visible";
    }
});

signInBtn.addEventListener("click", () => {
    window.location.replace("../../index.html")
})