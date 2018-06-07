var Block = function (gme,position) {
    var p = position;
    var o = gme.imgByName('block');
    o.x = p[0];
    o.y = p[1];
    o.w = 50;
    o.h = 20;
    o.lives = p[2] || 1;
    o.alive = true;
    o.kill = function (callBack) {
        o.lives --;
        if (o.lives <= 0) {
            o.alive = false
            callBack()
        } else {
            o.alive = true
        }
    };

    var aInb = function (x, x1, x2) {
        return x >= x1 && x <= x2
    };

    o.collide = function (ball) {
        var a = o;
        var b = ball;
        if (a.alive) {
            if (aInb(a.x, b.x, b.x + b.image.width) || aInb(b.x, a.x, a.x + a.image.width)) {
                if (aInb(a.y, b.y, b.y + b.image.height) || aInb(b.y, a.y, a.y + a.image.height)) {
                    if (a.w+a.x-b.x < b.w + 5 || b.x+b.w-a.x < b.w + 5) {
                        return 2
                    } else {
                        return 1
                    }
                }
            }
        }

    };
    return o;
};
