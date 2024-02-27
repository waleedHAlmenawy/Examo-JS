/**
 * shuffle - shuffles the given array
 * @array: Array contains the question objects
 * Return: A shuffled array
*/

function shuffle(array) {
    var copy = [], n = array.length, i;

    while (n) {

        i = Math.floor(Math.random() * n--);

        copy.push(array.splice(i, 1)[0]);
    }

    return copy;
}

/**
 * changeMarkingIcon - changes the color of the flag icon
 * Description: checks if the current question is marked or not and, changes the color based on it
 * Return: undefined
*/

function changeMarkingIcon() {
    if (markedQuestions.includes(idx)) {
        mrk.style.color = "#A2FF86";
    } else {
        mrk.style.color = "#164B60"
    }
}

/**
 * addTheQustion - adds the given question's data to the DOM elements
 * @q: Object contains the question's data
 * Return: undefined
*/

function addTheQustion(q) {
    questionEle.innerText = q.question;

    answers[0].innerText = q.answers[0].answer;
    answers[1].innerText = q.answers[1].answer;
    answers[2].innerText = q.answers[2].answer;
    answers[3].innerText = q.answers[3].answer;

    questionNum.innerText = (idx + 1);
}

/**
 * getQuestions - gets quetions form the json file
 * Description: gets the questions and adds every question and its answers to an object, then adds every object to an array
 * Return: undefined
*/

async function getQuestions() {
    try {
        questionsFromJson = await fetch("../../json/questions.json");
        questionsFromJson = await questionsFromJson.json();

        questionsFromJson.length = questionsFromJson.length - 537; // 10 questions will be remain

        for (var i = 0; i < questionsFromJson.length; i++) {
            ans = [
                new Answer(questionsFromJson[i].A),
                new Answer(questionsFromJson[i].B),
                new Answer(questionsFromJson[i].C),
                new Answer(questionsFromJson[i].D)
            ];

            questions[i] = new Question(questionsFromJson[i].question, ans, questionsFromJson[i].answer);
        }

        questions = shuffle(questions);

        addTheQustion(questions[0]);
    } catch {
        alert("Something went wrong!!!");
    }
}

/**
 * nextQustion - loads the next question data to the DOM elements
 * Description: It clears the chosen answer from the previous questions, and checks if there is a chosen answer for the current question
 * Return: undefined
*/

function nextQustion() {
    if (idx < questions.length - 1) {
        if (document.getElementsByClassName("chosen")[0]) {
            document.getElementsByClassName("chosen")[0].classList.remove("chosen");
        }

        idx++;

        addTheQustion(questions[idx]);
    }

    if (chosedAnswers[idx]) {
        document.getElementById(chosedAnswers[idx]).classList.add("chosen");
    }

    changeMarkingIcon();

    if (idx == questions.length - 1) {
        nxt.style.visibility = "hidden";
    }

    pre.style.visibility = "visible";
}

/**
 * previousQustion - loads the previous question data to the DOM elements
 * Description: It clears the chosen answer from the previous questions, and checks if there is a chosen answer for the current question
 * Return: undefined
*/

function previousQustion() {
    if (idx > 0) {
        if (document.getElementsByClassName("chosen")[0]) {
            document.getElementsByClassName("chosen")[0].classList.remove("chosen");
        }

        idx--;

        addTheQustion(questions[idx]);
    }

    if (chosedAnswers[idx]) {
        document.getElementById(chosedAnswers[idx]).classList.add("chosen");
    }

    changeMarkingIcon();

    if (idx == 0) {
        pre.style.visibility = "hidden";
    }

    nxt.style.visibility = "visible";
}

/**
 * choseAnswer - removes the (chosen) style class from the previously chosen answer, and adds the (chosen) style class to the newly selected answer
 * @ele: The li element from the document that contains the answer
 * Description: The chosen class will color the answer in green
 * Return: undefined
*/

function choseAnswer(ele) {
    if (chosedAnswers[idx]) {
        document.getElementsByClassName("chosen")[0].classList.remove("chosen");
    }

    chosedAnswers[idx] = ele.id;

    document.getElementById(chosedAnswers[idx]).classList.add("chosen");
}

/**
 * markQustion - adds the current question to the markedQuestions array, and removes it if the array already includes it
 * Description: It creates a new button with the index of the question as a class name, and appends it to the DOM Tree
 * Return: undefined
*/

function markQustion() {
    if (!markedQuestions.includes(idx)) {
        markedQuestions.push(idx);

        div = document.createElement("div");

        div.setAttribute("class", idx);
        div.setAttribute("onclick", "goToMarkedQuestion(this)");

        div.appendChild(document.createTextNode("Q" + (idx + 1)));

        markedSection.appendChild(div);
    } else {
        document.getElementsByClassName(idx)[0].remove();
        markedQuestions.splice(markedQuestions.indexOf(idx), 1);
    }
    changeMarkingIcon();
}

/**
 * goToMarkedQuestion - loads the marked question data to the DOM elements
 * @ele: The div element that contains the index of the marked question
 * Description: It gets the index of the marked question from the class of the div element
 * Return: undefined
*/

function goToMarkedQuestion(ele) {
    if (document.getElementsByClassName("chosen")[0]) {
        document.getElementsByClassName("chosen")[0].classList.remove("chosen");
    }

    idx = +ele.classList[0];

    addTheQustion(questions[idx]);

    if (chosedAnswers[idx]) {
        document.getElementById(chosedAnswers[idx]).classList.add("chosen");
    }

    if (idx == 0) {
        pre.style.visibility = "hidden";
        nxt.style.visibility = "visible";
    } else if (idx == 9) {
        nxt.style.visibility = "hidden";
        pre.style.visibility = "visible";
    } else {
        nxt.style.visibility = "visible";
        pre.style.visibility = "visible";
    }
    changeMarkingIcon();
}

/**
 * sumbitQuestions - posts the data (chosen answers & the array questions) to the local storage, and navigate to the result page
 * Return: undefined
*/

function sumbitQuestions() {
    console.log(theUser);

    theUser.tokeTheExam = true;
    theUser.exam.questions = questions;
    theUser.exam.choosedAnswers = chosedAnswers;

    users.push(theUser);
    localStorage.setItem("users", JSON.stringify(users));

    window.location.replace("../../routes/result.html");
}