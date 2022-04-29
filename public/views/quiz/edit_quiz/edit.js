// CLIENT REQUEST DATA FROM SERVER TO DISPLAY IN THE DOM
function requestDataFromServer(){
    axios.get("/questions/display_question").then((result)=>{
        let list_of_questions = result.data;
        showQuestionInDom(list_of_questions);
    })
}
// SEND DATA TO SERVER TO CREATE MORE QUESTION 
function sendDataToServer(response) {
    axios.post("/questions/add_question",response).then(requestDataFromServer());
}

// SHOW ALL THE QUESTIONS IN THE DOM IN BROSWER
function showQuestionInDom(list_of_questions){
    while (screenToDisplay.firstChild) {
        screenToDisplay.removeChild(screenToDisplay.lastChild);
    }
        for (let index=0;index<list_of_questions.length;index++){
        // GET QUESTION FROM ARRAY OF OBJECTS
        let content_question  = document.createElement("div");
        content_question.classList = "container-fluid w-50";
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
        answer_1.classList = "btn";
        answer_1.textContent = list_of_questions[index]["answers"]["A"];
        
        // CREATE LIST FOR ANSWER-2
        let answer_2 = document.createElement("div");
        answer_2.classList = "btn";
        answer_2.textContent = list_of_questions[index]["answers"]["B"];
        
        box1.appendChild(answer_1);
        box1.appendChild(answer_2);
        let box2 = document.createElement("div");
        box2.classList = "box d-flex";
        // CREATE LIST FOR ANSWER-3
        let answer_3 = document.createElement("div");
        answer_3.classList = "btn";
        answer_3.textContent = list_of_questions[index]["answers"]["C"];

        // CREATE LIST FOR ANSWER-4
        let answer_4 = document.createElement("div");
        answer_4.classList = "btn";
        answer_4.textContent = list_of_questions[index]["answers"]["D"];
        box2.appendChild(answer_3);
        box2.appendChild(answer_4);

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
        screenToDisplay.appendChild(content_question);

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
    let title = question_create.value;
    let ans1 = answer1_create.value;
    let ans2 = answer2_create.value;
    let ans3 = answer3_create.value;
    let ans4 = answer4_create.value;
    let correct_answer = corr_answer.value;
    if (title !== ""||  ans1 !== "" || ans2 != "" || ans3 != "" || ans4 != ""){
        if (title[title.length-1] == "?"){
            if (correct_answer != ""){
                let data = {
                    title: title,
                    answers: {
                        A: ans1,
                        B: ans2,
                        C: ans3,
                        D: ans4
                    },
                    corr_answer: correct_answer
                }
                sendDataToServer(data);
                hide();
            } else {
                alert("Please choose correct answer!!");
            }
        } else {
            alert("Question should end by question mark (?)");
        }
    } else {
        alert("Please input all the fill!");
    }
}

// TO SHOW THE TEMPLATE OF CREATING NEW QUESTION
function showCreateTemplate(){
    show(content_create_questions);
}

// TO SHOW TEMPLATE OF UPDATING QUESTION
function showUpdateTemplate(data){
    question_create.value = data.title;
    answer1_create.value = data.answers.A;
    answer2_create.value = data.answers.B;
    answer3_create.value = data.answers.C;
    answer4_create.value = data.answers.D;
    update_template.style.display = "block";
    
}

// CANCEL
function cancel(e){
    if (e.target.id == "cancel-update"){
        hide(update_template);
    } else if (e.target.id == "cancel-create"){
        hide(content_create_questions);
    }
}

// TO SHOW ELEMENT
function show(element){
    element.style.display = "block";
}

// TO HIDE ELEMENT
function hide(e){
    e.style.display = "none";
}

// TO CHECK ACTION OF CLIENT CLICK
function clickQuestion(e){
    let id = e.target.parentElement.parentElement.id;
    if (e.target.id === "delete_question"){
        if (confirm("Are you sure want to delet question?")){
            axios.delete("/questions/delete_question/"+id).then(requestDataFromServer());
        }
    }
    if (e.target.id === "edit_question"){
        axios.get("/questions/display_question").then((result)=>{
            result.data.forEach(data => {
                if (id === data._id){
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
let content_create_questions = document.querySelector(".create-template");
let btn_add = document.querySelector(".create-question");
btn_add.addEventListener("click",showCreateTemplate);
let cancel_create  = document.querySelector("#cancel-create");
cancel_create.addEventListener("click",cancel);

// UPDATE QUESTION
let update_template = document.querySelector(".update-template");
let cancel_update = document.querySelector("#cancel-update");
cancel_update.addEventListener("click",cancel);

let screenToDisplay = document.querySelector(".container-questions");
requestDataFromServer();
