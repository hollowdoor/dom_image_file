(function (exports) {
'use strict';

function getDataUri(image){
    var canvas;
    if(image.tagName !== 'canvas'){
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
    return canvas.toDataURL('image/png');
}

function fireClick(link){
    if(document.createEvent){
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        link.dispatchEvent(event);
    } else {
        link.click();
    }
}

function saveImage(image, name, cb){
    var link = document.createElement('a');
    document.body.appendChild(link);
    link.href = getDataUri(image);
    link.download = name;

    link.addEventListener('click', onClick);

    function onClick(e){
        setTimeout(function (){
            link.removeEventListener('click', onClick, true);
        });
        
        if(cb){
            return cb(e);
        }

    }

    fireClick(link);
    //link.click();
}

var div = null;
var prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ];

var index$1 = function prefixStyle (prop) {
  // re-use a dummy div
  if (!div) {
    div = document.createElement('div');
  }

  var style = div.style;

  // prop exists without prefix
  if (prop in style) {
    return prop
  }

  // borderRadius -> BorderRadius
  var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1);

  // find the vendor-prefixed prop
  for (var i = prefixes.length; i >= 0; i--) {
    var name = prefixes[i] + titleCase;
    // e.g. WebkitBorderRadius or webkitBorderRadius
    if (name in style) {
      return name
    }
  }

  return false
};

/**
 * Export.
 */

var index$7 = toNoCase;

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/;
var hasSeparator = /(_|-|\.|:)/;
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) { return string.toLowerCase() }
  if (hasSeparator.test(string)) { return (unseparate(string) || string).toLowerCase() }
  if (hasCamel.test(string)) { return uncamelize(string).toLowerCase() }
  return string.toLowerCase()
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g;

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g;

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}

var clean = index$7;

/**
 * Export.
 */

var index$5 = toSpaceCase;

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  }).trim()
}

var space = index$5;

/**
 * Export.
 */

var index$3 = toCamelCase$1;

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

