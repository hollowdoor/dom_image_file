import { imageSaver } from '../';

let saver = imageSaver(
    document.querySelector('#save-image-as')
);

saver.on('save', ready=>{
    ready.saveAs(document.querySelector('#view img'), 'mypicture.png')
});

setupCanvas();

let canvas_saver = imageSaver('#save-canvas', {
    html: 'Save Canvas'
});

canvas_saver.on('save', ready=>{
    ready.saveAs(
        document.querySelector('#c'),
        'mypicture.png'
    )
});


function setupCanvas(){
    let c = document.querySelector('#c');
    let ctx = c.getContext("2d");

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
          ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' +
                           Math.floor(255 - 42.5 * j) + ',0)';
          ctx.fillRect(j * 25, i * 25, 25, 25);
        }
      }
}
