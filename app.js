const DATA = require("./my_modules/data.js");
const startTask = require("./my_modules/data.js");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
let multiparty = require("multiparty");
const urlencodedParser = bodyParser.urlencoded({
    extended: false
});

const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const userSchema = new Schema({
    text: String,
    answers: [String],
    correctAnswers: [Number]
}, {
    versionKey: false,
    useCreateIndex: true
});
const Question = mongoose.model("Question", userSchema);
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://localhost:27017/questionsdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, function (err) {
    if (err)
        return console.log(err);
    app.listen(3000, function () {
        console.log("Сервер ожидает подключения...");
    });
});


Question.deleteMany().then(function () {
    console.log("Data deleted") // Success
}).then (function (){
	Question.insertMany(DATA.defaultQuestions)
}).then(function () {
    console.log("Data inserted"); // Success
}).catch(function (error) {
    console.log(error);
});


// Получаем все вопросы из базы данных
app.get("/api/questions", function (req, res) {

    Question.find({}, function (err, questions) {
        console.log("Тест начался");
        if (err)
            return console.log(err);
        res.send(JSON.stringify(questions))
    });
});

// Добавляем вопрос в базу данных
app.post("/api/questions", jsonParser, function (req, res) {

    if (!req.body)
        return res.sendStatus(400);
    const newQuestion = req.body.text;
    const newAnswers = req.body.answers;
    const newcorrectAnswers = req.body.correctAnswers;
    const question = new Question({
        text: newQuestion,
        answers: newAnswers,
        correctAnswers: newcorrectAnswers
    });
    question.save(function (err) {
        if (err)
            return console.log(err);
        res.send(DATA.messages);
    });
});

app.use('/api/checkTask', jsonParser, function (req, res) {

    if (!req.body)
        return res.sendStatus(400);
	const taskForm = req.body.taskForm;
	console.log(taskForm);
});

