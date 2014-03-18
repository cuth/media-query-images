/* Media Query Image Attributes
 * version: 1.0
 * https://github.com/cuth/responsive-image-attributes
 */
;(function (exports, $) {
    "use strict";
    var defaults = {
            blankClass: 'hidden'
        },
        isRetina = (window.devicePixelRatio > 1),
        setBlank = function (img) {
            var $img = $(img);
            $img.addClass(this.opts.blankClass);
            if ($img.is('img')) {
                $img.removeAttr('src');
            } else {
                $img.css('background-image', '');
            }
        },
        setImage = function (img, attrName) {
            var $img = $(img),
                path = $img.attr(attrName);
            if (!path) {
                setBlank.call(this, img);
                return;
            }
            $img.removeClass(this.opts.blankClass);
            if ($img.is('img')) {
                $img.attr('src', path);
            } else {
                $img.css('background-image', "url('" + path + "')");
            }
        },
        setSrc = function (index) {
            var self = this,
                mq, attrName;
            // if no default was set
            if (index >= this.mqs.length) {
                this.$images.each(function () {
                    setBlank.call(self, this);
                });
                return false;
            }
            mq = this.mqs[index];
            attrName = (isRetina) ? mq.retinaAttrName || mq.attrName : mq.attrName;
            if (!attrName) return false;
            this.$images.each(function () {
                setImage.call(self, this, attrName);
            });
        },
        runCheck = function () {
            for (var x = 0, xlen = this.mqls.length; x < xlen; x += 1) {
                if (this.mqls[x].matches) {
                    setSrc.call(this, x);
                    return;
                }
            }
            setSrc.call(this, xlen);
        },
        bindListeners = function () {
            if (!this.mqls[0].addListener) return;
            for (var x = 0, xlen = this.mqls.length; x < xlen; x += 1) {
                this.mqls[x].addListener(runCheck.bind(this));
            }
        },
        createMediaQueryLists = function () {
            var mqls = [];
            for (var x = 0, xlen = this.mqs.length; x < xlen; x += 1) {
                if (!this.mqs[x].mediaQuery) break;
                mqls[x] = matchMedia(this.mqs[x].mediaQuery);
            }
            return mqls;
        },
        init = function (images, mqs, options) {
            if (!images || !mqs || !mqs.length || !matchMedia) return false;
            this.$images = $(images);
            if (!this.$images.length) return false;
            this.mqs = mqs;
            this.opts = $.extend({}, defaults, options);
            this.mqls = createMediaQueryLists.call(this);
            bindListeners.call(this);
            runCheck.call(this);
            return true;
        };
    exports.MediaQueryImgAttrs = function (images, mqs, options) {
        this.result = init.call(this, images, mqs, options);
    };
}(this, jQuery));