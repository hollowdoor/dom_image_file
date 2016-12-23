export default function getDataUri(
    image,
    name,
    quality
){
    let canvas;
    let type = 'image/png';
    let tagName = image.tagName.toLowerCase();

    if(tagName !== 'canvas'){
        canvas = document.createElement('canvas');
       canvas.width = image.naturalWidth; // or 'width' if you want a special/scaled size
       canvas.height = image.naturalHeight; // or 'height' if you want a special/scaled size

       canvas.getContext('2d').drawImage(image, 0, 0);
   }else{
       canvas = image;
   }


    // Get raw image data
    //callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

    // ... or get as Data URI
    //return canvas.toDataURL('image/png');
    if(/.jpg$/.test(name)){
        type = 'image/jpg';
    }
    return canvas.toDataURL(type, quality);
}
