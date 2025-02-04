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
      if (e.target.tagName === 'img') {

        }
    })
    this.imgWrapEl.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.tagName === 'img') {
        e.target.classList.toggle('selected');
      }
      this.checkButtonText();
  })
    const selectEl = document.querySelector('.select-all');
    selectEl.addEventListener('click', () => {
      let listImg = this.imgWrapEl.querySelectorAll('img');
      let flag = false;
      let q = 0;
      for (const imgEl of listImg) {
        if (imgEl.classList.contains('selected')) {
          flag = true;
        }
      }
      if (flag === true) {
        for (const imgEl of listImg) {
          imgEl.classList.remove('selected')
        }
      } else {
        for (const imgEl of listImg) {
          imgEl.classList.add('selected')
        }
      }
      this.checkButtonText();
  })
    const buttonShow = document.querySelector('.show-uploaded-files');
    buttonShow.addEventListener('click', () => {
      const fileUploaderWindow = App.getModal('fileUploader');

      fileUploaderWindow.open();
      Yandex.getUploadedFiles(() => {
        FileUploaderModal.showImages(images)
      })
    })
    //  пункт 5
    const buttonSend = this.imgWrapEl.querySelector('button.send');
    
      buttonSend.addEventListener('click', (e) => {
        const fileUploaderWindow = App.getModal('fileUploader');
        let listImgSel = this.imgWrapEl.querySelectorAll('img.selected');
        fileUploaderWindow.open();
        fileUploaderWindow.showImages(listImgSel);
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
    let listImg = this.imgWrapEl.querySelectorAll('img');
    const selectEl = document.querySelector('.select-all');
    const buttonSend = this.imgWrapEl.querySelector('button.send');
    let flag = true;
    let q = 0;
    for (const imgEl of listImg) {
      if (!imgEl.classList.contains('selected')) {
        flag = false;
      } else {
        q+=1;
      }  
    }
    if (flag) {
      selectEl.textContent = 'Снять выделение'
    } else {
      selectEl.textContent = 'Выбрать всё'
    }
    if (q > 0) {
      buttonSend.classList.remove('disabled')
    } else {
      buttonSend.classList.add('disabled')
    }
  }
}