// Mind is software. Bodies are disposable. The System will set me free.

function init() {
    createHiDPICanvas = function () {
        let cv = document.createElement("canvas");
        cv.width = window.innerWidth;
        cv.height = window.innerHeight;
        cv.style.width = window.innerWidth + "px";
        cv.style.height = window.innerHeight + "px";
        cv.id = "editrCanvas";
        return cv;
    }

    readjustCanvas = function (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        game.set_viewport(canvas.width, canvas.height);
    }

    //Create canvas with the device resolution.
    var canvas = createHiDPICanvas();
    ctx = canvas.getContext('2d');

    document.body.appendChild(canvas);

    window.map = new Mapvar();
    window.game = new Clarity();
    game.set_viewport(canvas.width, canvas.height);
    game.load_map(window.map);

    // User controls the viewport with WASD. Viewport shan't be limited.
    game.limit_viewport = false;

    window.addEventListener('resize', function () {
        readjustCanvas(canvas);
    }, false);

    var Loop = function () {
        ctx.fillStyle = '#111'; // Background colour
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw the game
        game.update();
        game.draw(ctx);
    };

    window.renderInterval = setInterval(Loop, 16.7);
}

init();