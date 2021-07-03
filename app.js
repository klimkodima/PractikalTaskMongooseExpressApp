const DATA = require("./my_modules/data.js");
const checkTask = require("./my_modules/checkTask.js");
const createError = require('http-errors');
const mongoose = require("mongoose");
const path = require('path')
    const express = require("express");
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const multiparty = require("multiparty");
const app = express();
const jsonParser = express.json();
app.use(cookieParser());

const Schema = mongoose.Schema;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
        extended: true
    })) // for parsing application/x-www-form-urlencoded

app.use(express.static(__dirname + "/public"));
//app.use('/static', express.static(path.join(__dirname, 'public')));

const userSchema = new Schema({
    text: String,
    answers: [String],
    correctAnswers: [Number]
}, {
    versionKey: false,
    useCreateIndex: true
});
const Question = mongoose.model("Question", userSchema);

mongoose.connect("mongodb://localhost:27017/questionsdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}, function (err) {
    if (err)
        return console.log(err);
    app.listen(3002, function () {
        console.log("Сервер ожидает подключения...");
    });
});

Question.deleteMany().then(function () {
    console.log("Data deleted") // Success
}).then(function () {
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
app.post("/api/questions", function (req, res, next) {
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

app.use('/api/checkTask', jsonParser, function (req, res, next) {

    if (!req.body)
        return res.sendStatus(400);
    const answers = req.body.answers;
    Question.find({}, function (err, questions) {
        console.log("Проверка теста");
        if (err)
            return console.log(err);
		let message = checkTask.checkTask(answers,questions);
		console.log(message);
        res.send(JSON.stringify({message:message}));
    });
});

app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
