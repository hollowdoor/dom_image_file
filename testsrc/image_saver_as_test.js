import { imageSaver } from '../';

let saver = imageSaver(
    document.querySelector('#save-image-as')
);

saver.on('save', ready=>{
    ready.saveAs(document.querySelector('#view img'), 'mypicture.png')
});
