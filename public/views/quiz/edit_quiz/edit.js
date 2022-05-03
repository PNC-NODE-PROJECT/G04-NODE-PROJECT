
// // ADD QUIZ
// GLOBAL ID
let global_id = "";
// ADD NEW QUIZ TO SERVER
function requestQuiz(){
    let quiz_titles = document.querySelector("#quiz-title");
    let title_of_quiz = quiz_titles.value;
    let isNotAlreadyExist = false;
    if (title_of_quiz != ""){
        array_of_quiz.forEach(array=>{
            if (array.title == title_of_quiz){
                isNotAlreadyExist = true;
            }
        })
        if (isNotAlreadyExist == false){
            axios.post("/quizes/add_quiz",{title:title_of_quiz})
            .then(getQuizesTypeFromServer(),quiz_titles.value = "");
        } else{
            alert("This quiz already exists!");
        }
    } else {
        alert("Input title of quiz!");
    }
    
}

// DELETE QUIZ TYPE
function deleteQuiz(quizID){
    if (confirm("Are you sure you want you delete this quiz??")){
        axios.delete("/quizes/delete_question/"+quizID)
        .then(getQuizesTypeFromServer())
    }
}

let update_titles = document.querySelector("#quiz-title-update");
function showQuizFormToUpdate(id, title) {
    update_titles.value = title;
    global_id = id;
    show(update_quiz_form);
}
function updateQuiz(){
    
    let quiz_titles = document.querySelector("#quiz-title-update").value;
    // if (update_quiz_form.style.display ==)
    let isNotAlreadyExist = false;
    if (quiz_titles != ""){
        array_of_quiz.forEach(array=>{
            if (array.title == quiz_titles){
                isNotAlreadyExist = true;
            }
        })
        if (isNotAlreadyExist == false){
            axios.put("/quizes/update_question/"+global_id,{title:quiz_titles})
            .then(getQuizesTypeFromServer(),
            update_titles.value = "",
            hide(update_quiz_form));
        } else{
            alert("This quiz already exists!");
        }
    } else {
        alert("Input title of quiz!");
    }
}

// GET TYPE OF QUIZES FROM SERVER
function getQuizesTypeFromServer(){
    axios.get("/quizes/quiz-title").then((result)=>{
        array_of_quiz = result.data;
        if (array_of_quiz != []){
            displayQuizOptionalInDOM(array_of_quiz);
        }
    })
}
let array_of_quiz = [];
getQuizesTypeFromServer();

// DISPLAY QUIZ CARD IN DOM
function displayQuizOptionalInDOM(array_of_quiz){

    // TO REMOVE LAST CHILD FROM THE DOM TO PREVENT REPEAT THE SAME
    while (container_quiz.firstChild){
        container_quiz.removeChild(container_quiz.lastChild)
    }
    for (let i=0; i<array_of_quiz.length;i++){

        // CREATE CARD
        let card = document.createElement("div");
        card.className = "w-100 card-quiz";
        card.id = array_of_quiz[i]._id;

        // CREATE CARD HEADER
        let card_header = document.createElement("div");
        card_header.className = "card-header bg-primary text-light";
        let h2 = document.createElement("h4");
        h2.className = "card-title";
        h2.textContent = array_of_quiz[i].title;
        card_header.appendChild(h2);
        card.appendChild(card_header);

        // CREATE CARD BODY
        let card_body = document.createElement("div");
        card_body.classList = "card-body"
        card_body.textContent = "For this quiz, you can delete or update and create more about " + array_of_quiz[i].title;
        card.appendChild(card_body);

        // CREATE CARD FOOTER
        let card_footer = document.createElement("div");
        card_footer.className = "card-footer";

        let btn_play = document.createElement("button");
        btn_play.className = "btn btn-primary mx-2";
        btn_play.id = "createQuestion";
        btn_play.textContent = "View";

        let btn_edit = document.createElement("a");
        btn_edit.className = "btn btn-primary mx-1";
        btn_edit.id = "editQuiz";
        btn_edit.href = "#update-quiz-form"
        let iconEdit = document.createElement("i");
        iconEdit.className = "fas fa-edit";
        btn_edit.appendChild(iconEdit);
        btn_edit.onclick = function() 
        {
            return showQuizFormToUpdate(card.id,array_of_quiz[i].title) ;
        };

        let btn_delete = document.createElement("button");
        btn_delete.className = "btn btn-danger mx-1";
        btn_delete.id = "deleetQuiz";
        let iconDelete = document.createElement("i");
        iconDelete.className = "fas fa-trash"
        btn_delete.appendChild(iconDelete);
        btn_delete.onclick = function() {return deleteQuiz(card.id)};

        // APPEND BUTTONS TO CARD FOOTER
        card_footer.appendChild(btn_play);
        card_footer.appendChild(btn_edit);
        card_footer.appendChild(btn_delete);

        card.appendChild(card_footer)
        container_quiz.appendChild(card);
    }

    let buttons = document.querySelectorAll("#createQuestion");
    buttons.forEach(btn => {
        btn.addEventListener("click",viewQuizTypes);
    });
}
// GET QUIZ ID BY EVENT TARGET 
let quizID = 0 ;
function viewQuizTypes(e){
    quizID = e.target.parentElement.parentElement.id;
    requestDataFromServer(quizID)
    show(screen_to_display);
    btn_create_question.style.display = "flex";
    hide(container_quiz);
    hide(btn_add_quiz);
}
// CLIENT REQUEST DATA FROM SERVER TO DISPLAY IN THE DOM
function requestDataFromServer(quizID) {
    axios.get("/questions/quiz-title/"+quizID).then((result)=>{
        let list_of_questions = result.data;
        showQuestionInDom(list_of_questions);
        if (list_of_questions.length == 0){
            alert("This quiz has no questions yet.Please create some questions!");
        }
    })
}
// SEND DATA TO SERVER TO CREATE MORE QUESTION 
function sendDataToServer(response,quizID) {
    axios.post("/questions/add_question/"+quizID,response).then(requestDataFromServer(quizID));
}

