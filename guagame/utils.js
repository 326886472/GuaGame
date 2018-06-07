var log = console.log.bind(console);

// 相交函数
var rectIntersects = function (a, b) {
    if (a.x + a.image.width > b.x && b.w + b.x > a.x) {
        if (a.y + a.image.height > b.y && b.y + b.h > a.y) {
            return true
        }
    } else {
        return false
    }
};

// debug
// var enableDebugMode = function (enable) {
//     if(!enable) {
//         return
//     }
//     window.paused = false;
//     window.addEventListener('keydown', function (event) {
//         var k = event.key;
//         if (k === 'p'){
//             window.paused = !window.paused;
//         } else if('1234567'.includes(k)) {
//             blocks = loadLevel(Number(k))
//         }
//     });
// //            控制速度
//     document.querySelector('#id-speed').addEventListener('input', function (event) {
//         var value = event.target.value;
//         if (value != 0) {
//             window.fps = value;
//         }
//     });
// };