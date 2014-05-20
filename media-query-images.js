//     Media Query Images
//     version: 1.0.2
//     https://github.com/cuth/media-query-images

(function(name, root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD and attach globally
        define(['jquery'], function ($) {
            return (root[name] = factory($));
        });
    } else if (typeof exports !== 'undefined') {
        // Node
        module.exports = factory(require('jquery'));
    } else {
        // Browser global
        root[name] = factory(root.jQuery || root.Zepto || root.ender || root.$);
    }

}('MediaQueryImages', this, function ($) {
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
        var mq, attrName;

        // if no default was set
        if (index >= this.mqs.length) {
            this.$images.each(function (i, img) {
                setBlank.call(this, img);
            }.bind(this));
            return false;
        }

        mq = this.mqs[index];
        attrName = (isRetina) ? mq.retinaAttrName || mq.attrName : mq.attrName;
        if (!attrName) return false;

        this.$images.each(function (i, img) {
            setImage.call(this, img, attrName);
        }.bind(this));
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
        this.mqls.forEach(function (mql) {
            mql.addListener(runCheck.bind(this));
        }.bind(this));
    };
    
    var createMediaQueryLists = function () {
        return this.mqs.filter(function (mq) {
            return (mq.mediaQuery);
        }).map(function (mq) {
            return matchMedia(mq.mediaQuery);
        });
    };
    
    var init = function (images, mqs, options) {
        if (!images || !mqs || !mqs.length || !matchMedia) return false;
        this.selector = null;
        if (typeof images === 'string') {
            this.selector = images;
        } else if (typeof images === 'object' && images.selector) {
            this.selector = images.selector;
        }
        this.$images = $(images);
        this.mqs = mqs;
        this.opts = $.extend({}, defaults, options);
        this.mqls = createMediaQueryLists.call(this);
        bindListeners.call(this);
        runCheck.call(this);
        return true;
    };

    var MediaQueryImages = function (images, mqs, options) {
        this.result = init.call(this, images, mqs, options);
    };

    MediaQueryImages.prototype.runCheck = runCheck;

    // refresh the jQuery selector
    MediaQueryImages.prototype.refresh = function () {
        if (!this.selector || !this.result) return;
        this.$images = $(this.selector);
        runCheck.call(this);
    };

    $.fn.MediaQueryImages = function (mqs, options) {
        return new MediaQueryImages(this, mqs, options);
    };

    return MediaQueryImages;
}));