function getDataUri(
    image,
    name,
    quality
){
    var canvas;
    var type = 'image/png';
    var tagName = image.tagName.toLowerCase();

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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

/**
 * Returns `true` if provided input is Element.
 * @name isElement
 * @param {*} [input]
 * @returns {boolean}
 */
var isElement = function (input) {
  return input != null && (typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.nodeType === 1 && _typeof(input.style) === 'object' && _typeof(input.ownerDocument) === 'object';
};

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: http://www.ecma-international.org/ecma-262/6.0/#sec-array.from
var polyfill = (function() {
  var isCallable = function(fn) {
    return typeof fn === 'function';
  };
  var toInteger = function (value) {
    var number = Number(value);
    if (isNaN(number)) { return 0; }
    if (number === 0 || !isFinite(number)) { return number; }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };
  var maxSafeInteger = Math.pow(2, 53) - 1;
  var toLength = function (value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };
  var iteratorProp = function(value) {
    if(value != null) {
      if(['string','number','boolean','symbol'].indexOf(typeof value) > -1){
        return Symbol.iterator;
      } else if (
        (typeof Symbol !== 'undefined') &&
        ('iterator' in Symbol) &&
        (Symbol.iterator in value)
      ) {
        return Symbol.iterator;
      }
      // Support "@@iterator" placeholder, Gecko 27 to Gecko 35
      else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };
  var getMethod = function(O, P) {
    // Assert: IsPropertyKey(P) is true.
    if (O != null && P != null) {
      // Let func be GetV(O, P).
      var func = O[P];
      // ReturnIfAbrupt(func).
      // If func is either undefined or null, return undefined.
      if(func == null) {
        return void 0;
      }
      // If IsCallable(func) is false, throw a TypeError exception.
      if (!isCallable(func)) {
        throw new TypeError(func + ' is not a function');
      }
      return func;
    }
  };
  var iteratorStep = function(iterator) {
    // Let result be IteratorNext(iterator).
    // ReturnIfAbrupt(result).
    var result = iterator.next();
    // Let done be IteratorComplete(result).
    // ReturnIfAbrupt(done).
    var done = Boolean(result.done);
    // If done is true, return false.
    if(done) {
      return false;
    }
    // Return result.
    return result;
  };

  // The length property of the from method is 1.
  return function from(items /*, mapFn, thisArg */ ) {
    'use strict';

    // 1. Let C be the this value.
    var C = this;

    // 2. If mapfn is undefined, let mapping be false.
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;

    var T;
    if (typeof mapFn !== 'undefined') {
      // 3. else
      //   a. If IsCallable(mapfn) is false, throw a TypeError exception.
      if (!isCallable(mapFn)) {
        throw new TypeError(
          'Array.from: when provided, the second argument must be a function'
        );
      }

      //   b. If thisArg was supplied, let T be thisArg; else let T
      //      be undefined.
      if (arguments.length > 2) {
        T = arguments[2];
      }
      //   c. Let mapping be true (implied by mapFn)
    }

    var A, k;

    // 4. Let usingIterator be GetMethod(items, @@iterator).
    // 5. ReturnIfAbrupt(usingIterator).
    var usingIterator = getMethod(items, iteratorProp(items));

    // 6. If usingIterator is not undefined, then
    if (usingIterator !== void 0) {
      // a. If IsConstructor(C) is true, then
      //   i. Let A be the result of calling the [[Construct]]
      //      internal method of C with an empty argument list.
      // b. Else,
      //   i. Let A be the result of the abstract operation ArrayCreate
      //      with argument 0.
      // c. ReturnIfAbrupt(A).
      A = isCallable(C) ? Object(new C()) : [];

      // d. Let iterator be GetIterator(items, usingIterator).
      var iterator = usingIterator.call(items);

      // e. ReturnIfAbrupt(iterator).
      if (iterator == null) {
        throw new TypeError(
          'Array.from requires an array-like or iterable object'
        );
      }

      // f. Let k be 0.
      k = 0;

      // g. Repeat
      var next, nextValue;
      while (true) {
        // i. Let Pk be ToString(k).
        // ii. Let next be IteratorStep(iterator).
        // iii. ReturnIfAbrupt(next).
        next = iteratorStep(iterator);

        // iv. If next is false, then
        if (!next) {

          // 1. Let setStatus be Set(A, "length", k, true).
          // 2. ReturnIfAbrupt(setStatus).
          A.length = k;

          // 3. Return A.
          return A;
        }
        // v. Let nextValue be IteratorValue(next).
        // vi. ReturnIfAbrupt(nextValue)
        nextValue = next.value;

        // vii. If mapping is true, then
        //   1. Let mappedValue be Call(mapfn, T, «nextValue, k»).
        //   2. If mappedValue is an abrupt completion, return
        //      IteratorClose(iterator, mappedValue).
        //   3. Let mappedValue be mappedValue.[[value]].
        // viii. Else, let mappedValue be nextValue.
        // ix.  Let defineStatus be the result of
        //      CreateDataPropertyOrThrow(A, Pk, mappedValue).
        // x. [TODO] If defineStatus is an abrupt completion, return
        //    IteratorClose(iterator, defineStatus).
        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        }
        else {
          A[k] = nextValue;
        }
        // xi. Increase k by 1.
        k++;
      }
      // 7. Assert: items is not an Iterable so assume it is
      //    an array-like object.
    } else {

      // 8. Let arrayLike be ToObject(items).
      var arrayLike = Object(items);

      // 9. ReturnIfAbrupt(items).
      if (items == null) {
        throw new TypeError(
          'Array.from requires an array-like object - not null or undefined'
        );
      }

      // 10. Let len be ToLength(Get(arrayLike, "length")).
      // 11. ReturnIfAbrupt(len).
      var len = toLength(arrayLike.length);

      // 12. If IsConstructor(C) is true, then
      //     a. Let A be Construct(C, «len»).
      // 13. Else
      //     a. Let A be ArrayCreate(len).
      // 14. ReturnIfAbrupt(A).
      A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 15. Let k be 0.
      k = 0;
      // 16. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = arrayLike[k];
        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        }
        else {
          A[k] = kValue;
        }
        k++;
      }
      // 17. Let setStatus be Set(A, "length", len, true).
      // 18. ReturnIfAbrupt(setStatus).
      A.length = len;
      // 19. Return A.
    }
    return A;
  };
})();