// SEND DATA TO SERVER UPDATE QUESTION 
function sendDataToServerToUpdate(response) {
    axios.put("/questions/update_question/"+id,response).then(requestDataFromServer(quizID));
}

// SHOW ALL THE QUESTIONS IN THE DOM IN BROSWER
function showQuestionInDom(list_of_questions){
    while (screen_to_display.firstChild) {
        screen_to_display.removeChild(screen_to_display.lastChild);
    }
        for (let index=0;index<list_of_questions.length;index++){
        // GET QUESTION FROM ARRAY OF OBJECTS
        let content_question  = document.createElement("div");
        content_question.classList = "container-fluid w-50 p-0";
        content_question.id  = list_of_questions[index]['_id'];
        let card = document.createElement("div");
        card.className = "question text-light";
        let question = document.createElement("h4")
        question.textContent = list_of_questions[index]['title'];
        card .appendChild(question);
        // CHANGE ANSWER ALL TIME WHENEVER USER CLICK NEXT
        // // CREATE LIST FOR ANSWER-1
        let content_answers = document.createElement("div");
        content_answers.classList = "answers mt-3";

        let box1 = document.createElement("div");
        box1.classList = "box d-flex";
        
        // GET CORRECT ANSWER FROM LIST OF QUESTION
        let correct_answer = list_of_questions[index]["corr_answer"];
        let answer_1 = document.createElement("div");
        answer_1.classList = "btn";
        answer_1.style.background = "#0593E3";
        answer_1.textContent = list_of_questions[index]["answers"]["A"];
        
        if (correct_answer === "A"){
            answer_1.style.background = "green";
        }
        // CREATE LIST FOR ANSWER-2
        let answer_2 = document.createElement("div");
        answer_2.classList = "btn ";
        answer_2.style.background = "#0593E3";
        answer_2.textContent = list_of_questions[index]["answers"]["B"];
        if (correct_answer === "B"){
            answer_2.style.background = "green";
        }
        box1.appendChild(answer_1);
        box1.appendChild(answer_2);
        let box2 = document.createElement("div");
        box2.classList = "box d-flex";
        // CREATE LIST FOR ANSWER-3
        let answer_3 = document.createElement("div");
        answer_3.classList = "btn";
        answer_3.style.background = "#0593E3";
        answer_3.textContent = list_of_questions[index]["answers"]["C"];
        if (correct_answer === "C"){
            answer_3.style.background = "green";
        }
        // CREATE LIST FOR ANSWER-4
        let answer_4 = document.createElement("div");
        answer_4.classList = "btn";
        answer_4.style.background = "#0593E3";
        answer_4.textContent = list_of_questions[index]["answers"]["D"];
        if (correct_answer === "D"){
            answer_4.style.background = "green";
        }
        box2.appendChild(answer_3);
        box2.appendChild(answer_4);


        // CARD FOOTER
        let card_footer = document.createElement("div");
        card_footer.className = "card_footer";
        let btn_edit = document.createElement("i");
        btn_edit.classList = "fas fa-edit"
        btn_edit.id = "edit_question";
        let btn_delete = document.createElement("i");
        btn_delete.className = "material-icons";
        btn_delete.textContent = "delete";
        btn_delete.id = "delete_question"
        card_footer.appendChild(btn_edit);
        card_footer.appendChild(btn_delete);
        content_answers.appendChild(box1);
        content_answers.appendChild(box2);
        content_question.appendChild(card);
        content_question.appendChild(content_answers);
        content_question.appendChild(card_footer);
        // INCREMENT INDEX BY 1
        screen_to_display.appendChild(content_question);

    }
    let delete_Questions = document.querySelectorAll("#delete_question");
    delete_Questions.forEach(btn => {
        btn.addEventListener("click",clickQuestion);
    });
    let edit_Questions = document.querySelectorAll("#edit_question");
    edit_Questions.forEach(btn => {
        btn.addEventListener("click",clickQuestion);
    });
}

