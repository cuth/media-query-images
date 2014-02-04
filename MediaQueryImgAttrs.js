var isRetina = (window.devicePixelRatio > 1);

(function (namespace, $) {
    "use strict";
    var defaults = {
            blankClass: 'hidden'
        },
        removeCurrentAttributes = function (img) {
            var $img = $(img),
                x,
                xlen = this.currentAttrs.length;
            for (x = 0; x < xlen; x += 1) {
                $img.removeAttr(this.currentAttrs[x]);
            }
            this.currentAttr = [];
        },
        setAttributes = function (img, attrs) {
            var $img = $(img);
            if (!attrs) return;
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    $img.attr(attr, attrs[attr]);
                    this.currentAttrs.push(attr);
                }
            }
        },
        setBlank = function (img) {
            var $img = $(img);
            $img.addClass(this.opts.blankClass);
            if ($img.is('img')) {
                $img.attr('src', '');
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
                attrName;
            if (index >= this.mqs.length) {
                this.$images.each(function () {
                    setBlank.call(self, this);
                    removeCurrentAttributes.call(self, this);
                });
                return false;
            }
            attrName = (isRetina) ? this.mqs[index].retinaAttrName || this.mqs[index].attrName : this.mqs[index].attrName;
            if (!attrName) return false;
            this.$images.each(function () {
                setImage.call(self, this, attrName);
                removeCurrentAttributes.call(self, this);
                setAttributes.call(self, this, self.mqs[index].attr);
            });
            return true;
        },
        runCheck = function () {
            var x,
                xlen = this.mqls.length;
            if (!xlen || !matchMedia) return;
            for (x = 0; x < xlen; x += 1) {
                if (this.mqls[x].matches) {
                    setSrc.call(this, x);
                    return true;
                }
            }
            return setSrc.call(this, xlen);
        },
        createMediaQueryLists = function () {
            var self = this,
                x,
                xlen = this.mqs.length,
                mqls = [];
            if (!xlen || !matchMedia) return false;
            for (x = 0; x < xlen; x += 1) {
                (function (index) {
                    var mediaQuery = self.mqs[x].mediaQuery;
                    if (!mediaQuery) return;
                    mqls[x] = matchMedia(self.mqs[x].mediaQuery);
                    if (mqls[x].addListener) {
                        mqls[x].addListener(function () {
                            runCheck.call(self);
                        });
                    }
                }(x));
            }
            this.mqls = mqls;
            return true;
        },
        init = function (images, mqs, options) {
            if (!images || !mqs || !mqs.length) return false;
            this.$images = $(images);
            if (!this.$images.length) return false;
            this.mqs = mqs;
            this.opts = $.extend({}, defaults, options);
            this.currentAttrs = [];
            createMediaQueryLists.call(this);
            runCheck.call(this);
            return true;
        };
    namespace.MediaQueryImgAttrs = function (images, mqs, options) {
        this.result = init.call(this, images, mqs, options);
    };
}(this, jQuery));