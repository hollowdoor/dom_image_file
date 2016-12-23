import { Emitter } from 'more-events';
import getDataUri from './get_data_uri.js';
import css from 'dom-css';
import isInput from './is_input.js';
//import hideInput from './hide_input.js';
import transformInput from './transform_input.js';
import setHTML from './set_html.js';


export default class ImagesSaver extends Emitter {
    constructor(input, options){
        super();

        if(!isInput(input)){
            throw new TypeError(`${input} is not an input element.`);
        }

        options = options || {};
        const self = this;
        this.input = input;


        let link = this.link = document.createElement('a');
        let container = document.createElement('span');
        container.appendChild(link);

        link.href = '#';

        this.html(options.html || 'Save File');

        transformInput(input, container);

        this.name = options.name || 'image.png';

        css(link, {
            'text-decoration': 'none',
            'color': 'black'
        });

        const emit = (ev, val) => this.emit(ev, val);

        link.addEventListener('mousedown', onDown, false);
        link.addEventListener('touchstart', onDown, false);

        const saver = {
            saveAs: function(image, name){
                if(!image) return;
                link.href = getDataUri(image);
                link.download = name;
                input.value = name;
            }
        };

        function onDown(e){
            if(e.targetTouches){
                e.preventDefault();
            }
            emit('save', saver);
        }

        this.destroy = function(){
            link.removeEventListener('click', onClick, false);
            container.parentNode.removeChild(container);
            return input;
        };
    }
    html(str){
        if(str){
            setHTML(this.link, str);
            return;
        }
        return this.link.innerHTML;
    }
    get className(){
        return this.container.className;
    }
    set className(value){
        this.container.className = value;
    }
}
