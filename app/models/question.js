const mongoose = require("mongoose");
 
const Schema = mongoose.Schema;
// установка схемы
const questionSchema = new Schema({
    text: String,
    answers: [String],
    correctAnswers: [Number]
}, {
    versionKey: false,
    useCreateIndex: true
});
module.exports = mongoose.model("Question", questionSchema);
