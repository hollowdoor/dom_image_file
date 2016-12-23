export default function addAttributeOptions(self, element, options, defaults){
    Object.keys(defaults).forEach(name=>{
        if(options.hasOwnProperty(name)){
            self[name] = options[name];
        }else if(element.hasAttribute(name)){
            let value = element.getAttribute(name);
            if(value.length){
                self[name] = value;
            }else{
                self[name] = defaults[name];
            }
        }
    })
}
