export default function setHTML(dest, html){
    if(typeof html === 'string'){
        dest.innerHTML = html;
    }else{
        dest.innerHTML = '';
        dest.appendChild(html);
    }
}
