class Trigger {
    constructor(game, x, y, fn) {
        Object.assign(this, {game, x, y, fn});
    };

    update() { 
        if (this.game.lance.x > this.x) {
            if (!PARAMS.DEBUG) {
                this.fn(this);
            } else {
                console.log("Trigger:" + this.fn)
            }
            
            this.removeFromWorld = true;
        }
    };

    draw(ctx) { 
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(this.x - this.game.camera.x, this.y, 5, PARAMS.CANVAS_HEIGHT);
        }
    };
}