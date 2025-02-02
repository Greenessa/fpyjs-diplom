/**
 * Класс ImageViewer
 * Используется для взаимодействием c блоком изображений
 * */
class ImageViewer {
  constructor(element) {
    this.element = element;
    this.imgWrapEl = document.querySelector('.images-list');
    this.wrapEl = this.imgWrapEl.querySelector('.row');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по изображению меняет класс активности у изображения
   * 2. Двойной клик по изображению отображает изображаения в блоке предпросмотра
   * 3. Клик по кнопке выделения всех изображений проверяет у всех ли изображений есть класс активности?
   * Добавляет или удаляет класс активности у всех изображений
   * 4. Клик по кнопке "Посмотреть загруженные файлы" открывает всплывающее окно просмотра загруженных файлов
   * 5. Клик по кнопке "Отправить на диск" открывает всплывающее окно для загрузки файлов
   */
  registerEvents(){
    this.imgWrapEl.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('image-preview-container')) {

        }
    })
    this.imgWrapEl.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('image-preview-container')) {
        e.target.classList.toggle('selected');
        this.checkButtonText();
      }
  })
    //  пункт 5
    const buttonSend = this.imgWrapEl('button.send');
    
      buttonSend.addEventListener('click', (e) => {
        App.getModal('fileUploader').open();
      })

  }

  /**
   * Очищает отрисованные изображения
   */
  clear() {
    this.wrapEl.textContent = '';
  }

  /**
   * Отрисовывает изображения.
  */
  drawImages(images) {
      const selectEl = document.querySelector('.select-all');
      if (images != '') {
        selectEl.classList.remove('disabled');
      } else {
        selectEl.classList.add('disabled');
      }
      // <div class='four wide column ui medium image-wrapper'><img src='XXX' /></div>`
      for (const image of images) {
        let divEl = document.createElement('div');
        divEl.classList.add('four.wide.column.ui.medium.image-wrapper');
        let imgEl = document.createElement('img');
        imgEl.src = image;
        divEl.insertAdjacentElement('beforeend', imgEl);
        this.wrapEl.insertAdjacentElement('beforeend', divEl);
      }
  }

  /**
   * Контроллирует кнопки выделения всех изображений и отправки изображений на диск
   */
  checkButtonText(){

  }

}