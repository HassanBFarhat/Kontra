class Bullet {
    constructor(game, x, y, source, target, angle, lanceTeam, heatSeeking) {
        Object.assign(this, {game, x, y, source, target, angle, lanceTeam, heatSeeking});
        this.radius = 12;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/bullet_1.png");

        let dist = distance(this, this.target); // NOTE: This is NaN if you have no target!
        this.maxSpeed = 500; // px per sec

        if (this.heatSeeking) {
            this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed}; // TODO: Does this work? - Implemented for when the Sniper is implemented
        } else {
            this.velocity = this.angleToVelocity(angle, this.maxSpeed);
        }

        // this.cache = []; // TODO: Useful for anything? - Not sure at the moment, will refactor/remove uncessary items when this class is 100%
        this.updateBoundingBox();
        this.lastBB = this.BB;

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 2, 2, 1, 0.1, 0, false, true));  // MAY REMOVE

        this.heatSeeking = false;
        this.elapsedTime = 0;
    };

    angleToVelocity(angle, speed) {
        var radians = angle * Math.PI / 180; 
        var velocityX;
        var velocityY = Math.sin(radians) * speed;
    
        if (angle % 90 !== 0) { // make diagnal directions faster in the x dimension 
            velocityX = Math.cos(radians) * speed * 1.5;
        } else {
            velocityX = Math.cos(radians) * speed;
        }
        
        return { x: velocityX, y: -velocityY };
    }

    updateBoundingBox() {
        this.BB = new BoundingBox(this.x, this.y - 10, 8, 10);
    };

    updateLastBoundingBox() {
        this.lastBB = this.BB;
    };

    update() {
        if (this.heatSeeking) {
            let dist = distance(this, this.target);
            this.velocity = {x: (this.target.x - this.x) / dist * this.maxSpeed, y: (this.target.y - this.y) / dist * this.maxSpeed};
        }

        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;

        // Remove bullet if passed canvas boarder
        if (this.x - this.game.camera.x > PARAMS.CANVAS_WIDTH 
            || this.x - this.game.camera.x < -this.radius
            || this.y < this.radius || this.y > PARAMS.CANVAS_HEIGHT) {
            this.source.bulletCount--; // decrement source's bullet count
            this.removeFromWorld = true;
        }

        // TODO: Collisions here?
        this.updateBoundingBox();
        for (let i = 0; i < this.game.entities.length; i++) {
            let ent = this.game.entities[i];
            if (this.lanceTeam && ent instanceof Soldier && this.BB.collide(ent.BB)) {
                ent.removeFromWorld = true;
                this.removeFromWorld = true;
            }
        }
        this.updateLastBoundingBox();
    };

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - 8, PARAMS.SCALE);

        // if (PARAMS.DEBUG) {
        //     ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y, this.BB.width, this.BB.height);
        //     // draw text of coordinates
        //     ctx.font = "10px Arial";
        //     ctx.fillStyle = "white";
        //     ctx.fillText("x: " + this.x, this.x - this.game.camera.x, this.y - 10);
        //     ctx.fillText("y: " + this.y, this.x - this.game.camera.x, this.y - 20);

        // }
    };
}