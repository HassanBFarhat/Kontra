class ground {
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
        }
    };
};