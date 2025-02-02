/**
 * Основная функция для совершения запросов по Yandex API.
 * */
// const imgRequest = new XMLHttpRequest(); imgRequest.open('POST', 'https://api.vk.com/method/photos.get?owner_id=815147892&access_token=958eb5d439726565e9333aa30e50e0f937ee432e927f0dbd541c541887d919a7c56f95c04217915c32008&v=5.199&callback=callbackFunc'); 
// // imgRequest.responseType = "json"; 
// imgRequest.setRequestHeader( 'Content-type', 'multipart/form-data' ); 
// imgRequest.send(); imgRequest.upload.addEventListener('load', () =>  {let resp = imgRequest.response; console.log(resp);})


const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options['method'], options['url']);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Authorization', options['headers']['Authorization']);
    xhr.send();
    xhr.addEventListener('load', () => {
        callback(xhr.status, xhr.response); 
    })
};
