window.profile1 = new window.RIA('.profile1', [
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
        retinaType: 'data-src-large'
    },
    {
        mediaQuery: '',
        type: 'data-src-large',
        retinaType: 'data-src-xlarge'
    }
]);
window.profile2 = new window.RIA('.profile2', [
    {
        mediaQuery: '(max-width: 600px)',
        type: 'data-src-small',
        retinaType: 'data-src-medium',
        attr: {
            width: 200,
            height: 100
        }
    },
    {
        mediaQuery: '(max-width: 800px)',
        type: 'data-src-medium',
        retinaType: 'data-src-large',
        attr: {
            width: 300,
            height: 200
        }
    },
    {
        mediaQuery: '',
        type: 'data-src-large',
        retinaType: 'data-src-xlarge',
        attr: {
            width: 400,
            height: 300
        }
    }
]);