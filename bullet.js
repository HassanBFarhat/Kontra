class Bullet {
    constructor(game, x, y, source, target, angle, heatSeeking) {
        Object.assign(this, {game, x, y, source, target, angle, heatSeeking});
        this.radius = 12;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bullet_1.png");

        let dist = distance(this, this.target); // NOTE: This is NaN if you have no target!
        this.maxSpeed = 500; // px per sec

        if (this.heatSeeking) {
            this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed}; // TODO: Does this work?
        } else {
            this.velocity = this.angleToVelocity(angle, this.maxSpeed);
        }

        // this.cache = []; // TODO: Useful for anything?

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 2, 2, 1, 0.1, 0, false, true));  // MAY REMOVE

        this.heatSeeking = false;
        this.elapsedTime = 0;
    };

    angleToVelocity(angle, speed) {
        var radians = angle * Math.PI / 180; 
        var velocityX = Math.cos(radians) * speed;
        var velocityY = Math.sin(radians) * speed;
    
        return { x: velocityX, y: -velocityY };
    }

    update() {
        if (this.heatSeeking) {
            let dist = distance(this, this.target);
            this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed};
        }

        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        // Remove bullet if passed left/right canvas boarder
        if (this.x - this.game.camera.x > PARAMS.CANVAS_WIDTH || this.x - this.game.camera.x < -this.radius) {
            this.source.bulletCount--; // decrement source's bullet count
            this.removeFromWorld = true;
            console.log("die bullet")
        } // TODO: TOP/Bottom border

        // TODO: Collisions here?
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 8, PARAMS.SCALE);
    };
}