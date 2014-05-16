/* Media Query Images
 * version: 1.0.2
 * https://github.com/cuth/media-query-images
 */
;(function (exports, $) {
    'use strict';

    var defaults = {
        blankClass: 'hidden'
    };
    
    var isRetina = (window.devicePixelRatio > 1);
    
    var setBlank = function (img) {
        var $img = $(img);
        $img.addClass(this.opts.blankClass);
        if ($img.is('img')) {
            $img.removeAttr('src');
        } else {
            $img.css('background-image', '');
        }
    };
    
    var setImage = function (img, attrName) {
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
            $img.css('background-image', 'url("' + path + '")');
        }
    };
    
    var setSrc = function (index) {
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
    };

    var runCheck = function () {
        for (var x = 0, xlen = this.mqls.length; x < xlen; x += 1) {
            if (this.mqls[x].matches) {
                setSrc.call(this, x);
                return;
            }
        }
        setSrc.call(this, xlen);
    };
    
    var bindListeners = function () {
        if (!this.mqls[0].addListener) return;
        for (var x = 0, xlen = this.mqls.length; x < xlen; x += 1) {
            this.mqls[x].addListener(runCheck.bind(this));
        }
    };
    
    var createMediaQueryLists = function () {
        var mqls = [];
        for (var x = 0, xlen = this.mqs.length; x < xlen; x += 1) {
            if (!this.mqs[x].mediaQuery) break;
            mqls[x] = matchMedia(this.mqs[x].mediaQuery);
        }
        return mqls;
    };
    
    var init = function (images, mqs, options) {
        if (!images || !mqs || !mqs.length || !matchMedia) return false;
        this.selector = (typeof images === 'string') ? images : null;
        this.$images = $(images);
        this.mqs = mqs;
        this.opts = $.extend({}, defaults, options);
        this.mqls = createMediaQueryLists.call(this);
        bindListeners.call(this);
        runCheck.call(this);
        return true;
    };

    exports.MediaQueryImages = function (images, mqs, options) {
        this.result = init.call(this, images, mqs, options);
    };

    exports.MediaQueryImages.prototype.runCheck = runCheck;

    // refresh the jQuery selector
    exports.MediaQueryImages.prototype.refresh = function () {
        if (!this.selector || !this.result) return;
        this.$images = $(this.selector);
        runCheck.call(this);
    };
}(this, jQuery));