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

    var mouseTrack = []; //存储鼠标位置

    var moveHandler = function (e) {
        mouseTrack.push({
            x: e.pageX,
            y: e.pageY
        });

        if (mouseTrack.length > 3) {
            mouseTrack.shift();
        }
    };

    $('#test')
        .on('mouseenter', function (e) {
            sub.removeClass('none');

            $(document).bind('mousemove', moveHandler);
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

            $(document).unbind('mousemove', moveHandler);
        })
        .on('mouseenter', 'li', function (e) {
            if (!activeRow) {
                activeRow = $(e.target).addClass('active');
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');
                return;
            }

            if (timer) {
                clearTimeout(timer);
            }

            var currMousePos = mouseTrack[mouseTrack.length - 1]; // 鼠标的当前坐标

            var leftCorner = mouseTrack[mouseTrack.length - 2]; // 鼠标上一次的坐标

            var delay = needDelay(sub, leftCorner, currMousePos);

            if (delay) {
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
            } else {
                var prevActiveRow = activeRow;
                var prevActiveMenu = activeMenu;

                activeRow = $(e.target);
                activeMenu = $('#' + activeRow.data('id'));

                prevActiveRow.removeClass('active');
                prevActiveMenu.addClass('none');

                activeRow.addClass('active');
                activeMenu.removeClass('none');
            }
        });
});
