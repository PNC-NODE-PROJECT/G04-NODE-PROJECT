//URL OF SCORES
const URL = 'http://localhost:8000/scores/'

// GET QUIZ TYPE FROM THE SERVER
function getQuizesTypeFromServer(){
    axios.get("/quizes/quiz-title").then((result)=>{
        array_of_quiz = result.data;
        displayQuizOptionalInDOM(array_of_quiz);
    })
}

// // DISPLAY QUIZ TYPE IN THE DOM
function displayQuizOptionalInDOM(array_of_quiz){
    for (let i=0; i<array_of_quiz.length;i++){
        let card = document.createElement("div");
        card.className = "card-quiz";
        card.id = array_of_quiz[i]._id;
        let card_header = document.createElement("div");
        card_header.className = "card-header bg-primary text-light";
        let h2 = document.createElement("h4");
        h2.className = "card-title";
        h2.textContent = array_of_quiz[i].title;
        card_header.appendChild(h2);
        card.appendChild(card_header);
        let para = document.createElement("h6");
        para.classList = "card-body";
        para.textContent = "Improve your English with " +  array_of_quiz[i].title
        card.appendChild(para)
        let card_footer = document.createElement("div");
        card_footer.className = "card-footer";
        let btn_play = document.createElement("button");
        btn_play.className = "btn btn-primary mx-1";
        btn_play.id = "playQuize";
        btn_play.textContent = "PRACTICE NOW";
        card_footer.appendChild(btn_play)
        card.appendChild(card_footer)
        type_quizes.appendChild(card);
    }
    let buttons = document.querySelectorAll("#playQuize");
    buttons.forEach(btn => {
        btn.addEventListener("click",playByQuizType);
    });
}
// // GET QUIZ ID BY EVENT TARGET
let quizID = 0 ;
function playByQuizType(e){
    quizID = e.target.parentElement.parentElement.id;
    requestData(quizID);
    show(screenToDisplay);
    hide(type_quizes);
}
function requestData(id){
    axios.get("/questions/quiz-title/"+id).then((result)=>{
        if (result.data.length != 0){
            saveDataInLocalStorage(result.data)
        }else {
            show(type_quizes_none);
            hide(btn_go_to_score);
        }
    })
}
 // Store data in local storage
