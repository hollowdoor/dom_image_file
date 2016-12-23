import getDataUri from './get_data_uri.js';
import fireClick from './fire_click.js';

export default function saveImage(image, name, cb){
    let link = document.createElement('a');
    document.body.appendChild(link);
    link.href = getDataUri(image);
    link.download = name;

    link.addEventListener('click', onClick);

    function onClick(e){
        setTimeout(()=>{
            link.removeEventListener('click', onClick, true);
        });
        
        if(cb){
            return cb(e);
        }

    }

    fireClick(link);
    //link.click();
}
