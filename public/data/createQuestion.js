
// Функция для проверки введенных правильных ответов
// Входная переменная -строка для проверки

function checkCorrectUserAnswers(answer) {
    let flag = true; //устанавливаем начальное значение проверки
    let answerArray = answer.split(","); // Разделяем строку на массив, разделитель -запятая
    let answerSet = new Set(answerArray); // Получаем уникальное множество из массива
    if (answerSet.size < answerArray.length || answerArray.length > answerNumbers.length) { // Проверяем входную строку на уникальность значений и количество цифр
        flag == false;
    }
    flag = answerArray.every((elem) => answerNumbers.includes(elem)); // Проверяем введенные цифры на допустимые значения(1-4)
    return flag;
}

// Функция для создания вопроса

function enterQuestion() {

    let name = prompt("Введите текст вопроса:");
    if (name == "" || name == null) { //Проверяем введенное значение на пустую строку и отмену создания вопроса
        alert(CC1);
        return;
    }

    let newAnswers = [answerNumbers.length]; // Объявление массива  вариантов ответов. Равен длине массива корректных вариантов ответов (4)
    let j = 1; //Переменная для шаблона
    for (let i = 0; i < answerNumbers.length; i++) { // Цикл ввода вариантов ответов
        let CC2 = `Вы не ввели текст ${j} варианта ответа. Попробуйте добавить вопрос заново.`; //Шаблон сообщения системы
        newAnswers[i] = prompt(`Введите текст ${j} варианта ответа:`);
        if (newAnswers[i] == "" || newAnswers[i] == null) {
            alert(CC2);
            return;
        }
        j++
    }
    let correctUserAnswers = prompt(
            "Введите номера правильных ответов через запятую. Нумерация начинается с 1");
    if (correctUserAnswers == "" || correctUserAnswers == null) { //Проверяем введенное значение на пустую строку и отмену создания вопроса
        alert(CC3);
        return;
    }
    if (!checkCorrectUserAnswers(correctUserAnswers)) { //Проверяем правильность введенных цифр отдельной функцией
        alert(CC6);
        return;
    }
	console.log(newAnswers);
	console.log(Array.from(correctUserAnswers));
    addQuestion(name, newAnswers, Array.from(correctUserAnswers));
}

// Добавление вопроса в базу данных
async function addQuestion(name, newAnswers, correctUserAnswers) {

    const response = await fetch("api/questions", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            text: name,
            answers: newAnswers,
            correctAnswers: correctUserAnswers
        })
    });
    if (response.ok === true) {
        alert("Вопрос добавлен");
    }
}