// CREATE QUESTION IN SERVER
function createQuestion(){
    let title = up_question.value;
    let ans1 = up_answer1.value;
    let ans2 = up_answer2.value;
    let ans3 = up_answer3.value;
    let ans4 = up_answer4.value;
    let correct_answer = up_corr_answer.value;
    if (update_template.style.display == "none"){
        title = question_create.value;
        ans1 = answer1_create.value;
        ans2 = answer2_create.value;
        ans3 = answer3_create.value;
        ans4 = answer4_create.value;
        correct_answer = corr_answer.value;
    }
    checkValidation(title,ans1,ans2,ans3,ans4,correct_answer);
}

// TO CHECK FORM VALIDATION INPUT
function checkValidation(title,ans1,ans2,ans3,ans4,correct_answer){
    if (title != "" &&  ans1 != "" && ans2 != "" && ans3 != "" && ans4 != ""){
        if (correct_answer != ""){
            let data = {
                title: title,
                answers: {
                    A: ans1,
                    B: ans2,
                    C: ans3,
                    D: ans4
                },
                corr_answer: correct_answer,
                quizId: quizID
            }
            if (update_template.style.display == "none"){
                sendDataToServer(data,quizID);
            } else{
                sendDataToServerToUpdate(data,quizID);
                hide(update_template);
            }
            question_create.value = "";
            answer1_create.value = "";
            answer2_create.value = "";
            answer3_create.value = "";
            answer4_create.value = "";
            corr_answer.value = "";
        } else {
            alert("Please choose correct answer!!");
        }
    } else {
        alert("Please input all the fill!");
    }
}
// TO SHOW THE TEMPLATE OF CREATING NEW QUESTION
function showCreateTemplate(){
    hide(no_question_template)

}

// TO SHOW TEMPLATE OF UPDATING QUESTION
function showUpdateTemplate(data){
    up_question.value = data.title;
    up_answer1.value =  data.answers.A;
    up_answer2.value =  data.answers.B;
    up_answer3.value = data.answers.C;
    up_answer4.value = data.answers.D;
    up_corr_answer.value = data.corr_answer;
    update_template.style.display = "block";
    
}

// CANCEL
function cancel(e){
    hide(update_quiz_form);
    hide(update_template);
}

// TO SHOW ELEMENT
function show(element){
    element.style.display = "block";
}

// TO HIDE ELEMENT
function hide(element){
    element.style.display = "none";
}

// TO CHECK ACTION OF CLIENT CLICK
let id = "";
function clickQuestion(e){
    id = e.target.parentElement.parentElement.id;
    if (e.target.id === "delete_question"){
        if (confirm("Are you sure want to delet question?")){
            axios.delete("/questions/delete_question/"+id).then(requestDataFromServer(quizID));
        }
    }
    if (e.target.id === "edit_question"){
        axios.get("/questions/display_question/").then((result)=>{
            result.data.forEach(data => {
                if (id === data._id){
                    console.log(data);
                    showUpdateTemplate(data);
                }
                
            });
        })
    }
}


// CREAT QUESTION
let question_create = document.querySelector("#question");
let answer1_create = document.querySelector("#answer1");
let answer2_create = document.querySelector("#answer2");
let answer3_create = document.querySelector("#answer3");
let answer4_create = document.querySelector("#answer4");
let corr_answer = document.querySelector("#corr-ans");
let btn_create_question = document.querySelector(".create-question");
// UPDATE QUESTION
let up_question = document.querySelector("#up-question");
let up_answer1 = document.querySelector("#up-answer1");
let up_answer2 = document.querySelector("#up-answer2");
let up_answer3 = document.querySelector("#up-answer3");
let up_answer4 = document.querySelector("#up-answer4");
let up_corr_answer = document.querySelector("#up-corr-ans");
let update_template = document.querySelector(".update-template");
let cancel_update = document.querySelector("#cancel-update");
cancel_update.addEventListener("click",cancel);

// CONTAINER ALL THE QUIZES TYPE
let container_quiz =document.querySelector(".container-quiz");

// CONTAINER ALL THE QUESTINS OF EACH QUIZ
let screen_to_display = document.querySelector(".container-questions");

// BUTTON TO SHOW THE TEMPLATE TO ADD QUIZ
let btn_add_quiz = document.querySelector("#template-add-quiz");

// FORM TO UPDATE QUIZ
let update_quiz_form = document.querySelector("#update-quiz-form");
// BUTTON TO ADD MORE QUIZ
let btn_add_new_quiz = document.querySelector("#btn-add-quiz");
btn_add_new_quiz.addEventListener("click", requestQuiz);

// BUTTON TO CANCEL UPDATING QUIZ
let cancel_update_quiz = document.querySelector("#cancel");
cancel_update_quiz.addEventListener("click",cancel);