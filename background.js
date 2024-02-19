class Background { 
    constructor(game, x, y, img) {
        Object.assign(this, { game, x, y, img});

        this.backgroundImage = ASSET_MANAGER.getAsset(img);
        this.x = x;
        this.y = y;
    };

    update() {
    };

    draw(ctx) {
        var srcW = PARAMS.CANVAS_WIDTH;
        var srcH = PARAMS.CANVAS_HEIGHT;
        var destW = srcW * PARAMS.SCALE;
        var destH = srcH * PARAMS.SCALE;
        ctx.imageSmoothingEnabled = false; // Smooth scale
        ctx.drawImage(this.backgroundImage, this.x + this.game.camera.x / PARAMS.SCALE, this.y, srcW, srcH, 0, 0, destW, destH);
    };
};