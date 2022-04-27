QuestionSchema= [
    {
        id:{
            type: Number
        },
        title: {
            type: String,
            require: true
        },
        answers: { 
            answer_1: String,
            answer_2: String,
            answer_3: String,
            answer_4: String
        },
        corr_answer: String,
        userId: {
            type: ObjectId,
            ref: "Users"
        }
    } 
]


UserSchema = [
    {
        id: {
            type: Number
        },
        user_name: {
            first_name: String,
            last_name: String
        },
        email_address: { 
            type: String, 
            require: true
        },
        password: {
            type: String,
            require: true
        }
    }
]


