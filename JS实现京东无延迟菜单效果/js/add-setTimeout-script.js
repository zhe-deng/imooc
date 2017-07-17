/*
 * 加入延迟来优化
 * 1. 切换子菜单时候，用setTimeout设置延迟
 * 2. debounce去抖技术：当事件被频繁触发时，只执行一次处理，一般是最后一次！
 */
$(document).ready(function () {
    var sub = $('#sub');
    var activeRow;
    var activeMenu;

    var timer; // 用来保存settimeout返回的计时器id

    var mouseInSub = false; // 用来标识鼠标是否在子菜单里面？

    sub.on('mouseenter', function (e) {
        mouseInSub = true;
    }).on('mouseleave', function (e) {
        mouseInSub = false;
    });

    $('#test')
        .on('mouseenter', function (e) {
            sub.removeClass('none');
        })
        .on('mouseleave', function (e) {
            sub.addClass('none');

            if (activeRow) {
                activeRow.removeClass('active');
                activeRow = null;
            }

            if (activeMenu) {
                activeMenu.addClass('none');
                activeMenu = null;
            }
        })
        .on('mouseenter', 'li', function (e) {
            if (!activeRow) {
                activeRow = $(e.target).addClass('active');
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');
                return;
            }

            /*
             * debounce去抖技术：当事件被频繁触发时，只执行一次处理，一般是最后一次！
             * 原理：1. 设置计时器。
             *      2. 如果事件触发的时候计时器还没有执行，就清掉。
             *      3. 在计时器回调结束之后将计时器设置为null。
             * 解决问题：当鼠标在一级菜单上频繁移动的时候会有一个连续切换的效果。
             * 如果事件触发的时候计时器还没有执行，就清掉。
             */

            if (timer) {
                clearTimeout(timer);
            }

            /*
             * 1. 当鼠标还在子菜单中的时候不触发事件。
             * 2. 解决了不能斜着选择子菜单的问题。
             */

            timer = setTimeout(function () {
                if (mouseInSub) {
                    return;
                }

                activeRow.removeClass('active');
                activeMenu.addClass('none');

                activeRow = $(e.target);
                activeRow.addClass('active');
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');

                // 计时器回调结束之后设置为null
                timer = null;
            }, 300);
        });

    /*
     * 延迟引入了新的体验问题：当用户不想进入二级菜单的时候，他没有办法很快在一级菜单中切换！
     */
});
