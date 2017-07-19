/*
 * jquery插件
 * 图片预加载
 */

// 使用闭包来模拟局部作用域
(function ($) {

    function Preload(imgs, options) {
        // 这样写传递参数可以更灵活，比如一张图片就直接传递字符串
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, Preload.DEFAULTS, options);

        // 该方法加下划线是表示仅供内部使用
        this._unordered();
    }

    Preload.DEFAULTS = {
        each: null, // 每一张图片加载完毕后执行
        all: null // 所有图片加载完毕后执行
    }

    // 无序加载
    Preload.prototype._unordered = function () {
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {
            if (typeof src != 'string') {
                return;
            }

            var imgObj = new Image();

            $(imgObj).on('load error', function () {
                //这里不能有具象操作
                //$progress.html(Math.round((count + 1) / len * 100) + '%');
                // 要通过传参数来操作
                opts.each && opts.each(count); // each存在的话才执行

                if (count >= len - 1) {
                    //这里不能有具象操作
                    //$('.loading').hide();
                    //document.title = '1/' + len;
                    // 要通过传参数来操作
                    opts.all && opts.all();
                }

                count++;
            });

            imgObj.src = src; // 开始加载
        });
    };

    //jQuery提供了两种方式，完成插件
    //$.fn.extend -> $('#img').preload(); // 选择元素
    // 工具函数
    // $.extend -> $.pre;pad();

    $.extend({
        preload: function (imgs, opts) {
            new Preload(imgs, opts);
        }
    });

})(jQuery);