function saveDataInLocalStorage(list_of_questions){
    localStorage.setItem("data",JSON.stringify(list_of_questions));
    getDataFromLocalStorage();
}
// Get data from local storage
function getDataFromLocalStorage(){
    let data = JSON.parse(localStorage.getItem("data"));
    playQuiz(data);
}
// GLOBAL VARIABLE
let temperaryData = [];
let index = 0;
let progrees = 0;
let global_scores = 0;
let good_and_bad = [];
let id_good_and_bad = [];
let array_of_quiz = [];
let list_of_score = [];
// CREATE QUIZ TEMPLATE
function playQuiz(list_of_questions) {
    hide(btn_go_to_score);
    while (screenToDisplay.firstChild) {
        screenToDisplay.removeChild(screenToDisplay.lastChild);
    }
    if (index < list_of_questions.length){
        // GET QUESTION FROM ARRAY OF OBJECTS
        let content_question  = document.createElement("div");
        content_question.classList = "container-fluid w-75 p-0";
        content_question.id  = list_of_questions[index]['_id'];
        let card = document.createElement("div");
        card.className = "question";
        let question = document.createElement("h4")
        question.textContent = list_of_questions[index]['title'];
        card .appendChild(question);
        // CHANGE ANSWER ALL TIME WHENEVER USER CLICK NEXT
        // CREATE LIST FOR ANSWER-1
        let content_answers = document.createElement("div");
        content_answers.classList = "answers mt-3 p-3";

        let box1 = document.createElement("div");
        box1.classList = "box d-flex";

        let answer_1 = document.createElement("div");
        answer_1.classList = "btn w-50 btn-warning";
        answer_1.id = "A";
        answer_1.textContent = list_of_questions[index]["answers"]["A"];
        
        // CREATE LIST FOR ANSWER-2
        let answer_2 = document.createElement("div");
        answer_2.classList = "btn w-50 btn-danger";
        answer_2.id = "B";
        answer_2.textContent = list_of_questions[index]["answers"]["B"];
        
        box1.appendChild(answer_1);
        box1.appendChild(answer_2);
        let box2 = document.createElement("div");
        box2.classList = "box d-flex";
        // CREATE LIST FOR ANSWER-3
        let answer_3 = document.createElement("div");
        answer_3.classList = "btn w-50 btn-info";
        answer_3.id = "C";
        answer_3.textContent = list_of_questions[index]["answers"]["C"];

        // CREATE LIST FOR ANSWER-4
        let answer_4 = document.createElement("div");
        answer_4.classList = "btn w-50 btn-success";
        answer_4.id = "D";
        answer_4.textContent = list_of_questions[index]["answers"]["D"];
        box2.appendChild(answer_3);
        box2.appendChild(answer_4);

        content_answers.appendChild(box1);
        content_answers.appendChild(box2);
        content_question.appendChild(card);
        content_question.appendChild(content_answers);

        // INCREMENT INDEX BY 1
        index += 1;
        // RANGE PROGREES BAR;
        progrees += (100/list_of_questions.length);

        let range = document.createElement("div");
        range.className = "range bg-primary";
        range.style.width = progrees + "%";
        let subRange = document.createElement("div")
        subRange.className = "subRange";
        let textRange = document.createElement("h5");
        
        let count_question = document.createElement("div");
        count_question.classList = "alert alert-success p-1 px-4 mx-4";
        textRange.textContent = index +'/'+ list_of_questions.length + " QUE";
        count_question.appendChild(textRange);
        subRange.appendChild(count_question);
        content_question.appendChild(subRange);
        content_question.appendChild(range);
        screenToDisplay.appendChild(content_question);
        temperaryData = list_of_questions;

    }else{
        hide(screenToDisplay);
        show(correction);
        let maximumScore = parseInt((global_scores/list_of_questions.length)*100)+"%";
        document.querySelector("#max").textContent = maximumScore;
        viewCorrection();
        // CURRENT TIME DATE
        var morning = "AM" 
        var evening = "PM"
        var isCurrentTime = "";
        var mDate = new Date(Date.parse(morning));
        var eDate = new Date(Date.parse(evening));
        if (mDate < eDate ){isCurrentTime = morning}
        else{isCurrentTime=evening}
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + " " + isCurrentTime;
        var dateTime = date+' '+time;
        addScoreToDatabase(maximumScore,list_of_questions[0].quizId,dateTime);
    }

    // CLICK BUTTON
    let buttons = document.querySelectorAll(".btn");
    for(let i=0; i<buttons.length; i++){
        if(i> 0){
            buttons[i].addEventListener("click",getClick);
        }
    }
}
// REFRESH DOM WHEN CALL
getQuizesTypeFromServer();
// EVALUATE THE RESULT OF QUESTION
function getClick(event){
    if(index <= temperaryData.length){

        if (temperaryData[index-1]["corr_answer"] == event.target.id){
            good_and_bad.push(event.target.textContent)
            id_good_and_bad.push(event.target.id);
            global_scores+=1;
        }else{
            good_and_bad.push(event.target.textContent)
            id_good_and_bad.push(event.target.id);
        }
    }
    getDataFromLocalStorage()
}

// TO SHOW ELEMENT
function show(element){
    element.style.display = "block";
}

// TO HIDE ELEMENT
function hide(element){
    element.style.display = "none";
}

// Good and Bad answers
function viewCorrection(){
    let i = 0;
    for(let data of temperaryData){
        let question_summary_good_and_bad = document.createElement("div");
        question_summary_good_and_bad.id = "questionSummary";


        let question_summary = document.createElement("h5");
        question_summary.textContent = (i+1)+". "+data.title;
        question_summary_good_and_bad.appendChild(question_summary);

        let answer_summary = document.createElement("h5");
        answer_summary.className = "px-3 d-flex justify-content-between";
        question_summary_good_and_bad.appendChild(answer_summary);
        let paragrap_Correction = document.createElement("p");
        let checked_Correction = document.createElement("p");
        let icon = document.createElement("i");
        icon.className = "fa fa-check";
        checked_Correction.appendChild(icon);
        if (id_good_and_bad[i] == data.corr_answer){
            paragrap_Correction.textContent = good_and_bad[i];
            answer_summary.style.color = "green";
            question_summary_good_and_bad.classList = "alert alert-success";
        }else{
            paragrap_Correction.textContent = good_and_bad[i];
            question_summary_good_and_bad.classList = "alert alert-danger";
            answer_summary.style.color = "red";
            icon.className = "fa fa-remove";
        }
        answer_summary.appendChild(paragrap_Correction);
        answer_summary.appendChild(checked_Correction);
        correctSummary.appendChild(question_summary_good_and_bad);
        i++;
    }
    array_of_quiz.forEach(quiz=>{
        if (quiz._id === quizID){
            document.querySelector(".quiz-title").textContent = quiz.title
        }
    })
}

// DISPLAY SCORE 

