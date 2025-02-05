/**
 * Класс PreviewModal
 * Используется как обозреватель загруженный файлов в облако
 */
class PreviewModal extends BaseModal {
  constructor( element ) {
      super(element)
      this.registerEvents();
  }

  /**
   * Добавляет следующие обработчики событий:
   * 1. Клик по крестику на всплывающем окне, закрывает его
   * 2. Клик по контроллерам изображения: 
   * Отправляет запрос на удаление изображения, если клик был на кнопке delete
   * Скачивает изображение, если клик был на кнопке download
   */
  registerEvents() {
    const closeEl = document.querySelector('.uploaded-previewer-modal').querySelector('i.x.icon');
    closeEl.addEventListener('click', () => {
      e.preventDefault();
      this.close();
    })
    const contentEl = document.querySelector('.uploaded-previewer-modal').querySelector('.content');
    contentEl.addEventListener('click', (e) => {
      if (e.target.classlist.contains('delete')) {
        e.target.querySelector('i').classlist.add('icon spinner loading');
        e.target.classlist.add('disabled');
        let path = e.target.dataset.path;
        const elDel = e.target.closest('.image-preview-container');
        Yandex.removeFile(path, (status, response) => {
          if (response === null) {
            elDel.remove();
          }
        } );
      }
      if (e.target.classlist.contains('download')) {
        let url = e.target.dataset.file;
        Yandex.downloadFileByUrl(url);
      }
  })
  }


  /**
   * Отрисовывает изображения в блоке всплывающего окна
   */
  showImages(data) {

  }

  /**
   * Форматирует дату в формате 2021-12-30T20:40:02+00:00(строка)
   * в формат «30 декабря 2021 г. в 23:40» (учитывая временной пояс)
   * */
  formatDate(date) {

  }

  /**
   * Возвращает разметку из изображения, таблицы с описанием данных изображения и кнопок контроллеров (удаления и скачивания)
   */
  getImageInfo(item) {
    return `<div class="image-preview-container">
  <img src='XXX' />
  <table class="ui celled table">
  <thead>
    <tr><th>Имя</th><th>Создано</th><th>Размер</th></tr>
  </thead>
  <tbody>
    <tr><td>AAA</td><td>BBB</td><td>CCCКб</td></tr>
  </tbody>
  </table>
  <div class="buttons-wrapper">
    <button class="ui labeled icon red basic button delete" data-path='PPP'>
      Удалить
      <i class="trash icon"></i>
    </button>
    <button class="ui labeled icon violet basic button download" data-file='FFF'>
      Скачать
      <i class="download icon"></i>
    </button>
  </div>
</div>`;
  }
}
