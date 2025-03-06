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


  static getToken(flagInput=false) {
    let token = null;
    token = localStorage.getItem('token');
    if (!token || flagInput === true) {
      token = prompt('введите Яндекс токен');
      localStorage.setItem('token', token);
    }
    return token
  }
  // метод создания папки
  static сreateFolder(callback){
    createRequest(
      {
        // https://cloud-api.yandex.net/v1/disk/resources?path=%2Fphotos_from_vk%2F
      'url': this.HOST + '/resources?path=' + this.folder,
      'method': 'PUT',
      'headers': {
        'Authorization': 'OAuth ' + encodeURIComponent(this.getToken())
      },
      'callback': callback,
    }) 
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
  static removeFile(path, callback){
    createRequest(
      {
      // 'url': this.HOST + '/resources?path=' + this.folder + fileName,
      'url': this.HOST + '/resources?path=' + path,
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
      // 'url': this.HOST + '/resources/files?media_type=image',
      'url': this.HOST + '/resources?path=' + this.folder + '&limit=100',
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
