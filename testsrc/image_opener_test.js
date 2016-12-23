import { imageOpener } from '../'

let opener = imageOpener(document.querySelector('#load-pic'))

opener.on('load', images=>{
    console.log('images ',images)
    view.innerHTML = '';
    view.appendChild(images[0]);
});
