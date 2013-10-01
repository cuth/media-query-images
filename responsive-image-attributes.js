var isRetina = (window.devicePixelRatio > 1);
var DPR = (isRetina) ? window.devicePixelRatio : 1;

// MediaQueryImgAttrs: Change images based on media queries
(function (namespace, $) {
    "use strict";
    var removeCurrentAttributes = function ($img) {
            var x,
                xlen = this.currentAttrs.length;
            for (x = 0; x < xlen; x += 1) {
                $img.removeAttr(this.currentAttrs[x]);
            }
            this.currentAttr = [];
        },
        setAttributes = function ($img, attrs) {
            if (!attrs) return;
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) {
                    $img.attr(attr, attrs[attr]);
                    this.currentAttrs.push(attr);
                }
            }
        },
        setSrc = function (index) {
            var self = this,
                type;
            if (index >= this.mqs.length) return false;
            type = (isRetina) ? this.mqs[index].retinaType || this.mqs[index].type : this.mqs[index].type;
            if (!type) return false;
            this.$images.each(function () {
                var $img = $(this);
                $img.attr('src', $img.attr(type));
                removeCurrentAttributes.call(self, $img);
                setAttributes.call(self, $img, self.mqs[index].attr);
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
        init = function (images, mqs) {
            if (!images || !mqs || !mqs.length) return false;
            this.$images = $(images);
            this.mqs = mqs;
            this.currentAttrs = [];
            createMediaQueryLists.call(this);
            runCheck.call(this);
            return true;
        };
    namespace.MediaQueryImgAttrs = function (images, mqs) {
        this.result = init.call(this, images, mqs);
    };
}(this, jQuery));

// DynamicWidthImgAttrs: Change images based on how wide the image is
(function (namespace, $) {
    "use strict";
    var defaults = {
            measure: 'width',
            operator: '<=',
            debounceTime: 150
        },
        operators = {
            '<': function (a, b) { return a < b; },
            '<=': function (a, b) { return a <= b; },
            '>': function (a, b) { return a > b; },
            '>=': function (a, b) { return a >= b; }
        },
        setSrc = function ($img, attr) {
            $img.attr('src', $img.attr(attr));
        },
        runCheck = function () {
            var self = this,
                isHeight = (this.opts.measure === 'height');
            this.$images.each(function (i) {
                var $img = $(this),
                    measurement = (isHeight) ? $img.height() : $img.width(),
                    x,
                    setLength = self.set.length;
                measurement *= DPR;
                for (x = 0; x < setLength; x += 1) {
                    if (!self.set[x].size) {
                        setSrc.call(self, $img, self.set[x].attrName);
                        return;
                    }
                    if (operators[self.opts.operator](measurement, self.set[x].size)) {
                        setSrc.call(self, $img, self.set[x].attrName);
                        return;
                    }
                }
            });
        },
        debounce = function(func, wait, immediate) {
            var timeout, args, context, timestamp, result;
            return function() {
                context = this;
                args = arguments;
                timestamp = new Date();
                var later = function() {
                    var last = (new Date()) - timestamp;
                    if (last < wait) {
                        timeout = setTimeout(later, wait - last);
                    } else {
                        timeout = null;
                        if (!immediate) result = func.apply(context, args);
                    }
                };
                var callNow = immediate && !timeout;
                if (!timeout) {
                    timeout = setTimeout(later, wait);
                }
                if (callNow) result = func.apply(context, args);
                return result;
            };
        },
        bindEvents = function () {
            var self = this;
            $(window).on('resize', debounce(function () {
                runCheck.call(self);
            }, this.opts.debounceTime));
        },
        init = function (images, set, options) {
            if (!images || !set || !set.length) return false;
            this.$images = $(images);
            this.set = set;
            this.opts = $.extend({}, defaults, options);
            bindEvents.call(this);
            runCheck.call(this);
            return true;
        };
    namespace.DynamicWidthImgAttrs = function (images, set, options) {
        this.result = init.call(this, images, set, options);
    };
}(this, jQuery));