# Responsive Image Attributes

This is an attempt to make images responsive and to only have the user download the image they need.

Current solutions include: [picturefill](https://github.com/scottjehl/picturefill), [Adaptive Images](https://github.com/MattWilcox/Adaptive-Images), [HiSRC](https://github.com/teleject/hisrc).

Further Reading: [Which responsive images solution should you use?](http://css-tricks.com/which-responsive-images-solution-should-you-use/)

## MediaQueryImgAttrs

### Features:
* Use media queries to assign the image src to other image attributes
* Uses matchMedia listeners to change the image on window resize

### Set up:
* Requires jQuery
* Optionally add the [matchMedia polyfill](https://github.com/paulirish/matchMedia.js/) for added browser support
* Add custom src attributes to your image tags.
* Add `<script src="MediaQueryImgAttrs.js"></script>` before `</body>`
* Run the constructor `new MediaQueryImgAttrs(selector*, profileArray)`

#### profileObject
| property name  | short description                                                          | type   | required |
|----------------|----------------------------------------------------------------------------|--------|----------|
| mediaQuery     | Activating Media Query (leave this blank on the last object in the array)  | string | yes      |
| attrName       | Name of the attribute when this object is activated                        | string | yes      |
| retinaAttrName | Name of the attribute when this object is activated and retina is detected | string | no       |
| attrs          | Set of attributes that will be applied when this object is activated       | object | no       |

## DynamicWidthImgAttrs

### Features:
* Measure the width of the image to determine which image to download
* Measurement of the image is multiplied by the `devicePixelRatio`
* Listens for window resize event with debouncing

### Set up:
* Requires jQuery
* Add custom src attributes to your image tags.
* Add `<script src="DynamicWidthImgAttrs.js"></script>` before `</body>`
* Run the constructor `new DynamicWidthImgAttrs(selector*, profileArray [, options])`

#### profileObject
| property name  | short description                                                          | type   | required |
|----------------|----------------------------------------------------------------------------|--------|----------|
| attrName       | Name of the attribute when this object is activated                        | string | yes      |
| size           | Value to measure against the size of the image (width by default)          | object | no       |

#### More about size
By default, the object in the array is activated if the image width is less than or equal to this value. Leave this blank on the last array item to create a catch all attribute.

#### options
| property name  | short description                                                          | type   | default  |
|----------------|----------------------------------------------------------------------------|--------|----------|
| measure        | Property of the image to measure. Either width or height.                  | string | 'width'  |
| operator       | Operator to use to compare the image size and size property in the profile | string | '<='     |
| debounceTime   | Amount of time to wait when resizing the browser before changes take effect| number | 150      |
| checkOnWinLoad | Option to run the measurement check after the window has loaded            | boolean| false    |

## More info on both:

### Three options to handle the original `src` attribute
1. Leave it blank and add this CSS: `img[src=""] { visibility: hidden; }`
2. Use this as the initial src: `src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"` - [Base64 Encode of 1x1px Transparent GIF](http://css-tricks.com/snippets/html/base64-encode-of-1x1px-transparent-gif/)
3. Use the mobile first image as the original image. This may cause two image requests.

### Custom Image Attributes Example
    <img class="profile1" src="" width="200" height="100" alt="responsive image" data-src-medium="img/350x150.gif" data-src-small="img/200x100.gif" data-src-large="img/500x200.gif" data-src-xlarge="img/600x250.gif">

### Notes
*Any CSS selector, dom element or jQuery object.