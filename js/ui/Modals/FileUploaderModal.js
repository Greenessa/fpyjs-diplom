/**
 * Класс FileUploaderModal
 * Используется как всплывающее окно для загрузки изображений
 */
class FileUploaderModal extends BaseModal {
  constructor( element ) {
    super(element);
    this.uploaderEl = document.querySelector('.file-uploader-modal');
    this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по кнопке "Закрыть" на всплывающем окне, закрывает его
   * 3. Клик по кнопке "Отправить все файлы" на всплывающем окне, вызывает метод sendAllImages
   * 4. Клик по кнопке загрузке по контроллерам изображения: 
   * убирает ошибку, если клик был по полю вода
   * отправляет одно изображение, если клик был по кнопке отправки
   */
  registerEvents(){
    const closeEl = this.uploaderEl.querySelector('i.x.icon');
    closeEl.addEventListener('click', (e) => {
      e.preventDefault();
      this.close()});
    const buttClose = this.uploaderEl.querySelector('.ui.close.button');
    buttClose.addEventListener('click', (e) => {
      e.preventDefault();
      this.close()});
    const buttSend = this.uploaderEl.querySelector('.ui.send-all.button');
    buttSend.addEventListener('click', (e) => {
      e.preventDefault();
      this.sendAllImages()})
    const contentEl = this.uploaderEl.querySelector('.content');
    contentEl.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.tagName === 'input') {
        e.target.closest('.ui.action.input').classList.remove('.error');
      }
      if (e.target.tagName === 'button' || e.target.tagName === 'i') {
        let imgEl = e.target.closest('.image-preview-container');
        console.log(imgEl);
        this.sendImage(imgEl); 
      }
    })
  }

  /**
   * Отображает все полученные изображения в теле всплывающего окна
   */
  showImages(images) {
    let arrImg = Array.from(images).reverse();
    let htmlList = [];
    arrImg.forEach((img) => {
      let htmlImg = this.getImageHTML(img);
      htmlList.push(htmlImg);
    })
    let stringHtml = htmlList.join('');
    const contentEl = document.querySelector('.file-uploader-modal').querySelector('.content');
    contentEl.innerHTML = stringHtml;
  }

  /**
   * Формирует HTML разметку с изображением, полем ввода для имени файла и кнопкной загрузки
   */
  getImageHTML(item) {
  return `<div class="image-preview-container">
    <img src=${item} />
    <div class="ui action input">
      <input type="text" placeholder="Название на диске">
      <button class="ui button"><i class="upload icon"></i></button>
    </div>
  </div>`
  }

  /**
   * Отправляет все изображения в облако
   */
  sendAllImages() {
      let listImgContainer = this.uploaderEl.querySelectorAll('.image-preview-container');
      for (const imageContainer of listImgContainer) {
        this.sendImage(imageContainer);
      }
  }

  /**
   * Валидирует изображение и отправляет его на сервер
   */
  sendImage(imageContainer) {
    let input = imageContainer.querySelector('input');
    if (input.value === '') {
        input.closest('.ui.action.input').classList.add('.error');
        return
    }
    input.closest('.ui.action.input').classList.add('.disabled');
    let url = imageContainer.querySelector('img').src;
    let fileName = input.value;
    // создаём папку или убеждаемся, что она уже есть
      Yandex.сreateFolder((status1, response1) => {
      if (status1 === 201 || status1 === 409) {
        // alert(response1.message + status1);
        Yandex.uploadFile(fileName, url, (status, response) => {
          if (status >= 200 && status < 300) {
            alert("Фото загружено на диск " + status);
            imageContainer.remove();
        } else {
            alert("error " + status);
            return
          }
          let listImgContainer = this.uploaderEl.querySelectorAll('.image-preview-container');
          if (listImgContainer.length === 0) {
            App.getModal('fileUploader').close();
          }
        });
      } else if (status1 === 401) {
        Yandex.getToken(true)
      } else {
        alert("Не удаётся создать папку " + status1);
        return
      }
      })
    
  }
}
