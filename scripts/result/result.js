var state = document.getElementById("state");
var degree = document.getElementById("degree");
var userName = document.getElementById("name");
var img = document.querySelectorAll("img")[1];
var paragraph = document.querySelector("p");

var users = JSON.parse(localStorage.getItem("users"));
var theUser = localStorage.current_user_email;

var deg = 0;

for(var i = 0; i < users.length; i++)
{
    if(users[i].email == theUser)
    {
        theUser = users[i];
        break;
    }
}

for (var i = 0; i < theUser.exam.questions.length; i++)
{
    if(theUser.exam.questions[i].rightAns == theUser.exam.choosedAnswers[i])
    {
        deg += 10;
    }
}

if (deg >= 50) {
    img.setAttribute("src", "../../assets/elements/winners/pana.svg");
    state.textContent = "Congregate";
} else {
    img.setAttribute("src", "../../assets/elements/feeling-sorry/rafiki.svg");
    paragraph.style.top = "20px";
    state.textContent = "Sorry";
}

degree.textContent = deg;
userName.textContent = theUser.fristName + " " + theUser.lastName;