import saveImage from './lib/save_image.js';
import ImageOpener from './lib/image_opener.js';
import ImageSaver from './lib/image_saver.js';

export function imageOpener(parent, options){
    return new ImageOpener(parent, options);
}

export function imageSaver(image, options){
    return new ImageSaver(image, options);
}

export { saveImage };
