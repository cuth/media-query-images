var devicePixelRatio = devicePixelRatio || 1;

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