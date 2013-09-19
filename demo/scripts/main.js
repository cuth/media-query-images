var opts = { convertWidths: [300, 400, 500] };
window.profile1 = new window.RIA('img', [
        {
            mediaQuery: '(max-width: 500px)',
            type: 'data-src-small',
            retinaType: 'data-src-medium'
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
    ], opts);