var index$13 = (typeof Array.from === 'function' ?
  Array.from :
  polyfill
);

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

var index$14 = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

function select(selector){
    if(typeof selector === 'string'){
        try{
            return document.querySelector(selector);
        }catch(e){
            throw e;
        }
    }else if(isElement(selector)){
        return selector;
    }
}

function indexOfElement(elements, element){
    element = resolveElement(element, true);
    if(!isElement(element)) { return -1; }
    for(var i=0; i<elements.length; i++){
        if(elements[i] === element){
            return i;
        }
    }
    return -1;
}

function hasElement(elements, element){
    return -1 !== indexOfElement(elements, element);
}

function domListOf(arr){

    if(!arr) { return []; }

    try{
        if(typeof arr === 'string'){
            return index$13(document.querySelectorAll(arr));
        }else if(index$14(arr)){
            return arr.map(resolveElement);
        }else{
            if(typeof arr.length === 'undefined'){
                return [resolveElement(arr)];
            }

            return index$13(arr, resolveElement);

        }
    }catch(e){
        throw new Error(e);
    }

}

function pushElements(elements, toAdd){

    for(var i=0; i<toAdd.length; i++){
        if(!hasElement(elements, toAdd[i]))
            { elements.push(toAdd[i]); }
    }

    return toAdd;
}

function resolveElement(element, noThrow){
    if(typeof element === 'string'){
        try{
            return document.querySelector(element);
        }catch(e){
            throw e;
        }

    }

    if(!isElement(element) && !noThrow){
        throw new TypeError((element + " is not a DOM element."));
    }
    return element;
}

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

        input = select(input);

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

        input = select(input);

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
            saveAs: function(image, name, quality){
                if(!image) { return; }
                link.href = getDataUri(image, name, quality);
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

export { imageOpener, imageSaver, saveImage };
