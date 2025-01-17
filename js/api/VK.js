/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
export class VK {

  static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;
    let scr = document.createElement('script');
    src.classList.add('request');
    let url = `https://api.vk.com/method/photos.get?owner_id=${id}&access_token=${this.ACCESS_TOKEN}&v=5.199`;
    scr.innerText = `import {VK} from 'js/api/VK.js'; const imgRequestst = new XMLHttpRequest(); imgRequest.open('POST', ${url}); imgRequest.responseType = "json"; imgRequest.setRequestHeader( 'Content-type', 'multipart/form-data' ); imgRequest.send(); imgRequest.upload.addEventListener('load', () => VK.processData(imgRequest))`
    document.body.insertAdjacentElement('beforeend', src);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result){
    let scriptReq = document.querySelector('.request');
    scriptReq.remove();
    result.addEventListener('load', (e) => {
      if (this.status >= 200 && this.status < 300) {
        console.log("success");
        let resp = result.response;
        console.log(resp);
      } else {
        alert("error " + this.status);
      }
    })
  }
}

