
/**
 * Класс VK
 * Управляет изображениями из VK. С помощью VK API.
 * С помощью этого класса будет выполняться загрузка изображений из vk.
 * Имеет свойства ACCESS_TOKEN и lastCallback
 * */
class VK {

  // static ACCESS_TOKEN = '958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008';
  static ACCESS_TOKEN = '0001f91e0001f91e0001f91e0a0314ce60000010001f91e64ccd76a68249253c69ab758';
  static lastCallback;

  /**
   * Получает изображения
   * */
  static get(id = '', callback){
    this.lastCallback = callback;
    let script = document.createElement('script');
    script.classList.add('request');
    script.src = `https://api.vk.com/method/photos.get?owner_id=${id}&access_token=${VK.ACCESS_TOKEN}&album_id=wall&count=10&v=5.199&callback=$VK.processData`;
    // script.src = `https://api.vk.com/method/photos.get?owner_id=${encodeURIComponent(id)}&access_token=${encodeURIComponent(VK.ACCESS_TOKEN)}&album_id=profile&photo_sizes=0&v=5.199&callback=VK.processData`;
    document.body.insertAdjacentElement('beforeend', script);
  }

  /**
   * Передаётся в запрос VK API для обработки ответа.
   * Является обработчиком ответа от сервера.
   */
  static processData(result) {
    try {
    let scriptReq = document.querySelector('.request');
    scriptReq.remove();
    // console.log(result);
    const listUrlphoto = result.response.items.map(item => item.sizes[item.sizes.length - 1].url);
    // console.log(listUrlphoto);
    VK.lastCallback(listUrlphoto);
    VK.lastCallback = () => {}
    } 
    catch (err) {
      alert(err+'/ Введите id другого пользователя');
    }
    
  }
}



