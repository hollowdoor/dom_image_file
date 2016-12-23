export default function fireClick(link){
    if(document.createEvent){
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        link.dispatchEvent(event);
    } else {
        link.click();
    }
}
