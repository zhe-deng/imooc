/* 判断连个向量是否符号相同
 * 利用位运算
 * 二进制的正负表示在最高位，1表示负，0表示正
 * 异或运算只有当对应的两位有一位为1时才返回1
 * 如果异或运算的结果是正，也就是首位为0，那么这两个数同为正或者同为负，即符号相同
*/
function sameSign(a, b) {
    return (a ^ b) >= 0;
}

// 向量
function vector(a, b) {
    return {
        x: b.x - a.x,
        y: b.y -a .y
    };
}

// 向量叉乘公式
function vectorProduct(v1, v2) {
    return v1.x*v2.y - v2.x*v1.y;
}

function isPointInTrangle(p, a, b, c) {
    var pa = vector(p, a);
    var pb = vector(p, b);
    var pc = vector(p, c);

    var t1 = vectorProduct(pa, pb);
    var t2 = vectorProduct(pb, pc);
    var t3 = vectorProduct(pc, pa);

    return sameSign(t1, t2) && sameSign(t2, t3);
}

function needDelay(elem, leftCorner, currMousePos) {
    var offset = elem.offset();

    var topLeft = {
        x: offset.left,
        y: offset.top
    };

    var bottomLeft = {
        x: offset.left,
        y: offset.top + elem.height()
    };

    return isPointInTrangle(currMousePos, leftCorner, topLeft, bottomLeft);
}
