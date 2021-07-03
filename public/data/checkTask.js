// Функция проверки выбора одного ответа в каждом вопросе
async function checkForm() {
    // получаем форму
    let checkboxes = document.getElementsByClassName("checkbox");
    let answers = [];
    let answer = [];
    let switched = false;
    let counter = 0; //Счетчик
    for (let i = 0; i < checkboxes.length; i++) { //Проходим циклом по массиву полученных чекбоксов
        if (checkboxes[i].checked) { //Проверяем включен ли чекбокс
            switched = true;
            answers.push(checkboxes[counter].value);
        }
        counter++;
        if (counter == answerNumbers.length) { //на каждом 4 теле цикла проверяем былили включенные чекбоксы
            if (!switched) {
                alert(CC4);
                return;
            }
            answer[Math.floor(i / answerNumbers.length)] = answers.join(",");
            switched = false;
            counter = 0; //на каждом 4 теле цикла сбрасываем счетчик
            answers = [];

        }
    }
    checkTask(answer); //Вызываем функцию проверки задания с передачей массива чекбоксов
}

async function checkTask(answers) {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/checkTask", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            answers: answers
        })
    })
        if (response.ok === true){
    let message = await response.json();
		//alert(message.message);
		document.getElementById("Questions").textContent=message.message;
}
}
