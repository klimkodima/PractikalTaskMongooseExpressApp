// Функция для создания элемента <form>
function createForm() {
    var form = document.createElement("form");
    return form;
}
// Функция для создания элемента <input> тип "checkbox"
function createCheckbox(text) {
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.textContent = text;
    return checkbox;
}
// Функция для создания нумерованного списка <ol>
function createOl() {
    var ol = document.createElement("ol");
    return ol;
}
// Функция для создания элемента списка <li>
function createLi(text) {
    var li = document.createElement("li");
    li.textContent = text;
    return li;
}
// Функция для создания тега <label>
function createLabel(text) {
    var label = document.createElement("label");
    label.textContent = text;
    return label;
}
// Функция для создания тега перевода строки <br>
function createBreak() {
    var br = document.createElement("br");
    return br;
}
/*  Функция для создания окна прохождения теста на главном экране.
Значения атрибута "name" элементов выбраны для дальнейшего развития задания с помощью ООП,
создания объектов тест, вопросы, вопрос, ответы, правильные ответы.
 */
async function startTest() {
    // отправляет запрос и получаем ответ
    const response = await fetch("/api/questions", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
    // если запрос прошел нормально
    if (response.ok === true) {
        // получаем данные
        const questions = await response.json();

        
        let checkTaskButton = document.getElementById("checkTask");
        checkTaskButton.setAttribute("disabled", "disabled");

        let taskForm = createForm(); // Создаем переменную при помощи функции
        //    taskForm.setAttribute("onsubmit", "checkForm();return false");
        taskForm.setAttribute("onsubmit", "checkForm();return false"); //Устанавливаем  атрибут для вызова функции проверки формы при отправке формы.После выполнения функции задание остается на экране
        taskForm.setAttribute("name", "taskForm");
        taskForm.setAttribute("id", "taskForm");
		taskForm.setAttribute("class", "");
        let ol = createOl();
        ol.setAttribute("name", "questions");
        taskForm.append(ol);

        let Questions = document.getElementById("Questions");
        Questions.append(taskForm); //Добавляем элемент в контейнер

        questions.forEach((question, index) => {
            let questionLi = createLi(question.text);
            questionLi.setAttribute("name", "question");
            questionLi.setAttribute("id", index);
            questionLi.style.fontWeight = "bold";
            ol.append(questionLi);
            for (let i in question.answers) {
                let idx = 1 + i / 1;
                let answerCheckbox = createCheckbox();
                answerCheckbox.setAttribute("name", "answer");
                answerCheckbox.setAttribute("value", idx);
                answerCheckbox.setAttribute("class", "checkbox");
                let answersLabel = createLabel();
                answersLabel.style.fontWeight = "normal";
                answersLabel.append(answerCheckbox);
                answersLabel.appendChild(document.createTextNode(question.answers[i]));
                questionLi.append(createBreak(), answersLabel);
            }
        });
        let submit = createCheckbox(); // Создаем кнопку для отправки формы функцией с изменением типа элемента < input сheckbox > на < input submit >
        submit.type = "submit";
		submit.setAttribute("class", "btn btn-custom color-2");
		submit.setAttribute("id", "startTask");
        taskForm.append(submit);
        Questions.style.visibility = "visible";
    };
}

