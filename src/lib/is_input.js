export default function isInput(input){
    if(typeof input === 'object'){
        if(input['tagName'] && input.tagName.toLowerCase() === 'input'){
            return true;
        }
    }
    return false;
}
