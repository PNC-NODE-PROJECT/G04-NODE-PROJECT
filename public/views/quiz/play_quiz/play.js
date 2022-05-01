function getQuizesTypeFromServer(){
    axios.get("/quizes/quiz-title").then((result)=>{
        array_of_quiz = result.data;
        // console.log(array_of_quiz);
        displayQuizOptionalInDOM(array_of_quiz);
    })
}
let array_of_quiz = [];
getQuizesTypeFromServer();

function displayQuizOptionalInDOM(array_of_quiz){
    // console.log(array_of_quiz);
    for (let i=0; i<array_of_quiz.length;i++){

        let card = document.createElement("div");
        card.className = "card w-75 m-auto mt-2";
        card.id = array_of_quiz[i]._id;

        let card_body = document.createElement("div");
        card_body.className = "card-body";
        let h2 = document.createElement("h2");
        h2.className = "card-title";
        h2.textContent = array_of_quiz[i].title;
        card_body.appendChild(h2);
        card.appendChild(card_body);
        let para = document.createElement("p");
        para.textContent = "Improve yourself with " + array_of_quiz[i].title;
        card_body.appendChild(para)
        let card_footer = document.createElement("div");
        card_footer.className = "card-footer";
        let btn_play = document.createElement("button");
        btn_play.className = "btn btn-primary mx-2";
        btn_play.id = "playQuiz";
        btn_play.textContent = "Practice Now";
        card_footer.appendChild(btn_play)
        // card_footer.appendChild(btn_create)
        card.appendChild(card_footer)
        type_quizes.appendChild(card);
    }
    // let btn_create = document.createElement("a");
    // btn_create.className = "btn btn-primary mx-5 mt-5 text-align-left";
    // btn_create.id = "createQuestion"
    // btn_create.href = "../edit_quiz/question_view.html"
    // btn_create.textContent = "Create Question";
    // type_quizes.appendChild(btn_create)

    let buttons = document.querySelectorAll("#playQuiz");
    buttons.forEach(btn => {
        btn.addEventListener("click",playByQuizType);
    });
}

let quizID = 0 ;
function playByQuizType(e){
    quizID = e.target.parentElement.parentElement.id;
    requestData(quizID);
    show(screenToDisplay);
    hide(type_quizes);
    // alert(quizID)
}
function requestData(id){
    axios.get("/questions/quiz-title/"+id).then((result)=>{
        console.log(result.data.length);
        if (result.data.length != 0){
            saveDataInLocalStorage(result.data)
        }else {
            // displayQuizOptionalInDOM(array_of_quiz)
            //   alert("I want to say that you are didn't add question yet.")
            // let textConten = document.createElement("h4");
            // textConten = "I love cambodia;"
            // container.appendChild(textConten);
            // type_quizes_none.appendChild(container);
            show(type_quizes_none);
            // hide()
           
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

let temperaryData = [];
let index = 0;
let progrees = 0;
// Greate quiz timplate
function playQuiz(list_of_questions) {
    while (screenToDisplay.firstChild) {
        screenToDisplay.removeChild(screenToDisplay.lastChild);
    }
    if (index < list_of_questions.length){
        // GET QUESTION FROM ARRAY OF OBJECTS
        let content_question  = document.createElement("div");
        content_question.classList = "container-fluid w-75";
        content_question.id  = list_of_questions[index]['_id'];
        let card = document.createElement("div");
        card.className = "question";
        let question = document.createElement("h4")
        question.textContent = list_of_questions[index]['title'];
        card .appendChild(question);
        // CHANGE ANSWER ALL TIME WHENEVER USER CLICK NEXT
        // CREATE LIST FOR ANSWER-1
        let content_answers = document.createElement("div");
        content_answers.classList = "answers";

        let box1 = document.createElement("div");
        box1.classList = "box d-flex";

        let answer_1 = document.createElement("div");
        answer_1.classList = "btn w-50";
        answer_1.id = "A";
        answer_1.textContent = list_of_questions[index]["answers"]["A"];
        
        // CREATE LIST FOR ANSWER-2
        let answer_2 = document.createElement("div");
        answer_2.classList = "btn w-50";
        answer_2.id = "B";
        answer_2.textContent = list_of_questions[index]["answers"]["B"];
        
        box1.appendChild(answer_1);
        box1.appendChild(answer_2);
        let box2 = document.createElement("div");
        box2.classList = "box d-flex";
        // CREATE LIST FOR ANSWER-3
        let answer_3 = document.createElement("div");
        answer_3.classList = "btn w-50";
        answer_3.id = "C";
        answer_3.textContent = list_of_questions[index]["answers"]["C"];

        // CREATE LIST FOR ANSWER-4
        let answer_4 = document.createElement("div");
        answer_4.classList = "btn w-50";
        answer_4.id = "D";
        answer_4.textContent = list_of_questions[index]["answers"]["D"];
        box2.appendChild(answer_3);
        box2.appendChild(answer_4);

        content_answers.appendChild(box1);
        content_answers.appendChild(box2);
        content_question.appendChild(card);
        content_question.appendChild(content_answers);
        let range = document.createElement("div");
        range.className = "range";
        range.style.width = progrees + "%";
        let subRange = document.createElement("div")
        subRange.className = "subRange";
        let textRange = document.createElement("h5");
        
        let count_question = document.createElement("div");
        count_question.classList = "card p-2 mb-2 mt-3";
        textRange.textContent = index +'/'+ list_of_questions.length + " questions";
        count_question.appendChild(textRange);
        subRange.appendChild(count_question);
        content_question.appendChild(subRange);
        content_question.appendChild(range);
        screenToDisplay.appendChild(content_question);
        temperaryData = list_of_questions;

    }else{
        hide(screenToDisplay);
        show(correction);
        
        document.querySelector("#max").textContent = parseInt((global_scores/list_of_questions.length)*100)+"%";
        viewCorrection()
    }
    // Create button click
    let buttons = document.querySelectorAll(".btn");
    for(let i=0; i<buttons.length; i++){
        if(i> 0){
            buttons[i].addEventListener("click",getClick);
        }
    }
     // INCREMENT INDEX BY 1
    index += 1;
     // RANGE PROGREES BAR;
    progrees += (100/list_of_questions.length);
}
let global_scores = 0;
let good_and_bad = [];
let id_good_and_bad = [];
// Valuate the the result
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


function show(element){
    element.style.display = "block";
}
function hide(element){
    element.style.display = "none";
}
// Good and Bad answers
function viewCorrection(){
    let i = 0;
   if(temperaryData==[]){
    for(let data of temperaryData)
    {
    let question_summary_good_and_bad = document.createElement("div");
    question_summary_good_and_bad.id = "questionSummary"

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
    if (id_good_and_bad[i] == data.corr_answer)
    {
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
}
// Create button click event
// requestData();
let screenToDisplay = document.querySelector(".container-questions");
let displayGoodAndBadAnswers= document.querySelector("#viewCorrection");
let correctSummary = document.querySelector(".correctionSummary");
let correction = document.querySelector(".correction");
correction.style.display = "none";


let type_quizes = document.querySelector(".container-quiz-type");
let type_quizes_none = document.querySelector(".container-quiz-none");