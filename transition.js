class TransitionScreen {
    constructor(game, level, x, y, gameOver) {
        Object.assign(this, { game, level, x, y, gameOver });
        this.elapsed = 0;
    };

    update() {
        this.elapsed += this.game.clockTick;
        if (this.elapsed > 2) this.game.camera.loadLevel(this.level, this.x, this.y, false, this.gameOver);
    };

    draw(ctx) {
        ctx.fillStyle = "Black";
        ctx.fillRect(0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
        ctx.fillStyle = "RED";

        ctx.fillText("KONTRA", 1.5 * PARAMS.BLOCKWIDTH, 1 * PARAMS.BLOCKWIDTH);

        if (this.gameOver) {
            ctx.fillText("GAME OVER", 6 * PARAMS.BLOCKWIDTH, 9 * PARAMS.BLOCKWIDTH);
        }
        else {
            ctx.fillText("LEVEL " + this.level.label, 5.5 * PARAMS.BLOCKWIDTH, 5 * PARAMS.BLOCKWIDTH);
        }
    };
};
