let URL = "http://localhost:8000"
function requestDataFromServer(){
    axios.get(URL + "/questions/display_question").then((result)=>{
        let list_of_questions = result.data;
        showAllQuestion(list_of_questions);
    })
}

function showAllQuestion(list_of_questions){
    while (screenToDisplay.firstChild) {
        screenToDisplay.removeChild(screenToDisplay.lastChild);
    }
    // console.log(screenToDisplay.firstChild);
    // if (list_of_questions.length !== 0){ 
        for (let index=0;index<list_of_questions.length;index++){
        // GET QUESTION FROM ARRAY OF OBJECTS
        let content_question  = document.createElement("div");
        content_question.classList = "container-fluid w-50";
        content_question.id  = list_of_questions[index]['_id'];
        let card = document.createElement("div");
        card.className = "question";
        let question = document.createElement("h4")
        question.textContent = index+1 + "/ " + list_of_questions[index]['title'];
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

        let card_footer = document.createElement("div");
        card_footer.className = "card_footer";
        let btn_edit = document.createElement("button");
        btn_edit.className = "edit_question";
        btn_edit.textContent = "Edit";
        let btn_delete = document.createElement("button");
        btn_delete.className = "delete_question"
        btn_delete.textContent = "Delete";
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
    // }


}

function clickQuestion(e){
    let id = e.target.parentElement.parentElement.id;
    if (e.target.className = "delete_question"){
        axios.delete("/questions/delete_question/"+id).then(showAllQuestion());
        
    }
}
let screenToDisplay = document.querySelector(".container-questions");
screenToDisplay.addEventListener("click", clickQuestion)
requestDataFromServer();
