dom-image-file
=====

Install
-------

`npm install --save dom-image-file`

Compile into your project with browserify, rollup, or some other module bundler.

Open Image
----------

```javascript
import { imageOpener } from 'dom-image-file';
//#load-image should be an input field
//When you pass an element to imageOpener
//it will hide it, and replace it with a label
//to be clicked on to save an image.
let opener = imageOpener(document.querySelector('#load-image'))

opener.on('load', images=>{
    console.log('images ',images)
    view.innerHTML = '';
    view.appendChild(images[0]);
});

```

Save An Image
-------------

```javascript
import { imageSaver } from 'dom-image-file';

let saver = imageSaver(
    document.querySelector('#save-image-as')
);

saver.on('save', ready=>{
    ready.saveAs(
        document.querySelector('#view img'),
        'mypicture.png'
    )
});

```

About
----

These methods are to be used to attach image open/save functionality to DOM elements. Specifically to input elements. Both methods only accept an input as the first argument. An input used this way should be a bare input.

Properties
----------

### innerHTML

Set the innerHTML of the elements produced by imageOpener, or imageSaver.
