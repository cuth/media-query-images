Media Query Images
==================

Use media queries to assign images from paths in attributes. This requires jQuery and uses matchMedia. Add the [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/) for added browser support. Assign in javascript the attributes that will be used for each media query.

```js
new MediaQueryImages('.selector', [
    {
        mediaQuery: '(max-width: 500px)',
        attrName: 'data-src-small'
    },
    {
        mediaQuery: '(max-width: 700px)',
        attrName: 'data-src-medium'
    },
    {
        attrName: 'data-src-large'
    }
], {
    blankClass: 'hidden' // The class applied to the element if the image is blank.
});
```

Public Methods
--------------
Call `runCheck` to manually process the elements (this won't be necessary in normal situations).
Call `refresh` to have MediaQueryImages rerun the selector if possible to check if images have been added or removed.

Helpful CSS
-----------
Hide image elements before src is applied.
```css
img {
    visibility: hidden;
}
img[src] {
    visibility: visible;
}
.hidden {
    display: none;
}
```

Universal Module Definition
---------------------------
This uses UMD for support in AMD, CommonJS or as a browser global (MediaQueryImages).

jQuery Plugin
-------------
For extra convenience use this as a jQuery plugin.
```js
    var profile = $('.selector').MediaQueryImages([{
        mediaQuery: '(min-width: 750px)',
        attrName: 'data-image'
    }]);
    profile.refresh();
```