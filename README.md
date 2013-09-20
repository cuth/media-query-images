# Responsive Image Attributes

This is an attempt to make images responsive and to only have the user download the image they need.

Current solutions include: [picturefill](https://github.com/scottjehl/picturefill), [Adaptive Images](https://github.com/MattWilcox/Adaptive-Images), [HiSRC](https://github.com/teleject/hisrc).

Further Reading: [Which responsive images solution should you use?](http://css-tricks.com/which-responsive-images-solution-should-you-use/)

### Features:
* Use media queries to assign the image src to other image attributes
* Uses matchMedia listeners to change the image on window resize
* Lightweight and simple
* Completely customized with media queries

### Faults:
* Requires javascript or a default image which would cause two file downloads

### Set up:
* Use jQuery
* Optionally add [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/)
* Add `responsive-image-attributes.js`

### Add Custom Image Attributes

    <img class="profile1" src="" width="200" height="100" alt="responsive image" data-src-medium="img/350x150.gif" data-src-small="img/200x100.gif" data-src-large="img/500x200.gif" data-src-xlarge="img/600x250.gif">

### Create a profile object

    var profile1 = new window.RIA('img.profile1', [
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
            mediaQuery: '',
            type: 'data-src-large',
            retinaType: 'data-src-xlarge'
        }
    ]);

### Three options to handle the original source
1. Leave it blank and add this CSS: `img[src=""] { visibility: hidden; }`
2. Use this as the initial src: `src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"`
3. Use the mobile first image as the original image. This may cause two image requests.