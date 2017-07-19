$(function () {
    var imgs = [
        'http://i2.hoopchina.com.cn/user/308/15960308/13383588090.jpg',
        'http://imgsrc.baidu.com/baike/pic/item/8ad4b31c8701a18bb114ffa3982f07082938fe5b.jpg', 'https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=33599b701fce36d3b6098b625b9a51e2/9e3df8dcd100baa1a5fd20114d10b912c9fc2e42.jpg',
        'http://img.article.pchome.net/00/44/23/20/pic_lib/wm/2.jpg',
        'http://lcd.yesky.com/imagelist/2009/044/404q4y8g4m0p.jpg', 'https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike220%2C5%2C5%2C220%2C73/sign=5645718117950a7b613846966bb809bc/0df3d7ca7bcb0a46e852a18e6163f6246b60af10.jpg',
        'http://lcd.yesky.com/imagelist/2009/044/cgro54wt2t2x.jpg'
    ];

    var index = 0,
        len = imgs.length,
        count = 0, // 计数器记录当前加载了几张图片
        $progress = $('.progress');

    /*
     * 预加载就是利用了Image对象，有两个事件
     * load事件
     * error事件
     */
    $.each(imgs, function (i, src) {
        var imgObj = new Image();

        $(imgObj).on('load error', function() {
            // Math.round() 方法可以把一个整数舍入为最接近的整数。
            // 遵循四舍五入
            $progress.html(Math.round((count + 1) / len * 100) + '%');

            if (count >= len - 1) {
                $('.loading').hide();
                document.title = '1/' + len;
            }

            count++;
        });

        imgObj.src = src; // 开始加载
    });

    $('.btn').on('click', function () {
        // 这里这样写恒等是因为经常会不小心写成赋值语句
        // 这样写如果写成了赋值语句就会报错，很容易发现
        if ('prev' === $(this).data('control')) { // 上一张

            /*index--;
            if (index < 0) {
                index = 0;
            }*/

            /*
             * 注意：技巧
             * 更简洁的写法
             * 等价于上面你的写法
             * 先将index做减减运算，然后与0比较，即可满足如果小于0就让它等于0
             */
            index = Math.max(0, --index);
        } else { //下一张
            index = Math.min(len - 1, ++index);
        }

        document.title = (index + 1) + '/' + len;

        $('#img').attr('src', imgs[index]);
    });
});
