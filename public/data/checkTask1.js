
async function checkTask1() {
    let answerTaskForm = document.getElementById("taskForm");
    // отправляет запрос и получаем ответ
    /*  const response = await fetch("/api/checkTask", {
    method: "POST",
    headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
    },

    body: JSON.stringify({
    taskForm: new FormData(answerTaskForm)
    })
    });
    if (response.ok === true) {
    const messages = await response.json();

    alert(messages.CC4);*/
    let xhr = new XMLHttpRequest();

    // отслеживаем процесс отправки
    xhr.upload.onprogress = function (event) {
        console.log(`Отправлено ${event.loaded} из ${event.total}`);
    };

    // Ждём завершения: неважно, успешного или нет
    xhr.onloadend = function () {
        if (xhr.status == 200) {
            console.log("Успех");
        } else {
            console.log("Ошибка " + this.status);
        }
    };
    xhr.open("POST", "/api/checkTask");
	xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
     xhr.send(new FormData(answerTaskForm));
}
