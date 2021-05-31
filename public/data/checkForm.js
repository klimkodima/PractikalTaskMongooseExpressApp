// Функция проверки выбора одного ответа в каждом вопросе
function checkForm() {
	// получаем форму
var checkboxes = document.getElementsByClassName("checkbox");
  let switched = false;
  let counter = 0;                                       //Счетчик
  for (let i = 0; i < checkboxes.length; i++) {   //Проходим циклом по массиву полученных чекбоксов
    if (checkboxes[i].checked) {                  //Проверяем включен ли чекбокс
      switched = true;                               
    }
    counter++;
    if (counter == answerNumbers.length) {              //на каждом 4 теле цикла проверяем былили включенные чекбоксы
      if (!switched) {
        alert(CC4);
		return ;
      }
      switched = false;
      counter = 0;                                  //на каждом 4 теле цикла сбрасываем счетчик
    }
  }
  checkTask(checkboxes);                //Вызываем функцию проверки задания с передачей массива чекбоксов
}