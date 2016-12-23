import css from 'dom-css';

export default function transformInput(input, to){
    hideInput(input);
    input.parentNode.insertBefore(to, input);
    return input;
}

function hideInput(input){
    //Hide the input
    css(input, {
        width: '0.1px',
        height: '0.1px',
        opacity: 0,
        overflow: 'hidden',
        position: 'absolute',
        'z-index': -1
    });
}
