(function () {

    var datepicker = window.datepicker;
    var monthData,
        $wrapper;

    datepicker.buildUi = function (year, month) {
        // 实际工作中这里会用到模板引擎例如handkebars等
        // 这里使用拼接字符串的方式

        monthData = datepicker.getMonthData(year, month);

        var html = '<div class="ui-datepicker-header">' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-prev-btn">&lt;</a>' +
            '<a href="#" class="ui-datepicker-btn ui-datepicker-next-btn">&gt;</a>' +
            '<span class="ui-datepicker-curr-month">' + monthData.year + '-' + monthData.month + '</span>' +
            '</div>' +
            '<div class="ui-datepicker-body">' +
            '<table>' +
            '<thead>' +
            '<tr>' +
            '<th>一</th>' +
            '<th>二</th>' +
            '<th>三</th>' +
            '<th>四</th>' +
            '<th>五</th>' +
            '<th>六</th>' +
            '<th>日</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';

        for (var i = 0; i < monthData.days.length; i++) {
            var date = monthData.days[i];

            if (i % 7 === 0) {
                // 如果能被7整除就是每周的第一天
                html += '<tr>';
            }

            // 添加data-date属性是为了点击日期时获取该日期
            html += '<td data-date="' + date.date + '">' + date.showDate + '</td>';

            if (i % 7 === 6) {
                // 如果能被7整除余6就是每周的最后一天
                html += '</tr>'
            }
        }

        html += '</tbody></table></div>';

        return html;
    };

    datepicker.render = function (direction) {
        var year,
            month;

        if (monthData) {
            var year = monthData.year;
            var month = monthData.month;
        }

        if (direction === 'prev') {
            month--;
        }

        if (direction === 'next') {
            month++;
        }

        var html = datepicker.buildUi(year, month);

        // 生成datepicker的容器
        if ($wrapper) {
            $wrapper.innerHTML = html;
            return;
        }

        $wrapper = document.createElement('div');
        $wrapper.className = 'ui-datepicker-wrapper';
        $wrapper.innerHTML = html;
        document.body.appendChild($wrapper);
    };

    datepicker.init = function (input) {
        datepicker.render();

        var $input = document.querySelector(input);
        var isOpen = false;

        // 点击输入框的时候展开闭合datepicker
        $input.addEventListener('click', function () {
            if (isOpen) {
                $wrapper.classList.remove('ui-datepicker-wrapper-show');
                isOpen = false;
            } else {
                $wrapper.classList.add('ui-datepicker-wrapper-show');

                /*
                 * 拿到input框的位置
                 * 然后计算出datepicker的位置
                 * 为什么要在点击文本框的时候计算位置，而不是在init的时候计算位置？
                 * 因为用户的页面非常复杂，可能当点击文本框的时候文本框的位置已经发生了改变，如果init时就计算可能会造成datepicker位置不正确。
                 */
                var left = $input.offsetLeft;
                var top = $input.offsetTop;
                var height = $input.offsetHeight;

                // 计算datepicker的位置
                $wrapper.style.top = top + height + 2 + 'px';
                $wrapper.style.left = left;

                isOpen = true;
            }
        }, false);

        /*
         * 事件代理，把事件绑定在不变的元素上
         * 原因：
         *  1. init只调用了一次，只在datepicker初始化的时候被调用，也就意味着事件只会绑定一次
         *  2. 当我们进行渲染之后，这个按钮每一次都是根据HTML字符串重新渲染出来的，也就是说按钮会不断的销毁并重建，也就是说绑定的事件无法生效。
         *  3. 两种解决方案：1) 每一次渲染完之后重新为这些按钮绑定事件 2) 为不变的元素 —— 也就是最外层的包裹元素绑定事件
         *  4. 这里用第二种 —— 事件代理，利用事件冒泡
         */
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;

            if (!$target.classList.contains('ui-datepicker-btn')) {
                return;
            }

            if ($target.classList.contains('ui-datepicker-prev-btn')) {
                datepicker.render('prev');
            } else if ($target.classList.contains('ui-datepicker-next-btn')) {
                datepicker.render('next');
            }
        });

        // 点击日期填充文本框
        $wrapper.addEventListener('click', function (e) {
            var $target = e.target;

            if ($target.tagName.toLowerCase() != 'td') {
                return;
            }

            var date = new Date(monthData.year, monthData.month - 1, $target.dataset.date);

            $input.value = formate(date);

            $wrapper.classList.remove('ui-datepicker-wrapper-show');
            isOpen = false;
        });
    };

    function formate(date) {
        var ret = '';

        var padding = function (num) {
            if (num <= 9) {
                return '0' + num;
            }
            return num;
        }

        ret += date.getFullYear() + '-';
        ret += padding(date.getMonth() + 1) + '-';
        ret += padding(date.getDate());

        return ret;
    }
})();
