var profile1 = new MediaQueryImgAttrs('.profile1', [
    {
        mediaQuery: '(max-width: 500px)',
        attrName: 'data-src-small',
        retinaAttrName: 'data-src-medium',
        attr: {
            width: 200,
            height: 100
        }
    },
    {
        mediaQuery: '(max-width: 700px)',
        attrName: 'data-src-medium',
        retinaAttrName: 'data-src-large',
        attr: {
            width: 350,
            height: 150
        }
    },
    {
        attrName: 'data-src-large',
        retinaAttrName: 'data-src-xlarge',
        attr: {
            width: 500,
            height: 200
        }
    }
]);
var profile2 = new MediaQueryImgAttrs('.profile2', [
    {
        mediaQuery: '(max-width: 600px)',
        attrName: 'data-src-small',
        retinaAttrName: 'data-src-medium'
    },
    {
        mediaQuery: '(max-width: 800px)',
        attrName: 'data-src-medium',
        retinaAttrName: 'data-src-large'
    },
    {
        attrName: 'data-src-large',
        retinaAttrName: 'data-src-xlarge'
    }
]);
var profile3 = new DynamicWidthImgAttrs('.profile3', [
    {
        attrName: 'data-src-small',
        size: 200
    },
    {
        attrName: 'data-src-medium',
        size: 350
    },
    {
        attrName: 'data-src-large',
        size: 500
    },
    {
        attrName: 'data-src-xlarge'
    }
], { checkOnWindowLoad: true });
var profile2 = new MediaQueryImgAttrs('.profile4', [
    {
        mediaQuery: '(max-width: 800px)',
        attrName: 'data-src-large'
    }
]);