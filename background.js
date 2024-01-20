class Background { 
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });

        this.backgroundImage = ASSET_MANAGER.getAsset("backgrounds/random kontra level.png");
        this.x = x;
        this.y = y;
    };

    update() {
        if (this.game.right) { // TODO: Scene Manager to manage backgroudn scrolling
            this.x++;
        } else if (this.game.left) {
            this.x--;
        }
    };

    draw(ctx) {
        const scale = 4;
        var srcW = PARAMS.CANVAS_WIDTH;
        var srcH = PARAMS.CANVAS_HEIGHT;
        var destW = srcW * scale;
        var destH = srcH * scale;
        ctx.imageSmoothingEnabled = false; // Smooth scale
        ctx.drawImage(this.backgroundImage, this.x, this.y, srcW, srcH, 0, 0, destW, destH);
    };
};