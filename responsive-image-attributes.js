(function (w, $) {
    "use strict";
    var isRetina = (w.devicePixelRatio > 1),
        mm = w.matchMedia,
        removeCurrentAttributes = function ($img) {
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
    w.RIA = function (images, mqs) {
        this.result = init.call(this, images, mqs);
    };
}(window, jQuery));