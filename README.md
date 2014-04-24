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

Helpful CSS
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