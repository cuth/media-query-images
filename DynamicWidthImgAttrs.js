/* Dynamic Width Image Attributes
 * version: 1.0.2
 * https://github.com/cuth/responsive-image-attributes
 */
;(function (exports, $) {
    'use strict';
    var defaults = {
            measure: 'width',
            operator: '<=',
            debounceTime: 150,
            checkOnWinLoad: false
        },
        devicePixelRatio = devicePixelRatio || 1,
        operators = {
            '<': function (a, b) { return a < b; },
            '<=': function (a, b) { return a <= b; },
            '>': function (a, b) { return a > b; },
            '>=': function (a, b) { return a >= b; }
        },
        setSrc = function ($img, attr) {
            if ($img.is('img')) {
                $img.attr('src', $img.attr(attr));
            } else {
                $img.css('background-image', 'url("' + $img.attr(attr) + '")');
            }
        },
        runCheck = function () {
            var self = this,
                isHeight = (this.opts.measure === 'height');
            this.$images.each(function () {
                var $img = $(this),
                    measurement = (isHeight) ? $img.height() : $img.width(),
                    x,
                    setLength = self.set.length;
                measurement *= devicePixelRatio;
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
            var self = this,
                $w = $(window);
            $w.on('resize', debounce(function () {
                runCheck.call(self);
            }, this.opts.debounceTime));
            if (this.opts.checkOnWinLoad) {
                $w.on('load', function () {
                    runCheck.call(self);
                });
            }
        },
        init = function (images, set, options) {
            if (!images || !set || !set.length) return false;
            this.$images = $(images);
            if (!this.$images.length) return false;
            this.set = set;
            this.opts = $.extend({}, defaults, options);
            bindEvents.call(this);
            runCheck.call(this);
            return true;
        };
    exports.DynamicWidthImgAttrs = function (images, set, options) {
        this.result = init.call(this, images, set, options);
    };
    exports.DynamicWidthImgAttrs.runCheck = runCheck;
}(this, jQuery));