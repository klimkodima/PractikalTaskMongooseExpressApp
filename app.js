const DATA = require("./my_modules/data.js");
const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();

const userSchema = new Schema({
    text: String,
    answers: [String],
    correctAnswer: [Number]
}, {
    versionKey: false
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
// Удаляем ранее записанные вопросы в базу данных
Question.deleteMany(function (err, result) {
    console.log("Data deleted") // Success
    if (err)
        return console.log(err);
    console.log(result);
});

// Добавляем вопросы по умолчанию в базу данных
Question.insertMany(DATA.defaultQuestions).then(function () {
    console.log("Data inserted") // Success
}).catch(function (error) {
    console.log(error) // Failure
});

// Получаем все вопросы из базы данных
app.get("/api/questions", function (req, res) {

    Question.find({}, function (err, questions) {
        console.log("Запрос получен");
        if (err)
            return console.log(err);
        res.send(questions)
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
        correctAnswer: newcorrectAnswers
    });
    question.save(function (err) {
        if (err)
            return console.log(err);
        res.send("Вопрос добавлен");
    });
});
