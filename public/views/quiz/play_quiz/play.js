

let URL = "http://localhost:8080"

function requestData(){
    axios.get(URL + "/questions/display_question").then((result)=>{
        let list_of_questions = result.data;
        saveDataInLocalStorage(list_of_questions);
    })
}
function saveDataInLocalStorage(list_of_questions){
    localStorage.setItem("data",JSON.stringify(list_of_questions));
    getDataFromLocalStorage();
}
function getDataFromLocalStorage(){
    let data = JSON.parse(localStorage.getItem("data"));
    playQuiz(data);
}
function playQuiz(list_of_questions) {

        if (index<=list_of_questions.length){
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
            answer_1.style.cursor = "pointer"
            answer_1.textContent = list_of_questions[index]["answers"]["A"];
            
            // CREATE LIST FOR ANSWER-2
            let answer_2 = document.createElement("div");
            answer_2.classList = "btn btn-primary";
            answer_2.textContent = list_of_questions[index]["answers"]["B"];
            
            box1.appendChild(answer_1);
            box1.appendChild(answer_2);
            let box2 = document.createElement("div");
            box2.classList = "box d-flex";
            answer_2.style.cursor = "pointer"
            // CREATE LIST FOR ANSWER-3
            let answer_3 = document.createElement("div");
            answer_3.classList = "btn btn-primary";
            answer_3.style.cursor = "pointer"
            answer_3.textContent = list_of_questions[index]["answers"]["C"];
    
            // CREATE LIST FOR ANSWER-4
            let answer_4 = document.createElement("div");
            answer_4.classList = "btn btn-primary";
            answer_4.style.cursor = "pointer"
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
let index = 0;
requestData();