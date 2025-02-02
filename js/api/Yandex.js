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
    // https://cloud-api.yandex.net/v1/disk/resources/upload?path=%2Ffoo&url=https%3A%2F%2Fsun9-41.userapi.com%2Fs%2Fv1%2Fif1%2Fz6jTujiDgPCSQlS7uwvaua2BmTGKev-9EDXfLMUzpouN577VIHH2XOpYhBDMZLhtv863MA.jpg%3Fquality%3D96%26as%3D32x40%2C48x60%2C72x90%2C108x135%2C160x200%2C240x300%2C360x451%2C472x591%26from%3Dbu%26cs%3D472x591
    createRequest(
      {
      'url': this.HOST + '/resources/upload?path=' + this.folder + fileName + '&url=' + encodeURIComponent(url),
      'method': 'POST',
      'headers': {
        'Authorization': 'OAuth ' + this.getToken()
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
        'Authorization': 'OAuth ' + this.getToken()
      },
      'callback': callback,
    }) 
  }

  /**
   * Метод получения всех загруженных файлов в облаке
   */
  static getUploadedFiles(callback){
    createRequest(
      {
      'url': this.HOST + '/resources/files',
      'method': 'GET',
      'headers': {
        'Authorization': 'OAuth ' + this.getToken()
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
