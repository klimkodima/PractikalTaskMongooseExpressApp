const DATA = require("./data.js");
// Функция проверки задания
exports.checkTask = function(answers,questions) {
    let result = 0; // Количество правильно отвеченных вопросов
    let allQuestions = questions.length; // Общее количество вопросов
    let wronAnswerMessage = `Вы неправильно ответили на вопросы:
	
	`; //Часть шаблона сообщения СС7
    for (let n = 0; n < allQuestions; ++n) { //Проходим циклом по всем вопросам
        let question = questions[n];
        let idx = 1 + n;
		let text = question.text; //Берем текст вопроса в переменную
     if( JSON.stringify(question.correctAnswers.join(","))==JSON.stringify(answers[n])){
            result++; // Защитываем правильный ответ
        } else {
            wronAnswerMessage = wronAnswerMessage + idx + `. ` + text + `
`			//Записываем неправильный вопрос в шаблон  неполного результата
        }
    }
    let rezultMessage = `Ваш результат ${result} из ${allQuestions}`; //Записываем результат  задания в переменную
    if (result == allQuestions) { //Если на все вопросы отвечено правильно
        return (rezultMessage); // Выводим  максимальный результат
    } else {
        wronAnswerMessage = wronAnswerMessage + `
		` + rezultMessage; //Выводим результат
       return(wronAnswerMessage);
    }
}
