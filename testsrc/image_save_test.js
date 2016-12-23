import { saveImage } from '../'

document.querySelector('#save-image')
.addEventListener('click', (e)=>{
    console.log('trying to save image')
    console.log(document.querySelector('#view img'))
    saveImage(document.querySelector('#view img'), 'bla.png')
});
