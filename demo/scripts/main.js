var profile1 = new MediaQueryImgAttrs('.profile1', [
    {
        mediaQuery: '(max-width: 500px)',
        type: 'data-src-small',
        retinaType: 'data-src-medium',
        attr: {
            width: 200,
            height: 100
        }
    },
    {
        mediaQuery: '(max-width: 700px)',
        type: 'data-src-medium',
        retinaType: 'data-src-large',
        attr: {
            width: 350,
            height: 150
        }
    },
    {
        type: 'data-src-large',
        retinaType: 'data-src-xlarge',
        attr: {
            width: 500,
            height: 200
        }
    }
]);
var profile2 = new MediaQueryImgAttrs('.profile2', [
    {
        mediaQuery: '(max-width: 600px)',
        type: 'data-src-small',
        retinaType: 'data-src-medium'
    },
    {
        mediaQuery: '(max-width: 800px)',
        type: 'data-src-medium',
        retinaType: 'data-src-large'
    },
    {
        type: 'data-src-large',
        retinaType: 'data-src-xlarge'
    }
]);
var profile3 = new DynamicWidthImgAttrs('.profile3', [
    {
        attrName: 'data-src-small',
        size: 400
    },
    {
        attrName: 'data-src-medium',
        size: 600
    },
    {
        attrName: 'data-src-large',
        size: 800
    },
    {
        attrName: 'data-src-xlarge'
    }
], { debounceTime: 150 });