function displayScore(list_of_score){
    hide(type_quizes);
    while(scoreContainer.firstChild){
        scoreContainer.removeChild(scoreContainer.lastChild)
    }
    for(var i = 0; i<array_of_quiz.length;i++){
        var card = document.createElement("div");
        card.className = "card-score mb-3";
        card.id = array_of_quiz[i]._id;

        var card_header = document.createElement("div");
        card_header.className = "card-header bg-primary";

        var h2 = document.createElement("h4");
        h2.className = "card-title text-white";
        h2.textContent = array_of_quiz[i].title;
        h2.textContent = h2.textContent.toUpperCase();
        card_header.appendChild(h2);
        card.appendChild(card_header);

        var card_body = document.createElement("div");
        card_body.className = "card-body";
        card_body.id = array_of_quiz[i].id;
        for(let n = 0;n < 2; n++){
            if(array_of_quiz[i]._id == list_of_score[n].quizId._id){
                var card_date_time = document.createElement("div");
                card_date_time.className = "card-data-time px-3";

                card_date_time.textContent = "Date of played: "+ list_of_score[n].dataTime;
                card_date_time.id = list_of_score[n]._id;
                card_body.appendChild(card_date_time);
                let deleteScore = document.createElement("i");
                deleteScore.className = "fas fa-trash"
                var card_body_progress = document.createElement("div");
                card_body_progress.className ="card_progress h-25 m-2";
                card_body_progress.style.width = "100%";
                card_body.appendChild(card_body_progress);
            
                var card_range = document.createElement("div");
                card_range.className = "card_range bg-danger h-25 d-flex justify-content-end py-2 px-1";
                card_range.textContent = list_of_score[n].score;
                card_range.style.width = list_of_score[n].score;
                card_range.style.color = "white"
                card_body_progress.appendChild(card_range);  
            }
        }
    
        card.appendChild(card_body);
        hide(card_body)
        var card_footer = document.createElement("div");
        card_footer.className = "card-footer";

        var btn_play = document.createElement("button");
        btn_play.className = "btn_play btn btn-primary mx-1";
        btn_play.id = array_of_quiz[i]._id;
        btn_play.textContent = "View Now";
        card_footer.appendChild(btn_play)
        card.appendChild(card_footer)
        scoreContainer.appendChild(card);
    }
    let views = document.querySelectorAll(".btn_play");
    for(let i=0; i< views.length; i++){       
        views[i].addEventListener("click",buttonClicktoViewScore);
    }
}

// SHOW AND HIDE SCORE STATUS
function buttonClicktoViewScore(event){
    let card_body = event.target.parentNode.parentNode.children[1];
    if (card_body.style.display == "none"){
        show(card_body);
    } else{
        hide(card_body)
    }
}

//  GET ALL QUESTION FOR SERVER
function returnScore(){
    axios.get(URL+"display_score")
    .then(response => 
        {
            list_of_score  = response.data;
            displayScore(list_of_score )
        })
}

// ADD SCORES INTO THE DATABASE
let isAdded = true;
function addScoreToDatabase(score,quizId,currentTime){
    if(isAdded){
        axios.post(URL+"add_score",{score:score,quizId:quizId,dataTime:currentTime})
        .then(response =>{return response;})
        .catch(error =>{alert(error)});
        isAdded = false;
    }
}

let screenToDisplay = document.querySelector(".container-questions");
let correctSummary = document.querySelector(".correctionSummary");
let correction = document.querySelector(".correction");

let type_quizes = document.querySelector(".container-quiz-type");
let type_quizes_none = document.querySelector(".container-quiz-none");
let btn_go_to_score = document.querySelector("#scoreID");
btn_go_to_score.addEventListener("click",returnScore);
let scoreContainer = document.querySelector(".scoreContainer");

// // GENERAL QUIZE
function selfExercise(){
    // hide(type_quizes);
    while (screenToDisplay.firstChild) {
        screenToDisplay.removeChild(screenToDisplay.lastChild);
    }
    let card = document.createElement("div");
    card.className = "card-quiz";
    card.id = "none";
    let card_header = document.createElement("div");
    card_header.className = "card-header bg-primary text-light";
    let h2 = document.createElement("h4");
    h2.className = "card-title";
    h2.textContent = "GENERAL TEST";
    card_header.appendChild(h2);
    card.appendChild(card_header);
    let para = document.createElement("h6");
    para.classList = "card-body";
    para.textContent = "Improve your English with GENERAL TEST" 
    card.appendChild(para)
    let card_footer = document.createElement("div");
    card_footer.className = "card-footer";
    let btn_play = document.createElement("button");
    btn_play.className = "btn btn-primary mx-1";
    btn_play.id = "ownerQuiz";
    btn_play.textContent = "PLAY NOW";
    btn_play.onclick = function(){
        axios.get("http://localhost:8000/owners/own_question")
        .then((result)=>{
         saveDataInLocalStorage(result.data);
        //  console.log(result.data);
        });
        show(screenToDisplay);
        hide(type_quizes);
    }
    card_footer.appendChild(btn_play)
    card.appendChild(card_footer)
    type_quizes.appendChild(card);
}
selfExercise();