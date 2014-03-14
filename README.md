# Responsive Image Attributes

This is an attempt to make images responsive and to only have the client download the image they need. If it is an image element then the image is applied in the `src`. If it is not an image element the image is applied as an inline background-image.

## MediaQueryImgAttrs

Use media queries to assign images from paths in attributes. This requires jQuery and uses matchMedia. Add the [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/) for added browser support. Assign in javascript the attributes that will be used for each media query.

```js
new MediaQueryImgAttrs('.selector', [
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

## DynamicWidthImgAttrs

Use the width of the element to assign images from paths in attributes. This requires jQuery. Assign in javascript the attributes that will be used for each element width.

```javascript
new DynamicWidthImgAttrs('.selector', [
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
], {
    measure: 'width', // either 'width' or 'height'
    operator: '<=', // '<', '>', '<=', or '>='
    debounceTime: 150, // time it waits after browser resize
    checkOnWinLoad: false // measure sizes after window onload
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