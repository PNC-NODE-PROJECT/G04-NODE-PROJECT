
function removeDOM(e){
    e.target.parentElement.parentElement.remove();
    playQuiz();
}

function playQuiz() {
    if (index<=list_of_questions.length){
        // GET QUESTION FROM ARRAY OF OBJECTS
        let content_question  = document.createElement("div");
        content_question.classList = "container-fluid w-50";
        let card = document.createElement("div");
        card.className = "question";
        let question = document.createElement("h4")
        question.textContent = index+1 + "/ " + list_of_questions[index]['question'];
        card .appendChild(question);
        // CHANGE ANSWER ALL TIME WHENEVER USER CLICK NEXT
        // // CREATE LIST FOR ANSWER-1
        let content_answers = document.createElement("div");
        content_answers.classList = "answers";

        let box1 = document.createElement("div");
        box1.classList = "box d-flex";

        let answer_1 = document.createElement("div");
        answer_1.classList = "btn btn-primary";
        answer_1.textContent = list_of_questions[index]["answers"]["A"];
        
        // CREATE LIST FOR ANSWER-2
        let answer_2 = document.createElement("div");
        answer_2.classList = "btn btn-primary";
        answer_2.textContent = list_of_questions[index]["answers"]["B"];
        
        box1.appendChild(answer_1);
        box1.appendChild(answer_2);
        let box2 = document.createElement("div");
        box2.classList = "box d-flex";
        // CREATE LIST FOR ANSWER-3
        let answer_3 = document.createElement("div");
        answer_3.classList = "btn btn-primary";
        answer_3.textContent = list_of_questions[index]["answers"]["C"];

        // CREATE LIST FOR ANSWER-4
        let answer_4 = document.createElement("div");
        answer_4.classList = "btn btn-primary";
        answer_4.textContent = list_of_questions[index]["answers"]["D"];
        box2.appendChild(answer_3);
        box2.appendChild(answer_4);

        content_answers.appendChild(box1);
        content_answers.appendChild(box2);
        content_question.appendChild(card);
        content_question.appendChild(content_answers);
        console.log(list_of_questions[0]["answers"]["A"]);
        // INCREMENT INDEX BY 1
        index += 1;
        document.body.appendChild(content_question);
        
    }
}


function submitAnswer() {
    
}
let index = 0;
let list_of_questions = [
    {question: " Tom ________ in Serbia since he was 7 years old.", answers:{A: "A. lived", B: "B. is living", C: "C. has lived",D: "D. lives"}, corr_ans: "C"} ,
    {question: " They _________ go to the cinema every day.", answers:{A: "A. isn't", B: "B. doesn't", C: "C. aren't",D: "D. don't"} , corr_ans: "D"} ,
    {question: " She ___________ at a hotel every day", answers:{A: "A. working", B: "B. works", C: "C. is working",D: "D. work"} , corr_ans: "B"} ,
    {question: " While Tom (read) , Amely (watch) a documentary on TV.", answers:{A: "A. was reading / was watching", B: "B. was reading / were watching", C: "C. read / watched",D: "D. read / was watching"} , corr_ans: "A"} ,
    {question: " He (wake) up and (look) at his watch.", answers:{A: "A. waked / looked", B: "B. woke/ looked", C: "C. was waking / looked",D: "D. waked / was looking"} , corr_ans: "B"} ,
]
let btn_submit = document.querySelector("#sub-ans");
let btn_play = document.querySelector("#play_quiz");
let btn_create = document.querySelector("#create_quiz");
btn_play.addEventListener("click",removeDOM);
btn_create.addEventListener("click",removeDOM);
btn_submit.addEventListener("click",submitAnswer)
