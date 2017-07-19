// 为了不污染外部环境，需要包裹在一个匿名函数中
// 通过IIFE来模拟JS模块化
(function () {
    var datepicker = {};

    datepicker.getMonthData = function (year, month) {

        // 用来返回结果
        // 数组中的每一个元素就是当前月份的日期
        var ret = [];

        if (!year || !month) {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }

        // 当月第一天
        var firstDay = new Date(year, month - 1, 1);

        // 判断当月的第一天是周几？
        // 用途：用来决定第一天前面有几个上月的数据需要出现
        var firstDayWeekDay = firstDay.getDay();

        year = firstDay.getFullYear();
        month = firstDay.getMonth() + 1;

        // 因为getDay()，周日返回的是0
        if (firstDayWeekDay === 0) {
            firstDayWeekDay = 7;
        }

        // 获取上月的最后一天
        // 利用Date方法数值越界的时候会进行进位或者退位
        var lastDayOfLastMonth = new Date(year, month - 1, 0);
        var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

        // 当月第一天前需要显示上个月日期的天数
        // 例如：周日前面要有6天，周一0天
        var preMonthDayCount = firstDayWeekDay - 1;

        // 获取当月的最后一天
        // 用途：日期可能会越界，越界之后我们需要知道什么时候算是下一个月
        var lastDay = new Date(year, month, 0);
        var lastDate = lastDay.getDate();

        // 每个月一般是5周
        // 极端情况下会出现4周或者6周
        // 为了简单，直接获取6周的数据
        for (var i = 0; i < 7 * 6; i++) {
            // 例如这个月的1号是周二，那么前面会有一条上个月的日期，当i=1的时候相当于是1号，所以需要减去上个月的天数，再加1就是这一天
            var date = i + 1 - preMonthDayCount;

            // 上面计算可能出现0或者负值，showDate就表示日期上应该显示的数字
            var showDate = date;
            var thisMonth = month;

            // 处理越界
            if (date <= 0) {
                // 上一月
                thisMonth = month - 1;
                showDate = lastDateOfLastMonth + date;
            } else if (date > lastDate) {
                // 下一个月
                thisMonth = month + 1;
                showDate = showDate - lastDate;
            }

            if (thisMonth === 0) {
                // 上一年的12月份
                thisMonth = 12;
            }

            if (thisMonth === 13) {
                // 下一年的1月份
                thisMonth = 1;
            }

            ret.push({
                month: thisMonth,
                date: date,
                showDate: showDate
            });
        }

        return {
            year: year,
            month: month,
            days: ret
        };
    };

    window.datepicker = datepicker;
})();
