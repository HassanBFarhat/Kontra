// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.ctx = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.A = false;
        this.B = false;

        this.player2Controls = {
            left: false,
            right: false,
            up: false,
            down: false,
            A: false,
            B: false
        };

        this.gamepad = null;

    };

    init(ctx) { // called after page has loaded
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        this.keyboardActive = false;
        var that = this;

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return { x: x, y: y, radius: 0 };
        }
        function mouseListener (e) {
            that.mouse = getXandY(e);
        }
        function mouseClickListener (e) {
            that.click = getXandY(e);
            if (PARAMS.DEBUG) console.log(that.click);
        }
        function wheelListener (e) {
            e.preventDefault(); // Prevent Scrolling
            that.wheel = e.deltaY;
        }
        function keydownListener (e) { 
            that.keyboardActive = true;
            switch (e.code) {
                case "ArrowLeft":
                    that.left = true;
                    break;
                case "ArrowRight":
                    that.right = true;
                    break;
                case "ArrowUp":
                    that.up = true;
                    break;
                case "ArrowDown":
                    that.down = true;
                    break;
                case "KeyZ":
                    that.B = true;
                    break;
                case "KeyX":
                    that.A = true;
                    break;

                // Player 2 controls
                case "KeyA":
                    that.player2Controls.left = true;
                    break;
                case "KeyD":
                    that.player2Controls.right = true;
                    break;
                case "KeyW":
                    that.player2Controls.up = true;
                    break;
                case "KeyS":
                    that.player2Controls.down = true;
                    break;
                case "Comma":
                    that.player2Controls.B = true;
                    break;
                case "Period":
                    that.player2Controls.A = true;
                    break;
            }
        }
        function keyUpListener (e) {
            that.keyboardActive = false;
            switch (e.code) {
                case "ArrowLeft":
                    that.left = false;
                    break;
                case "ArrowRight":
                    that.right = false;
                    break;
                case "ArrowUp":
                    that.up = false;
                    break;
                case "ArrowDown":
                    that.down = false;
                    break;
                case "KeyZ":
                    that.B = false;
                    break;
                case "KeyX":
                    that.A = false;
                    break;

                // Player 2 controls
                case "KeyA":
                    that.player2Controls.left = false;
                    break;
                case "KeyD":
                    that.player2Controls.right = false;
                    break;
                case "KeyW":
                    that.player2Controls.up = false;
                    break;
                case "KeyS":
                    that.player2Controls.down = false;
                    break;
                case "Comma":
                    that.player2Controls.B = false;
                    break;
                case "Period":
                    that.player2Controls.A = false;
                    break;
            }
        }

        that.mousemove = mouseListener;
        that.leftclick = mouseClickListener;
        that.wheelscroll = wheelListener;
        that.keydown = keydownListener;
        that.keyup = keyUpListener;

        this.ctx.canvas.addEventListener("mousemove", that.mousemove, false);

        this.ctx.canvas.addEventListener("click", that.leftclick, false);

        this.ctx.canvas.addEventListener("wheel", that.wheelscroll, false);

        this.ctx.canvas.addEventListener("keydown", that.keydown, false);

        this.ctx.canvas.addEventListener("keyup", that.keyup, false);
    };

    disableInput() {
        var that = this;
        that.ctx.canvas.removeEventListener("mousemove", that.mousemove);
        that.ctx.canvas.removeEventListener("click", that.leftclick);
        that.ctx.canvas.removeEventListener("wheel", that.wheelscroll);
        that.ctx.canvas.removeEventListener("keyup", that.keyup);
        that.ctx.canvas.removeEventListener("keydown", that.keydown);

        that.left = false;
        that.right = false;
        that.up = false;
        that.down = false;
        that.A = false;
        that.B = false;
    }

    addEntity(entity) {
        this.entities.push(entity);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
       this.camera.draw(this.ctx);
    };

    gamepadUpdate() {
        return; // TODO: Enable gamepads (Currently adds complications to dev)
        this.gamepad = navigator.getGamepads()[0];
        let gamepad = this.gamepad;
        if (gamepad != null && !this.keyboardActive) {
            this.A = gamepad.buttons[0].pressed;
            this.B = gamepad.buttons[1].pressed;
            this.left = gamepad.buttons[14].pressed || gamepad.axes[0] < -0.3;
            this.right = gamepad.buttons[15].pressed || gamepad.axes[0] > 0.3;
            this.up = gamepad.buttons[12].pressed || gamepad.axes[1] < -0.3;
            this.down = gamepad.buttons[13].pressed || gamepad.axes[1] > 0.3;
        }
    }

    update() {
        var entitiesCount = this.entities.length;
        
        this.gamepadUpdate();
        
        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (entity !== undefined && !entity.removeFromWorld) {
                entity.update();
            }
        }

        this.camera.update();
        
        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
        this.wheel = 0;
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();

        this.click = null;
    };
};