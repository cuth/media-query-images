(function (w, $) {
    "use strict";
    var defaults = {},
        isRetina = (w.devicePixelRatio > 1),
        mm = w.matchMedia,
        setSrc = function (index) {
            var type;
            if (index >= this.mqs.length) return false;
            type = (isRetina) ? this.mqs[index].retinaType : this.mqs[index].type;
            this.$images.each(function () {
                var $img = $(this);
                $img.attr('src', $img.attr(type));
            });
            return true;
        },
        runCheck = function () {
            var x,
                xlen = this.mqls.length;
            if (!xlen || !mm) return;
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
            if (!xlen || !mm) return false;
            for (x = 0; x < xlen; x += 1) {
                (function (index) {
                    var mediaQuery = self.mqs[x].mediaQuery;
                    if (!mediaQuery) return;
                    mqls[x] = mm(self.mqs[x].mediaQuery);
                    mqls[x].addListener(function () {
                        runCheck.call(self);
                    });
                }(x));
            }
            this.mqls = mqls;
        },
        init = function (images, mqs, options) {
            if (!images || !mqs || !mqs.length) return false;
            this.$images = $(images);
            this.mqs = mqs;
            this.opts = $.extend({}, defaults, options);
            createMediaQueryLists.call(this);
            runCheck.call(this);
            return true;
        };
    w.RIA = function (images, mqs, options) {
        this.result = init.call(this, images, mqs, options);
    };
}(window, jQuery));