function toCamelCase$1(string) {
  return space(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}

/* The following list is defined in React's core */
var IS_UNITLESS = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

var index$9 = function(name, value) {
  if(typeof value === 'number' && !IS_UNITLESS[ name ]) {
    return value + 'px';
  } else {
    return value;
  }
};

var prefix = index$1;
var toCamelCase = index$3;
var cache = { 'float': 'cssFloat' };
var addPxToStyle = index$9;

function style (element, property, value) {
  var camel = cache[property];
  if (typeof camel === 'undefined') {
    camel = detect(property);
  }

  // may be false if CSS prop is unsupported
  if (camel) {
    if (value === undefined) {
      return element.style[camel]
    }

    element.style[camel] = addPxToStyle(camel, value);
  }
}

function each (element, properties) {
  for (var k in properties) {
    if (properties.hasOwnProperty(k)) {
      style(element, k, properties[k]);
    }
  }
}

function detect (cssProp) {
  var camel = toCamelCase(cssProp);
  var result = prefix(camel);
  cache[camel] = cache[cssProp] = cache[result] = result;
  return result
}

function set () {
  if (arguments.length === 2) {
    if (typeof arguments[1] === 'string') {
      arguments[0].style.cssText = arguments[1];
    } else {
      each(arguments[0], arguments[1]);
    }
  } else {
    style(arguments[0], arguments[1], arguments[2]);
  }
}

var index = set;
var set_1 = set;

var get = function (element, properties) {
  if (Array.isArray(properties)) {
    return properties.reduce(function (obj, prop) {
      obj[prop] = style(element, prop || '');
      return obj
    }, {})
  } else {
    return style(element, properties || '')
  }
};

index.set = set_1;
index.get = get;

//Most for use with gyre
/*
git remote add origin https://github.com/hollowdoor/more_events.git
git push -u origin master
*/
function MoreEvents(context){
    this.listeners = {};
    this.__context = context || this;
}

MoreEvents.prototype = {
    constructor: MoreEvents,
    on: function(event, listener){
        this.listeners[event] = this.listeners[event] || [];
        this.listeners[event].push(listener);
        return this;
    },
    one: function(event, listener){
        function onceListener(){
            listener.apply(this, arguments);
            this.off(event, onceListener);
            return this;
        }
        return this.on(event, onceListener);
    },
    emit: function(event){
        var this$1 = this;

        if(typeof this.listeners[event] === 'undefined' || !this.listeners[event].length)
            { return this; }

        var args = Array.prototype.slice.call(arguments, 1),
            canRun = this.listeners[event].length;

        do{
            this$1.listeners[event][--canRun].apply(this$1.__context, args);
        }while(canRun);

        return this;
    },
    off: function(event, listener){
        if(this.listeners[event] === undefined || !this.listeners[event].length)
            { return this; }
        this.listeners[event] = this.listeners[event].filter(function(item){
            return item !== listener;
        });
        return this;
    },
    dispose: function(){
        var this$1 = this;

        for(var n in this){
            this$1[n] = null;
        }
    }
};

var Emitter = MoreEvents;

function isInput(input){
    if(typeof input === 'object'){
        if(input['tagName'] && input.tagName.toLowerCase() === 'input'){
            return true;
        }
    }
    return false;
}

function transformInput(input, to){
    hideInput(input);
    input.parentNode.insertBefore(to, input);
    return input;
}

function hideInput(input){
    //Hide the input
    index(input, {
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        'z-index': -1
    });
}

function setHTML(dest, html){
    if(typeof html === 'string'){
        dest.innerHTML = html;
    }else{
        dest.innerHTML = '';
        dest.appendChild(html);
    }
}

//import hideInput from './hide_input.js';
var ImageOpener = (function (Emitter$$1) {
    function ImageOpener(input, options){
        var this$1 = this;
        if ( options === void 0 ) options = {};

        Emitter$$1.call(this);
        //<input type="file" name="file" id="file" class="inputfile" />
        //<label for="file">Choose a file</label>

        if(!isInput(input)){
            throw new TypeError((input + " is not an input element."));
        }

        var label = this.label = document.createElement('label');
        this.input = input;

        if(options.id){
            this.id = options.id;
        }else if(input.hasAttribute('id')){
            var id = input.getAttribute('id');
            if(id.length){
                this.id = input.getAttribute('id');
            }else{
                this.id = 'dom-image-file-opener';
            }
        }

        if(typeof options.multiple === 'boolean'){
            this.multiple = options.multiple;
        }else if(input.hasAttribute('multiple')){
            var multiple = input.getAttribute('multiple');
            if(multiple.length){
                this.multiple = multiple;
            }
        }

        if(typeof options.className === 'string'){
            this.className = options.className;
        }

        input.setAttribute('type', 'file');

        index(label, {
            cursor: 'pointer'
        });

        if(options.innerHTML){
            this.innerHTML = options.innerHTML;
        }else if(!this.innerHTML.length){
            this.innerHTML = 'Open Image';
        }

        transformInput(input, label);

        var emit = function (ev, val) { return this$1.emit(ev, val); };

        input.addEventListener('change', onOpen, false);

        function onOpen(e){

            emit('loading');

            var running = input.files.length;
            var sources = [];
            var images = [];
            [].slice.call(input.files).forEach(run);

            function run(file){
                var img = new Image();
                var url = window.URL || window.webkitURL;
                var src = url.createObjectURL(file);
                img.src = src;
                sources.push(src);
                images.push(img);
                img.onload = function(){
                    if(!--running){
                        emit('load', images);
                        setTimeout(function (){
                            sources.forEach(function (src){
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

    if ( Emitter$$1 ) ImageOpener.__proto__ = Emitter$$1;
    ImageOpener.prototype = Object.create( Emitter$$1 && Emitter$$1.prototype );
    ImageOpener.prototype.constructor = ImageOpener;

    var prototypeAccessors = { innerHTML: {},id: {},parent: {},className: {},multiple: {} };
    ImageOpener.prototype.html = function html (str){
        if(str){
            setHTML(this.label, str);
            return;
        }
        return this.label.innerHTML;
    };
    prototypeAccessors.innerHTML.get = function (){
        return this.label.innerHTML;
    };
    prototypeAccessors.innerHTML.set = function (html){
        this.label.innerHTML = html;
    };
    prototypeAccessors.id.set = function (value){
        this.input.setAttribute('id', value);
        this.label.setAttribute('for', value);
    };
    prototypeAccessors.id.get = function (){
        return this.input.getAttribute('id');
    };
    prototypeAccessors.parent.get = function (){
        return this.input.parentNode;
    };
    prototypeAccessors.className.get = function (){
        return this.label.className;
    };
    prototypeAccessors.className.set = function (value){
        this.label.className = value;
    };
    prototypeAccessors.multiple.set = function (value){
        this.input.setAttribute('multiple', value);
    };

    Object.defineProperties( ImageOpener.prototype, prototypeAccessors );

    return ImageOpener;
}(Emitter));

//import hideInput from './hide_input.js';
var ImagesSaver = (function (Emitter$$1) {
    function ImagesSaver(input, options){
        var this$1 = this;

        Emitter$$1.call(this);

        if(!isInput(input)){
            throw new TypeError((input + " is not an input element."));
        }

        options = options || {};
        var self = this;
        this.input = input;


        var link = this.link = document.createElement('a');
        var container = document.createElement('span');
        container.appendChild(link);

        link.href = '#';

        this.html(options.html || 'Save File');

        transformInput(input, container);

        this.name = options.name || 'image.png';

        index(link, {
            'text-decoration': 'none',
            'color': 'black'
        });

        var emit = function (ev, val) { return this$1.emit(ev, val); };

        link.addEventListener('mousedown', onDown, false);
        link.addEventListener('touchstart', onDown, false);

        var saver = {
            saveAs: function(image, name){
                if(!image) { return; }
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

    if ( Emitter$$1 ) ImagesSaver.__proto__ = Emitter$$1;
    ImagesSaver.prototype = Object.create( Emitter$$1 && Emitter$$1.prototype );
    ImagesSaver.prototype.constructor = ImagesSaver;

    var prototypeAccessors = { className: {} };
    ImagesSaver.prototype.html = function html (str){
        if(str){
            setHTML(this.link, str);
            return;
        }
        return this.link.innerHTML;
    };
    prototypeAccessors.className.get = function (){
        return this.container.className;
    };
    prototypeAccessors.className.set = function (value){
        this.container.className = value;
    };

    Object.defineProperties( ImagesSaver.prototype, prototypeAccessors );

    return ImagesSaver;
}(Emitter));

function imageOpener(parent, options){
    return new ImageOpener(parent, options);
}

function imageSaver(image, options){
    return new ImagesSaver(image, options);
}

exports.imageOpener = imageOpener;
exports.imageSaver = imageSaver;
exports.saveImage = saveImage;

}((this.domImageFile = this.domImageFile || {})));
