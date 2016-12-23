import css from 'dom-css';
import { Emitter } from 'more-events';
import { select } from 'dom-set';
import isInput from './is_input.js';
//import hideInput from './hide_input.js';
import transformInput from './transform_input.js';
import setHTML from './set_html.js';

export default class ImageOpener extends Emitter {
    constructor(input, options = {}){
        super();
        //<input type="file" name="file" id="file" class="inputfile" />
        //<label for="file">Choose a file</label>

        input = select(input);

        if(!isInput(input)){
            throw new TypeError(`${input} is not an input element.`);
        }

        let label = this.label = document.createElement('label');
        this.input = input;

        if(options.id){
            this.id = options.id
        }else if(input.hasAttribute('id')){
            let id = input.getAttribute('id');
            if(id.length){
                this.id = input.getAttribute('id');
            }else{
                this.id = 'dom-image-file-opener';
            }
        }

        if(typeof options.multiple === 'boolean'){
            this.multiple = options.multiple;
        }else if(input.hasAttribute('multiple')){
            let multiple = input.getAttribute('multiple');
            if(multiple.length){
                this.multiple = multiple;
            }
        }

        if(typeof options.className === 'string'){
            this.className = options.className;
        }

        input.setAttribute('type', 'file');

        css(label, {
            cursor: 'pointer'
        });

        if(options.innerHTML){
            this.innerHTML = options.innerHTML;
        }else if(!this.innerHTML.length){
            this.innerHTML = 'Open Image';
        }

        transformInput(input, label);

        const emit = (ev, val) => this.emit(ev, val);

        input.addEventListener('change', onOpen, false);

        function onOpen(e){

            emit('loading');

            let running = input.files.length;
            let sources = [];
            let images = [];
            [].slice.call(input.files).forEach(run);

            function run(file){
                let img = new Image();
                let url = window.URL || window.webkitURL;
                let src = url.createObjectURL(file);
                img.src = src;
                sources.push(src);
                images.push(img);
                img.onload = function(){
                    if(!--running){
                        emit('load', images);
                        setTimeout(()=>{
                            sources.forEach(src=>{
                                url.revokeObjectURL(src);
                            });
                        });
                    }
                };

            }
        }

        this.destroy = function(){
            input.removeEventListener('change', onOpen, false);
            label.parentNode.removeChild(label);
            return input;
        };

    }
    html(str){
        if(str){
            setHTML(this.label, str);
            return;
        }
        return this.label.innerHTML;
    }
    get innerHTML(){
        return this.label.innerHTML;
    }
    set innerHTML(html){
        this.label.innerHTML = html;
    }
    set id(value){
        this.input.setAttribute('id', value);
        this.label.setAttribute('for', value);
    }
    get id(){
        return this.input.getAttribute('id');
    }
    get parent(){
        return this.input.parentNode;
    }
    get className(){
        return this.label.className;
    }
    set className(value){
        this.label.className = value;
    }
    set multiple(value){
        this.input.setAttribute('multiple', value);
    }

}
