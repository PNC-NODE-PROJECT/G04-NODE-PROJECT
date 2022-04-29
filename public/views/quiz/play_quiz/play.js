

function requestData(){
    axios.get( "/questions/display_question").then((result)=>{
        let list_of_questions = result.data;
        saveDataInLocalStorage(list_of_questions);
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
        // // CREATE LIST FOR ANSWER-1
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
        // INCREMENT INDEX BY 1
        index += 1;
        progrees += (100/list_of_questions.length);
            // RANGE PROGREES BAR;
        let range = document.createElement("div");
        range.className = "range";
        range.style.width = progrees + "%";
        let subRange = document.createElement("div")
        subRange.className = "subRange";
        let textRange = document.createElement("h5");
        
        let count_question = document.createElement("div");
        count_question.classList = "card p-2 mb-2 mt-3";
        textRange.textContent = index +'/ '+ list_of_questions.length + "Questions";
        count_question.appendChild(textRange);
        subRange.appendChild(count_question);
        content_question.appendChild(subRange);
        content_question.appendChild(range);
        screenToDisplay.appendChild(content_question);
        temperaryData = list_of_questions;

    } else{
        screenToDisplay.style.display = "none";
        correction.style.display = "block";
    }
        // Create button click
        let buttons = document.querySelectorAll(".btn");
        for(let i=0; i<buttons.length; i++){
            if(i> 0){
                buttons[i].addEventListener("click",getClick);
            }
        }
    }


// Valuate the the result
function getClick(event){
    if(index <= temperaryData.length){

        if (temperaryData[index-1]["corr_answer"] == event.target.id){
            console.log(true)
            console.log(event.target.textContent)
        }else{
            console.log(false);
            console.log(event.target.textContent);
        }
        getDataFromLocalStorage();
    
    }
}
function tryAgain(){
    screenToDisplay.style.display = "block";
    correction.style.display = "none";
    index = 0;
    progrees = 0
    requestData()
}
// Good and Bad answers
let nClick = 0;

let created = true;
function viewCorrection(){
    let i = 0;
    if(created){
        for(let data of temperaryData)
            {
            let question_summary_good_and_bad = document.createElement("div");
            question_summary_good_and_bad.className = "questionSummary px-4"

            let question_summary = document.createElement("h5");
            let span_question_summary = document.createElement("span");
            question_summary.appendChild(span_question_summary);
            question_summary_good_and_bad.appendChild(question_summary);
            span_question_summary.textContent = (i+1)+". "+data.title;

            let answer_summary = document.createElement("h5");
            answer_summary.className = "px-3 text-success d-flex justify-content-between";
            question_summary_good_and_bad.appendChild(answer_summary);
            let paragrap_Correction = document.createElement("p");
            let get_key = Object.keys(data.answers);
            for (let i = 0; i < get_key.length; i++){
                if (get_key[i] == data.corr_answer)
                {
                    paragrap_Correction.textContent = data.answers[data.corr_answer];
                }
            }
            let checked_Correction = document.createElement("p");
            let icon = document.createElement("i");
            icon.className = "fa fa-check-circle";
            checked_Correction.appendChild(icon);

            answer_summary.appendChild(paragrap_Correction);
            answer_summary.appendChild(checked_Correction);

            correctSummary.appendChild(question_summary_good_and_bad);
            i++;
            created = false;
        }
    }
   if(nClick == 0){correctSummary.style.display = "block"; nClick = 1}
   else{correctSummary.style.display = "none"; nClick = 0}
}
// Create button click event
requestData();
let screenToDisplay = document.querySelector(".container-questions");
let displayGoodAndBadAnswers= document.querySelector("#viewCorrection");
let correctSummary = document.querySelector(".correctionSummary");
correctSummary.style.display =  "none";
let correction = document.querySelector(".correction");
correction.style.display = "none";
displayGoodAndBadAnswers.addEventListener("click",viewCorrection)

document.querySelector("#playAgain").addEventListener("click",tryAgain);