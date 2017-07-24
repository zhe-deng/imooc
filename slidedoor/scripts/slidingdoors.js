window.onload = function () {
    var box = document.getElementById("container");
    var imgs = box.getElementsByTagName("img");
    var imgWidth = imgs[0].offsetWidth;

    // 设置掩藏门体露出的宽度
    var exposeWidth = 160;

    // 设置容器总宽度
    // 等于 单张图片的宽度+所有图片的掩藏门体露出的宽度
    var boxWidth = imgWidth + (imgs.length - 1) * exposeWidth;

    box.style.width = boxWidth + "px";

    // 设置每道门的初始位置
    // 第一道门距离容器左侧为0，因此无需设置它的位置
    function setImgsPos() {
        for (var i = 1, len = imgs.length; i < len; i++) {
            imgs[i].style.left = imgWidth + exposeWidth * (i - 1) + 'px';
        }
    };

    setImgsPos();

    // 计算每道门打开时应移动的距离
    // 鼠标滑过以后每个门体滑动的距离 = 图片的宽度 - 掩藏门体露出的宽度
    var translate = imgWidth - exposeWidth;

    // 为每道门绑定事件
    for (var i = 0, len = imgs.length; i < len; i++) {
        // 使用立即调用的函数表达式，为了获得不同的i值
        (function (i) {
            imgs[i].onmouseover = function () {
                // 先将每道门复位
                setImgsPos();
                // 打开门
                // 因为left的值带px，所以这里要使用parseInt才能进行计算
                for (var j = 1; j <= i; j++) {
                    imgs[j].style.left = parseInt(imgs[j].style.left, 10) - translate + 'px';
                }
            }
        }(i));
    }
};

/*
 * 核心思路：给图片添加绝对定位样式，然后通过计算来控制图片显示的位置
 * 初始位置：第一张图片距离容器左侧为0，它的left不用计算，所以i从1开始;
 *         第二张图，left = imgWidth;
 *         第三张图，left = imgWidth + exposeWidth * (2 - 1)
 * 滑动的距离：图片的宽度减去掩藏体露出的宽度。
 * 当鼠标进入图片的时候：1. 为了保存i的值，通过一个立即调用函数形成闭包来给每个图片绑定事件。
 *                   2. 先将每道门复位.
 *                   3. 鼠标放到第一张图的时候无滑动，因此j从1开始。
 *                   4. 鼠标放到第二张图上，只需要第二张图片滑动；
 *                      鼠标放到第三张图片上，需要第二张和第三章图片滑动；
 *                      鼠标放到第四张图片上，需要第二张、第三章和第四章图片滑动；
 *                   5. 因此循环设定为j <= i;
 */
