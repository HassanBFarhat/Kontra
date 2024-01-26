class Ground {
    constructor(game, x, y, w, h) {
        Object.assign(this, { game, x, y, w, h});

        this.spritesheet = ASSET_MANAGER.getAsset("/sprites/rectangle.png");

        this.BB = new BoundingBox(this.x, this.y, this.w, this.h);
    };

    update() {
    };

    draw(ctx) {
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Green';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
            ctx.color = 'Green';
            ctx.fillText("("+this.x +","+this.y+")", this.x - this.game.camera.x, this.y);
            ctx.fillText("BB top: " + this.BB.top, this.x - this.game.camera.x, this.y - 10);
        }
    };
};