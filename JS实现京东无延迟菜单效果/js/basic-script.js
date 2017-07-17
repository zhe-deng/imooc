$(document).ready(function () {
    var sub = $('#sub');
    var activeRow;
    var activeMenu;

    /* 这里使用事件代理（委托），把事件绑定在父容器上，而不是选中所有列表项循环为每一个列表项绑定事件
     * 这样做的好处：无论增加还是删除列表项都不需要修改代码
     * 原理：利用事件冒泡
     * TODO: 学习《JavaScript高级程序设计》P402
     */
    $('#test')
        .on('mouseenter', function(e) {
            sub.removeClass('none');
        })
        .on('mouseleave', function(e) {
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
        .on('mouseenter', 'li', function(e) {
            if (!activeRow) {
                activeRow = $(e.target).addClass('active');
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');
                return;
            }

            activeRow.removeClass('active');
            activeMenu.addClass('none');

            activeRow = $(e.target);
            activeRow.addClass('active');
            activeMenu = $('#' + activeRow.data('id'));
            activeMenu.removeClass('none');
        });

    /*
     * 目前为止基本功能实现了，但是现在只能通过平移选中二级菜单中的项目；
     * 如果斜着移动的话，因为鼠标会碰到其他一级菜单，导致当前二级菜单消失，无法选中；
     * 两点之间直线最短，这样用户体验不太好；
     * 利用延迟和去抖技术进行优化；
     */
});
