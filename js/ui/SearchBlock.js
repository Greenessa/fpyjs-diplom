/**
 * Класс SearchBlock
 * Используется для взаимодействием со строкой ввода и поиска изображений
 * */
class SearchBlock {
  elem
  constructor( element ) {
    this.elem = element;
    this.registerEvents()
  }

  /**
   * Выполняет подписку на кнопки "Заменить" и "Добавить"
   * Клик по кнопкам выполняет запрос на получение изображений и отрисовывает их,
   * только клик по кнопке "Заменить" перед отрисовкой очищает все отрисованные ранее изображения
   */
  registerEvents() {
    const inputEl = document.querySelector('input');
    const replaceEl = document.querySelector('.replace');
    const addEl = document.querySelector('.add');
    let id = '';
    let buttonLook = document.querySelector('.show-uploaded-files');
    buttonLook.classList.add('disabled');
    inputEl.addEventListener('input', (e) => {
      id = inputEl.value;
      // console.log(id);
    })
    addEl.addEventListener('click', (e) => {
      e.preventDefault();
      if ( id.trim() != '') {
        VK.get(id, App.imageViewer.drawImages);
      }
    })
    replaceEl.addEventListener('click', (e) => {
      e.preventDefault();
      if ( id.trim() != '') {
        // console.log(id);
        App.imageViewer.clear();
        VK.get(id, App.imageViewer.drawImages);
      }
    })     
  }   
}