/**
 * Класс Yandex
 * Используется для управления облаком.
 * Имеет свойство HOST
 * */
class Yandex {
  static HOST = 'https://cloud-api.yandex.net/v1/disk';
  static folder = encodeURIComponent('/photos_from_vk/');

  /**
   * Метод формирования и сохранения токена для Yandex API
   */
  static getToken() {
    let token = null;
    token = localStorage.getItem('token');
    if (token === null) {
      let token = prompt('введите Яндекс токен');
      localStorage.setItem('token', token);
    }
    return token
  }
  

  /**
   * Метод загрузки файла в облако
   */
  static uploadFile(fileName, url, callback){
    createRequest(
      {
      'url': this.HOST + '/resources/upload?path=' + this.folder + fileName + '&url=' + encodeURIComponent(url),
      'method': 'POST',
      'headers': {
        'Authorization': 'OAuth ' + encodeURIComponent(this.getToken())
      },
      'callback': callback,
    }) 
  }

  /**
   * Метод удаления файла из облака
   */
  static removeFile(fileName, callback){
    createRequest(
      {
      'url': this.HOST + '/resources?path=' + this.folder + fileName,
      'method': 'DELETE',
      'headers': {
        'Authorization': 'OAuth ' + encodeURIComponent(this.getToken())
      },
      'callback': callback,
    }) 
  }

  /**
   * Метод получения всех загруженных файлов c изображением в облаке
   */
  static getUploadedFiles(callback){
    createRequest(
      {
      'url': this.HOST + '/resources/files?media_type=image',
      'method': 'GET',
      'headers': {
        'Authorization': 'OAuth ' + encodeURIComponent(this.getToken())
      },
      'callback': callback,
    }) 
  }

  /**
   * Метод скачивания файлов
   */
  static downloadFileByUrl(url){
    const elDownload = document.createElement('a');
    elDownload.href = url;
    elDownload.setAttribute('download', 'fileDownload');
    document.body.appendChild(elDownload);
    elDownload.click();
    elDownload.remove();
  }
}
