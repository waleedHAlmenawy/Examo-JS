var questionEle = document.getElementById("question");
var questionNum = document.getElementById("qNumber");

var markedSection = document.querySelector("#thirdSection .row");

var timer = document.getElementById("timer");
var distance = 1000 * 60 * 1;

var answers = document.querySelectorAll("#answersSection li span");

var nxt = document.getElementById("rightArrow");
var sub = document.getElementById("submit");
var pre = document.getElementById("leftArrow");
var mrk = document.getElementById("mark");

var idx = 0;
var questions = [];
var ans = [];

var chosedAnswers = [];
var markedQuestions = [];

var degree;

var users = JSON.parse(localStorage.getItem("users"));
var theUser = localStorage.getItem("current_user_email");

for(var i = 0; i < users.length; i++)
{
    if(users[i].email == theUser)
    {
        console.log(users);

        theUser = users[i];
        users.splice(i, 1);
        
        break;
    }
}

function Question(q, ans, rAns)
{
    this.question = q;
    this.answers = ans;
    this.rightAns = rAns; //
}

function Answer(ans)
{
    this.answer = ans;
}

var startTimer = setInterval(function () {
    distance -= 1000;

    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (seconds < 10) {
        timer.innerText = minutes + " : " + "0" + seconds;
    } else {
        timer.innerText = minutes + " : " + seconds;
    }

    if (distance < 0) {
        window.location.replace("../../routes/timeOut.html");
    }
}, 1000);