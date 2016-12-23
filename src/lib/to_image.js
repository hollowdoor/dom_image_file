export default function toImage(value, cb){
    
    if(value['tagName']){
        let tagName = value.tagName.toLowerCase();
        if(tagName === 'img'){
            newImage(value.src, cb);
        }else if(tagName === 'canvas'){
            newImage(value.toDataURL('image/png'), cb);
        }
    }

    throw new TypeError(`${value} could not be converted toImage.`);
}

function newImage(uri, cb){
    let img = new Image();
    img.src = uri;
    img.onload = function(){
        cb(img);
    };
}
